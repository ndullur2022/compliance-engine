"use client";

import { useState } from "react";
import { Shield, Globe, AlertTriangle, CheckCircle, Clock, ChevronRight, Loader2, Building2, Languages, ExternalLink, Users, TrendingUp, MessageSquare, HelpCircle, Database } from "lucide-react";

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

const INDUSTRY_SEGMENTS = [
  { segment: "Retail", verticals: ["Retail", "Hospitality", "Travel & Hospitality", "Transportation", "CPG", "On-Demand / Gig Economy"] },
  { segment: "High Tech & AI", verticals: ["Technology", "SaaS", "Education", "Media"] },
  { segment: "Healthcare & Life Sciences", verticals: ["Healthcare", "Life Sciences"] },
  { segment: "Financial Services", verticals: ["Financial Services"] },
  { segment: "ISV", verticals: ["Professional Services", "Real Estate", "Nonprofit"] },
  { segment: "Martech", verticals: ["Retail", "Media", "CPG"] },
];

const BUYER_PERSONAS = [
  { id: "", label: "Any buyer (general)", tier: "" },
  { id: "cmo", label: "CMO", tier: "c-suite" },
  { id: "cxo", label: "Chief Experience Officer", tier: "c-suite" },
  { id: "cto", label: "CTO", tier: "c-suite" },
  { id: "ciso", label: "CISO", tier: "c-suite" },
  { id: "cdo", label: "Chief Data Officer", tier: "c-suite" },
  { id: "cfo", label: "CFO", tier: "c-suite" },
  { id: "marketing_director", label: "VP/Director of Marketing", tier: "lob" },
  { id: "product_engineering_leader", label: "Product/Engineering Leader", tier: "lob" },
  { id: "it_director", label: "IT Director", tier: "lob" },
  { id: "vp_customer_support", label: "VP of Customer Support", tier: "lob" },
  { id: "cpo", label: "Chief Product Officer", tier: "lob" },
  { id: "marketing_practitioner", label: "Marketing Practitioner", tier: "practitioners" },
  { id: "data_engineer", label: "Data Engineer/Scientist", tier: "practitioners" },
  { id: "software_developer", label: "Software Developer", tier: "practitioners" },
  { id: "lead_developer", label: "Lead Developer", tier: "practitioners" },
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
  residencyNuances: {
    ie1Status: string;
    ie1StatusLabel: string;
    channels: { channel: string; status: string; details: string; eta?: string }[] | null;
    speechProviders: { provider: string; status: string; details: string }[] | null;
    excludedFeatures: string[];
    notes: string[];
    roadmap: string | null;
    billingNote: string;
  } | null;
  emea_faq: {
    id: string;
    title: string;
    questions: { question: string; answer: string; sources?: string[] }[];
  }[];
  gtmContext?: {
    persona: {
      id: string;
      title: string;
      tier: string;
      careabouts: string[];
      challenges: string[];
      metrics: string[];
    } | null;
    useCases: {
      name: string;
      description: string;
      valuePool: string;
      businessGoal: string;
      kpis: string[];
    }[];
    customerStories: {
      company: string;
      country: string;
      vertical: string;
      url: string;
      summary: string;
      products_used: string[];
    }[];
    kpiDirections: Record<string, string>;
    northStars: Record<string, { metric: string; dir: string }>;
  };
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    compliant: "bg-emerald-50 text-emerald-700 border-emerald-200",
    partial: "bg-amber-50 text-amber-700 border-amber-200",
    "requires-config": "bg-blue-50 text-blue-700 border-blue-200",
    "not-applicable": "bg-gray-50 text-gray-500 border-gray-200",
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

function ResidencyBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ga: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "private-beta": "bg-purple-50 text-purple-700 border-purple-200",
    partial: "bg-amber-50 text-amber-700 border-amber-200",
    "not-available": "bg-red-50 text-red-700 border-red-200",
  };
  const labels: Record<string, string> = {
    ga: "GA in IE1",
    "private-beta": "Private Beta",
    partial: "Partial",
    "not-available": "Not in IE1",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles["partial"]}`}>
      {labels[status] || status}
    </span>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-600" : score >= 60 ? "text-amber-600" : "text-red-600";
  const bgColor = score >= 80 ? "bg-emerald-50" : score >= 60 ? "bg-amber-50" : "bg-red-50";
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl ${bgColor}`}>
      <div className={`text-4xl font-bold ${color}`}>{score}</div>
      <div className="text-sm">
        <div className={`font-semibold ${color}`}>Readiness score</div>
        <div className="text-gray-500">out of 100</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [productId, setProductId] = useState("");
  const [country, setCountry] = useState("");
  const [segment, setSegment] = useState("");
  const [vertical, setVertical] = useState("");
  const [persona, setPersona] = useState("");
  const [includeLocalization, setIncludeLocalization] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const selectedSegment = INDUSTRY_SEGMENTS.find(s => s.segment === segment);
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
          industry: vertical || segment || "General",
          vertical: vertical || segment || "",
          persona,
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
    <div className="min-h-screen bg-[#f4f4f6]">
      {/* Header - Twilio dark navy style */}
      <header className="bg-[#121c2d] text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4">
          <Shield className="w-9 h-9 text-[#F22F46]" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">AI Compliance & Localization Engine</h1>
            <p className="text-sm text-blue-200 opacity-80">Check EU regulatory compliance for Twilio products and get sales-ready content</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Input Panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#121c2d] mb-4">What do you want to check?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Product</label>
              <select value={productId} onChange={(e) => setProductId(e.target.value)} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
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
              <label className="block text-sm font-medium text-gray-600 mb-1">Country</label>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
                <option value="">Select a country...</option>
                {COUNTRIES.map(c => (<option key={c.code} value={c.code}>{c.label}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Industry segment</label>
              <select value={segment} onChange={(e) => { setSegment(e.target.value); setVertical(""); }} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
                <option value="">Any industry</option>
                {INDUSTRY_SEGMENTS.map(s => (<option key={s.segment} value={s.segment}>{s.segment}</option>))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Vertical</label>
              <select value={vertical} onChange={(e) => setVertical(e.target.value)} disabled={!segment} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46] disabled:bg-gray-100 disabled:text-gray-400">
                <option value="">All verticals</option>
                {selectedSegment?.verticals.map(v => (<option key={v} value={v}>{v}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Buyer persona</label>
              <select value={persona} onChange={(e) => setPersona(e.target.value)} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
                {BUYER_PERSONAS.map(p => (<option key={p.id} value={p.id}>{p.label}</option>))}
              </select>
            </div>
            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" checked={includeLocalization} onChange={(e) => setIncludeLocalization(e.target.checked)} className="rounded border-gray-300 text-[#F22F46] focus:ring-[#F22F46]" />
                <span className="text-sm text-gray-600">Translate for local market</span>
              </label>
              <button onClick={runAnalysis} disabled={!productId || !country || loading} className="w-full bg-[#F22F46] hover:bg-[#d91e3a] disabled:bg-gray-300 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</>) : (<><Shield className="w-4 h-4" />Run compliance check</>)}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8">
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
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-[#121c2d]" />
                  <h3 className="font-semibold text-[#121c2d]">Compliance status</h3>
                </div>
                <StatusBadge status={result.analysis.overallStatus} />
                <p className="mt-3 text-sm text-gray-600">{result.analysis.summary}</p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-[#121c2d]" />
                  <h3 className="font-semibold text-[#121c2d]">Market readiness</h3>
                </div>
                <ScoreGauge score={result.analysis.marketEntryReadiness.score} />
                <p className="mt-2 text-sm text-gray-500">
                  <Clock className="w-3.5 h-3.5 inline mr-1" />
                  Time to market: {result.analysis.marketEntryReadiness.timeToMarket}
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-[#121c2d]" />
                  <h3 className="font-semibold text-[#121c2d]">Product overview</h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{result.product.name}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {result.product.certifications.map((cert: string) => (
                    <span key={cert} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#121c2d]/5 text-[#121c2d]">{cert}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500">EU Data Residency:</span>
                  {result.residencyNuances ? (
                    <ResidencyBadge status={result.residencyNuances.ie1Status} />
                  ) : (
                    <span className="text-xs text-gray-600">{result.product.euDataResidency ? "Available" : "Not available"}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Combined: Product + Regulations + Data Residency */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-[#121c2d] mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#F22F46]" />
                Compliance and data residency details
              </h3>

              {/* Data Residency Nuances */}
              {result.residencyNuances && (
                <div className="mb-6 p-4 bg-[#f4f4f6] rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-4 h-4 text-[#121c2d]" />
                    <h4 className="text-sm font-semibold text-[#121c2d]">EU data residency (IE1 Dublin)</h4>
                    <ResidencyBadge status={result.residencyNuances.ie1Status} />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{result.residencyNuances.ie1StatusLabel}</p>

                  {result.residencyNuances.channels && (
                    <div className="mb-3">
                      <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Channel availability</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {result.residencyNuances.channels.map((ch) => (
                          <div key={ch.channel} className="flex items-start gap-2 text-sm">
                            {ch.status === "ga" ? <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> : ch.status === "roadmap" ? <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />}
                            <div>
                              <span className="font-medium text-gray-800">{ch.channel}</span>
                              <span className="text-gray-500 ml-1">— {ch.details}</span>
                              {ch.eta && <span className="text-xs text-purple-600 ml-1">(ETA: {ch.eta})</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.residencyNuances.speechProviders && (
                    <div className="mb-3">
                      <h5 className="text-xs font-semibold text-gray-500 uppercase mb-2">Speech provider EU processing</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {result.residencyNuances.speechProviders.map((sp) => (
                          <div key={sp.provider} className="flex items-start gap-2 text-sm">
                            {sp.status === "eu-available" ? <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> : sp.status === "us-only" ? <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" /> : <HelpCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                            <div>
                              <span className="font-medium text-gray-800">{sp.provider}</span>
                              <span className="text-gray-500 ml-1">— {sp.details}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.residencyNuances.excludedFeatures.length > 0 && (
                    <div className="mb-3">
                      <h5 className="text-xs font-semibold text-red-600 uppercase mb-1">Not available in IE1</h5>
                      <ul className="text-sm text-gray-600 space-y-0.5">
                        {result.residencyNuances.excludedFeatures.map((f, i) => (
                          <li key={i} className="flex items-start gap-2"><AlertTriangle className="w-3.5 h-3.5 text-red-300 mt-0.5 shrink-0" />{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.residencyNuances.notes.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <ul className="text-xs text-gray-500 space-y-1">
                        {result.residencyNuances.notes.map((n, i) => (<li key={i}>• {n}</li>))}
                      </ul>
                    </div>
                  )}

                  <p className="mt-3 text-xs text-gray-400 italic">{result.residencyNuances.billingNote}</p>
                </div>
              )}

              {/* Regulation Breakdown */}
              <div className="space-y-3">
                {result.analysis.regulatoryFit.map((reg) => (
                  <details key={reg.regulationId} className="border border-gray-100 rounded-xl group">
                    <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <StatusBadge status={reg.status} />
                        <span className="font-medium text-gray-900">{reg.regulationName}</span>
                        {result.applicableRegulations.find((r) => r.id === reg.regulationId)?.sourceUrl && (
                          <a href={result.applicableRegulations.find((r) => r.id === reg.regulationId)?.sourceUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
                            <ExternalLink className="w-3 h-3" />Source
                          </a>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                      <p className="text-sm text-gray-700 mb-3">{reg.explanation}</p>
                      {reg.risks.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-red-600 uppercase mb-1">Risks</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {reg.risks.map((r: string, i: number) => (<li key={i} className="flex items-start gap-2"><AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />{r}</li>))}
                          </ul>
                        </div>
                      )}
                      {reg.mitigations.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-emerald-600 uppercase mb-1">Mitigations</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {reg.mitigations.map((m: string, i: number) => (<li key={i} className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />{m}</li>))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>

              {/* Compliance Links */}
              {result.product.complianceLinks && result.product.complianceLinks.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">Documentation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {result.product.complianceLinks.map((link: { label: string; url: string; description: string }, i: number) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="block p-3 border border-gray-100 rounded-lg hover:border-[#F22F46]/30 hover:bg-red-50/30 transition-colors">
                        <div className="text-sm font-medium text-[#F22F46]">{link.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{link.description}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sales Positioning */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-[#121c2d] mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#F22F46]" />
                  What to say to buyers in {country}
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Opening line</h4>
                    <p className="text-sm font-medium text-gray-900">{result.analysis.localizedPositioning.headline}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Value proposition</h4>
                    <p className="text-sm text-gray-700">{result.analysis.localizedPositioning.valueProposition}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Compliance statement</h4>
                    <p className="text-sm text-gray-700 italic">{result.analysis.localizedPositioning.complianceStatement}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Talk track</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.analysis.localizedPositioning.talkTrackBullets.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2"><ChevronRight className="w-3.5 h-3.5 text-[#F22F46] mt-0.5 shrink-0" />{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-[#121c2d] mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#F22F46]" />
                  Market entry assessment
                </h3>
                <div className="space-y-4">
                  {result.analysis.marketEntryReadiness.blockers.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-red-600 uppercase mb-2">Blockers</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {result.analysis.marketEntryReadiness.blockers.map((b: string, i: number) => (
                          <li key={i} className="flex items-start gap-2"><AlertTriangle className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-600 uppercase mb-2">Accelerators</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.analysis.marketEntryReadiness.accelerators.map((a: string, i: number) => (
                        <li key={i} className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Customer benefits</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.analysis.localizedPositioning.customerBenefits.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Objection Handling */}
            {result.objections && result.objections.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-amber-200 p-6">
                <h3 className="font-semibold text-[#121c2d] mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Data residency objection handling
                </h3>
                <p className="text-sm text-gray-500 mb-4">This product is not available in IE1. Here is how to handle pushback.</p>
                <div className="space-y-3">
                  {result.objections.map((obj) => (
                    <details key={obj.id} className="border border-amber-100 rounded-xl">
                      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-amber-50 rounded-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-amber-800">Customer:</span>
                          <span className="text-sm text-gray-700 italic">&ldquo;{obj.customerSays}&rdquo;</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </summary>
                      <div className="px-4 pb-4 border-t border-amber-100 pt-3 space-y-3">
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Reality</h4>
                          <p className="text-sm text-gray-700">{obj.reality}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">What to say</h4>
                          <p className="text-sm text-gray-800 bg-amber-50 p-3 rounded-lg">{obj.whatToSay}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {obj.supportingLinks.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800 hover:bg-amber-200">
                              <ExternalLink className="w-3 h-3" />{link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
                {result.alternativeProducts && result.alternativeProducts.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-amber-100">
                    <h4 className="text-xs font-semibold text-emerald-700 uppercase mb-2">Products with EU data residency (IE1)</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.alternativeProducts.map((alt, i) => (
                        <a key={i} href={alt.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                          <CheckCircle className="w-3 h-3" />{alt.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* EMEA FAQ */}
            {result.emea_faq && result.emea_faq.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-[#121c2d] mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#F22F46]" />
                  Common EMEA compliance questions
                </h3>
                <div className="space-y-4">
                  {result.emea_faq.map((cat) => (
                    <div key={cat.id}>
                      <h4 className="text-sm font-semibold text-[#121c2d] mb-2">{cat.title}</h4>
                      <div className="space-y-2">
                        {cat.questions.map((q, i) => (
                          <details key={i} className="border border-gray-100 rounded-xl">
                            <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-xl">
                              <span className="text-sm font-medium text-gray-800">{q.question}</span>
                              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                            </summary>
                            <div className="px-3 pb-3 pt-2 border-t border-gray-100">
                              <p className="text-sm text-gray-600">{q.answer}</p>
                              {q.sources && q.sources.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {q.sources.map((src, j) => (
                                    <a key={j} href={src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-900">
                                      <ExternalLink className="w-3 h-3" />Source
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Localized Content */}
            {result.localization && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-[#121c2d] mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-[#F22F46]" />
                  Localized content ({selectedCountry?.language?.toUpperCase()})
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Translated content</h4>
                    <div className="bg-[#f4f4f6] rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap">
                      {typeof result.localization.localizedContent === "string"
                        ? result.localization.localizedContent
                        : Object.entries(result.localization.localizedContent).map(([key, value]) => (
                            <div key={key} className="mb-3">
                              <h5 className="text-xs font-semibold text-gray-600 uppercase mb-1">{key.replace(/([A-Z])/g, " $1").trim()}</h5>
                              {Array.isArray(value) ? <ul className="list-disc list-inside space-y-0.5">{value.map((v, i) => <li key={i}>{v}</li>)}</ul> : <p>{value}</p>}
                            </div>
                          ))
                      }
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Cultural adaptations</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      {result.localization.culturalNotes.map((note: string, i: number) => (
                        <li key={i} className="flex items-start gap-2"><Globe className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* GTM Context */}
            {result.gtmContext && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {result.gtmContext.useCases.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-[#121c2d] mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#F22F46]" />
                      Use cases
                    </h3>
                    <div className="space-y-3">
                      {result.gtmContext.useCases.map((uc, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">{uc.name}</span>
                            <span className="px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-700">{uc.valuePool}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{uc.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {uc.kpis.map((kpi, j) => (
                              <span key={j} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                                {result.gtmContext?.kpiDirections[kpi] === "up" ? "↑" : "↓"} {kpi}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.gtmContext.customerStories.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <h3 className="font-semibold text-[#121c2d] mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-[#F22F46]" />
                      Customer stories ({country})
                    </h3>
                    <div className="space-y-3">
                      {result.gtmContext.customerStories.map((story, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{story.company}</span>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-700">{story.vertical}</span>
                              <span className="px-2 py-0.5 rounded text-xs bg-emerald-50 text-emerald-700">{story.country}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{story.summary}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {story.products_used.map((p, j) => (
                                <span key={j} className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{p}</span>
                              ))}
                            </div>
                            <a href={story.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[#F22F46] hover:text-[#d91e3a]">
                              <ExternalLink className="w-3 h-3" />Read story
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Persona */}
            {result.gtmContext?.persona && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-[#121c2d] mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#F22F46]" />
                  Selling to: {result.gtmContext.persona.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Care-abouts</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.gtmContext.persona.careabouts.map((c, i) => (
                        <li key={i} className="flex items-start gap-2"><ChevronRight className="w-3.5 h-3.5 text-[#F22F46] mt-0.5 shrink-0" />{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Challenges</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.gtmContext.persona.challenges.map((c, i) => (
                        <li key={i} className="flex items-start gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Metrics</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {result.gtmContext.persona.metrics.map((m, i) => (
                        <li key={i} className="flex items-start gap-2"><TrendingUp className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && !error && (
          <div className="text-center py-20">
            <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#121c2d] mb-2">Pick a product and country to get started</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Check EU regulatory compliance, get data residency details, and generate localized sales content for any Twilio product.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 bg-[#121c2d] mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs text-blue-200 opacity-70">
          AI Compliance & Localization Engine — Powered by OpenAI GPT-4o — Based on public Twilio docs
          <br />
          This tool gives guidance only. Always check with legal before making compliance claims to customers.
        </div>
      </footer>
    </div>
  );
}
