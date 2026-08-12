"use client";

import { useState } from "react";
import { Shield, Globe, AlertTriangle, CheckCircle, Clock, ChevronRight, Loader2, Building2, Languages, ExternalLink } from "lucide-react";

const PRODUCTS = [
  { id: "conversation-memory", name: "Conversation Memory", category: "Conversations" },
  { id: "conversation-orchestrator", name: "Conversation Orchestrator", category: "Conversations" },
  { id: "conversation-intelligence", name: "Conversation Intelligence", category: "Conversations" },
  { id: "conversation-relay", name: "Conversation Relay", category: "Conversations" },
  { id: "messaging", name: "Messaging APIs (SMS/MMS/WhatsApp/RCS)", category: "Communications" },
  { id: "sendgrid", name: "SendGrid Email API", category: "Communications" },
  { id: "voice", name: "Voice API", category: "Communications" },
  { id: "phone-numbers", name: "Phone Numbers", category: "Communications" },
  { id: "elastic-sip-trunking", name: "Elastic SIP Trunking", category: "Communications" },
  { id: "flex", name: "Twilio Flex", category: "Communications" },
  { id: "video", name: "Twilio Video", category: "Communications" },
  { id: "marketing-campaigns", name: "Marketing Campaigns", category: "Communications" },
  { id: "trust-hub", name: "Trust Hub", category: "Communications" },
  { id: "event-streams", name: "Event Streams", category: "Communications" },
  { id: "interconnect", name: "Interconnect", category: "Communications" },
  { id: "taskrouter", name: "TaskRouter", category: "Communications" },
  { id: "sync", name: "Sync", category: "Communications" },
  { id: "twilio-email", name: "Twilio Email", category: "Communications" },
  { id: "verify", name: "Twilio Verify", category: "Authentication" },
  { id: "lookup", name: "Twilio Lookup", category: "Authentication" },
  { id: "segment-connections", name: "Segment Connections", category: "Customer Data" },
  { id: "segment-protocols", name: "Segment Protocols", category: "Customer Data" },
  { id: "segment-unify", name: "Segment Unify", category: "Customer Data" },
  { id: "segment-engage", name: "Segment Engage", category: "Customer Data" },
  { id: "privacy-portal", name: "Privacy Portal", category: "Customer Data" },
  { id: "serverless", name: "Serverless", category: "Builder Tools" },
  { id: "studio", name: "Studio", category: "Builder Tools" },
  { id: "functions", name: "Functions", category: "Builder Tools" },
];

const PRODUCT_CATEGORIES = ["Conversations", "Communications", "Authentication", "Customer Data", "Builder Tools"];

const COUNTRIES = [
  { code: "Germany", language: "de", label: "Germany" },
  { code: "France", language: "fr", label: "France" },
  { code: "United Kingdom", language: "en", label: "United Kingdom" },
  { code: "Netherlands", language: "nl", label: "Netherlands" },
  { code: "Spain", language: "es", label: "Spain" },
  { code: "Italy", language: "it", label: "Italy" },
  { code: "Sweden", language: "sv", label: "Sweden" },
  { code: "Poland", language: "pl", label: "Poland" },
  { code: "Belgium", language: "fr", label: "Belgium" },
  { code: "Ireland", language: "en", label: "Ireland" },
  { code: "Austria", language: "de", label: "Austria" },
  { code: "Switzerland", language: "de", label: "Switzerland" },
  { code: "Denmark", language: "da", label: "Denmark" },
  { code: "Norway", language: "no", label: "Norway" },
  { code: "Finland", language: "fi", label: "Finland" },
];

const INDUSTRIES = [
  "Financial Services",
  "Healthcare",
  "Retail & E-commerce",
  "Technology",
  "Telecommunications",
  "Government & Public Sector",
  "Insurance",
  "Energy & Utilities",
  "Manufacturing",
  "General",
];

interface AnalysisResult {
  product: {
    id: string;
    name: string;
    category: string;
    certifications: string[];
    euDataResidency: boolean;
    euDataResidencyDetails: string;
    complianceLinks: { label: string; url: string; description: string }[];
  };
  applicableRegulations: {
    id: string;
    name: string;
    fullName: string;
    category: string;
    enforcementBody: string;
    maxPenalty: string;
    sourceUrl: string;
  }[];
  analysis: {
    overallStatus: string;
    summary: string;
    regulatoryFit: {
      regulationId: string;
      regulationName: string;
      status: string;
      explanation: string;
      risks: string[];
      mitigations: string[];
    }[];
    localizedPositioning: {
      headline: string;
      valueProposition: string;
      complianceStatement: string;
      customerBenefits: string[];
      talkTrackBullets: string[];
    };
    marketEntryReadiness: {
      score: number;
      blockers: string[];
      accelerators: string[];
      timeToMarket: string;
    };
  };
  localization: {
    localizedContent: string | Record<string, string | string[]>;
    culturalNotes: string[];
  } | null;
  objections: {
    id: string;
    customerSays: string;
    reality: string;
    whatToSay: string;
    supportingLinks: { label: string; url: string }[];
  }[];
  alternativeProducts: { name: string; url: string }[];
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    compliant: "bg-green-100 text-green-800 border-green-200",
    partial: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "requires-config": "bg-blue-100 text-blue-800 border-blue-200",
    "not-applicable": "bg-gray-100 text-gray-600 border-gray-200",
  };
  const labels: Record<string, string> = {
    compliant: "Ready",
    partial: "Partly ready",
    "requires-config": "Needs setup",
    "not-applicable": "Does not apply",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles["partial"]}`}>
      {labels[status] || status}
    </span>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600";
  const bgColor = score >= 80 ? "bg-green-100" : score >= 60 ? "bg-yellow-100" : "bg-red-100";
  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg ${bgColor}`}>
      <div className={`text-4xl font-bold ${color}`}>{score}</div>
      <div className="text-sm">
        <div className={`font-semibold ${color}`}>Readiness score</div>
        <div className="text-gray-600">out of 100</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [productId, setProductId] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("General");
  const [includeLocalization, setIncludeLocalization] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const selectedCountry = COUNTRIES.find(c => c.code === country);

  async function runAnalysis() {
    if (!productId || !country) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          country,
          industry,
          language: includeLocalization ? selectedCountry?.language : "en",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Analysis failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Compliance & Localization Engine</h1>
            <p className="text-sm text-gray-500">Check if Twilio products meet EU regulations — and get sales-ready content for each market</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Input Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What do you want to check?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Which product?</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select a product...</option>
                {PRODUCT_CATEGORIES.map(cat => (
                  <optgroup key={cat} label={cat}>
                    {PRODUCTS.filter(p => p.category === cat).map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Which country?</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select a country...</option>
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Which industry?</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-lg border-gray-300 border px-3 py-2 text-sm text-gray-900 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                {INDUSTRIES.map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={includeLocalization}
                  onChange={(e) => setIncludeLocalization(e.target.checked)}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Translate for local market</span>
              </label>
              <button
                onClick={runAnalysis}
                disabled={!productId || !country || loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Run compliance check
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Error:</span> {error}
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Overall Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Is it compliant?</h3>
                </div>
                <StatusBadge status={result.analysis.overallStatus} />
                <p className="mt-3 text-sm text-gray-600">{result.analysis.summary}</p>
              </div>

              {/* Market Readiness */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">How ready is it?</h3>
                </div>
                <ScoreGauge score={result.analysis.marketEntryReadiness.score} />
                <p className="mt-2 text-sm text-gray-600">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />
                  Time to market: {result.analysis.marketEntryReadiness.timeToMarket}
                </p>
              </div>

              {/* Product Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">Product details</h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{result.product.name}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {result.product.certifications.map((cert: string) => (
                    <span key={cert} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                      {cert}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  EU Data Residency: {result.product.euDataResidency ? "Available" : "Not available"}
                </p>
              </div>
            </div>

            {/* Regulatory Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                Regulation-by-regulation breakdown
              </h3>
              <div className="space-y-4">
                {result.analysis.regulatoryFit.map((reg) => (
                  <details key={reg.regulationId} className="border border-gray-100 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <StatusBadge status={reg.status} />
                        <span className="font-medium text-gray-900">{reg.regulationName}</span>
                        {result.applicableRegulations.find((r) => r.id === reg.regulationId)?.sourceUrl && (
                          <a
                            href={result.applicableRegulations.find((r) => r.id === reg.regulationId)?.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 hover:bg-blue-100"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Twilio docs
                          </a>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </summary>
                    <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                      <p className="text-sm text-gray-700 mb-3">{reg.explanation}</p>
                      {reg.risks.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-red-700 uppercase mb-1">Watch out for</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {reg.risks.map((r: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {reg.mitigations.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-green-700 uppercase mb-1">How to handle it</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {reg.mitigations.map((m: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                                {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Compliance Resources */}
            {result.product.complianceLinks && result.product.complianceLinks.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-gray-600" />
                  Helpful links and documentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {result.product.complianceLinks.map((link: { label: string; url: string; description: string }, i: number) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 border border-gray-100 rounded-lg hover:border-red-200 hover:bg-red-50 transition-colors"
                    >
                      <div className="text-sm font-medium text-red-700">{link.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{link.description}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Sales Positioning */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Localized Positioning */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-600" />
                  What to say to buyers in {country}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Opening line</h4>
                    <p className="text-sm font-medium text-gray-900">{result.analysis.localizedPositioning.headline}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Why this product fits</h4>
                    <p className="text-sm text-gray-700">{result.analysis.localizedPositioning.valueProposition}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">What you can say to customers</h4>
                    <p className="text-sm text-gray-700 italic">{result.analysis.localizedPositioning.complianceStatement}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">What to say on a call</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.analysis.localizedPositioning.talkTrackBullets.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Market Entry */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Can we sell here?
                </h3>
                <div className="space-y-4">
                  {result.analysis.marketEntryReadiness.blockers.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-red-700 uppercase mb-2">What is blocking entry</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {result.analysis.marketEntryReadiness.blockers.map((b: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-semibold text-green-700 uppercase mb-2">What makes entry faster</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.analysis.marketEntryReadiness.accelerators.map((a: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">What the customer gets</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.analysis.localizedPositioning.customerBenefits.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Objection Handling */}
            {result.objections && result.objections.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-amber-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  If the customer pushes back on data residency
                </h3>
                <p className="text-sm text-gray-500 mb-4">This product is not available in the EU (IE1) Region. Here is how to handle common objections.</p>
                <div className="space-y-3">
                  {result.objections.map((obj: { id: string; customerSays: string; reality: string; whatToSay: string; supportingLinks: { label: string; url: string }[] }) => (
                    <details key={obj.id} className="border border-amber-100 rounded-lg">
                      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-amber-50">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-amber-800">Customer says:</span>
                          <span className="text-sm text-gray-700 italic">&ldquo;{obj.customerSays}&rdquo;</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </summary>
                      <div className="px-4 pb-4 border-t border-amber-100 pt-3 space-y-3">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">The reality</h4>
                          <p className="text-sm text-gray-700">{obj.reality}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">What to say</h4>
                          <p className="text-sm text-gray-800 bg-amber-50 p-3 rounded-lg">{obj.whatToSay}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Share these links</h4>
                          <div className="flex flex-wrap gap-2">
                            {obj.supportingLinks.map((link: { label: string; url: string }, i: number) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" />
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>

                {/* Alternative products with EU residency */}
                {result.alternativeProducts && result.alternativeProducts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-amber-100">
                    <h4 className="text-xs font-semibold text-green-700 uppercase mb-2">Products that DO offer EU data residency (IE1 Dublin)</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.alternativeProducts.map((alt: { name: string; url: string }, i: number) => (
                        <a
                          key={i}
                          href={alt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {alt.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Localized Content */}
            {result.localization && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-gray-600" />
                  Localized content ({selectedCountry?.language?.toUpperCase()})
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Translated content</h4>
                    <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-800 whitespace-pre-wrap">
                      {typeof result.localization.localizedContent === "string"
                        ? result.localization.localizedContent
                        : Object.entries(result.localization.localizedContent).map(([key, value]) => (
                            <div key={key} className="mb-3">
                              <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">{key.replace(/([A-Z])/g, " $1").trim()}</h5>
                              {Array.isArray(value)
                                ? <ul className="list-disc list-inside space-y-0.5">{value.map((v, i) => <li key={i}>{v}</li>)}</ul>
                                : <p>{value}</p>
                              }
                            </div>
                          ))
                      }
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">What was changed for this market</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {result.localization.culturalNotes.map((note: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Globe className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Applicable Regulations Reference */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Which regulations apply (reference table)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Regulation</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Full name</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Category</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Enforcement</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Max penalty</th>
                      <th className="text-left py-2 px-3 font-medium text-gray-700">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.applicableRegulations.map((reg) => (
                      <tr key={reg.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2 px-3 font-medium">{reg.name}</td>
                        <td className="py-2 px-3 text-gray-600">{reg.fullName}</td>
                        <td className="py-2 px-3">
                          <span className="px-2 py-0.5 rounded text-xs bg-gray-100">{reg.category}</span>
                        </td>
                        <td className="py-2 px-3 text-gray-600">{reg.enforcementBody}</td>
                        <td className="py-2 px-3 text-gray-600">{reg.maxPenalty}</td>
                        <td className="py-2 px-3">
                          <a href={reg.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900">
                            <ExternalLink className="w-3 h-3" />
                            Twilio docs
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && !error && (
          <div className="text-center py-16">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Pick a product and country to get started</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              This tool checks which EU regulations apply, shows whether the product meets them, and gives you ready-to-use sales content for that market.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-gray-400">
          AI Compliance & Localization Engine — Powered by Claude (AWS Bedrock) — Based on public Twilio docs
          <br />
          This tool gives guidance only. Always check with legal before making compliance claims to customers.
        </div>
      </footer>
    </div>
  );
}
