"use client";

import { useState } from "react";
import { Shield, Globe, AlertTriangle, CheckCircle, Clock, ChevronRight, ChevronDown, Loader2, Building2, Languages, ExternalLink, Users, TrendingUp, MessageSquare, HelpCircle, Database, BookOpen, Zap, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

const USE_CASE_CATEGORIES = [
  { id: "marketing", label: "Marketing", icon: "TrendingUp" },
  { id: "sales", label: "Sales", icon: "Users" },
  { id: "support", label: "Support", icon: "MessageSquare" },
  { id: "product-ops", label: "Product & Ops", icon: "Zap" },
  { id: "security", label: "Security", icon: "Shield" },
];

const USE_CASES = [
  // Support buying center
  { id: "multi-channel-ivr", name: "Multi-Channel Inbound Self-Service & IVR/IVA", category: "support", products: ["voice", "studio", "conversation-relay"], description: "Support costs are too high. Reduce first call resolution time, wait time, and ticket backlog with intelligent self-service." },
  { id: "supervisor-coaching", name: "Supervisor Coaching & Insights", category: "support", products: ["flex", "conversation-intelligence"], description: "Limited visibility into agent performance. Improve CSAT, average handle time, and issue resolution." },
  { id: "live-agent-assist", name: "Real-Time Live Agent Assist", category: "support", products: ["flex", "conversation-intelligence"], description: "Human agents lack answers in real time. Improve first call resolution and reduce average handle time." },
  { id: "contextual-handoff", name: "Intelligent Contextual Handoff", category: "support", products: ["taskrouter", "flex"], description: "Customers don't get to the right agent. Reduce wait time and improve issue resolution time." },
  { id: "multi-channel-contact-center", name: "Multi-Channel Contact Center", category: "support", products: ["flex", "messaging", "voice"], description: "Live agents lack a unified workspace for two-way conversations across channels after automated routing." },
  { id: "appointment-scheduling", name: "Appointment Scheduling & Rescheduling", category: "support", products: ["messaging", "voice", "studio"], description: "Scheduling processes are manual. Reduce no-show rate and wait time with automated reminders." },
  { id: "automated-wrap-up", name: "Automated Wrap-Up & Knowledge Capture", category: "support", products: ["conversation-intelligence", "flex"], description: "Agents spend too much time documenting. Reduce average handle time and improve first call resolution." },
  { id: "persistent-conversations", name: "Persistent Conversations & Contextual History", category: "support", products: ["flex", "segment-unify"], description: "Customer context is fragmented. Improve CSAT, first call resolution, and reduce ticket backlog." },
  { id: "observability-monitoring", name: "Real-Time Observability & Compliance Monitoring", category: "support", products: ["event-streams", "conversation-intelligence"], description: "Can't trust AI agents at scale. Monitor first call resolution, average handle time, and issue resolution." },

  // Sales buying center
  { id: "click-to-call", name: "Click to Call", category: "sales", products: ["voice", "flex"], description: "Friction slows sales conversations. Improve first-time buyer conversion rate and reduce sales cycle length." },
  { id: "warm-start-outbound", name: "Warm-Start Outbound Agents", category: "sales", products: ["voice", "conversation-relay", "flex"], description: "Don't want to waste human agent time on leads. Improve call answer rate and conversion." },
  { id: "lead-prioritization", name: "Lead Prioritization & Alerts", category: "sales", products: ["messaging", "voice"], description: "Reps waste time on low-value leads. Reduce sales cycle length and improve call answer rate." },
  { id: "personalized-promotions", name: "Personalized Promotions", category: "sales", products: ["segment-engage", "messaging", "sendgrid"], description: "Offers feel generic and ineffective. Improve conversion, ROAS, and upsell rates." },

  // Marketing buying center
  { id: "automated-surveys", name: "Automated Surveys & NPS", category: "marketing", products: ["messaging", "sendgrid", "studio"], description: "Lack customer feedback and insights. Track churn rate, CSAT/NPS, and business productivity." },
  { id: "drip-lifecycle", name: "Drip & Lifecycle Campaigns", category: "marketing", products: ["segment-engage", "messaging", "sendgrid"], description: "Low engagement across customer lifecycle. Improve conversion, reduce churn, boost deliverability." },
  { id: "ad-spend-optimization", name: "Ad Spend Optimization", category: "marketing", products: ["segment-engage", "messaging"], description: "Marketing spend isn't delivering ROI. Improve ROAS and reduce customer acquisition cost." },
  { id: "mass-promotions", name: "Mass Promotions", category: "marketing", products: ["messaging", "sendgrid", "marketing-campaigns"], description: "Need to reach customers at scale. Boost conversion, upsell, and deliverability rates." },
  { id: "loyalty-rewards", name: "Loyalty & Rewards", category: "marketing", products: ["messaging", "sendgrid", "segment-engage"], description: "Struggling to retain existing customers. Improve deliverability, upsell, and repeat purchase rates." },
  { id: "abandon-cart-winback", name: "Abandon Cart & Winback", category: "marketing", products: ["segment-engage", "messaging", "sendgrid"], description: "Lost revenue from abandoned journeys. Recover conversion, upsell, and reduce churn." },
  { id: "mass-alerts", name: "Mass Alerts & Notifications", category: "marketing", products: ["messaging", "sendgrid", "voice"], description: "Need to communicate urgent updates. Improve read rate, incident response, reduce compliance violations." },

  // Product & Ops buying center
  { id: "new-user-onboarding", name: "New User Onboarding & Activation", category: "product-ops", products: ["messaging", "sendgrid", "verify"], description: "New users drop off or fail to complete setup. Improve activation rate and opt-in rate." },
  { id: "transaction-alerts", name: "Account & Transaction Specific Alerts", category: "product-ops", products: ["messaging", "sendgrid", "voice"], description: "Customers miss critical account updates. Reduce churn, fraud incidents, improve deliverability." },
  { id: "unified-profiles", name: "Unified Profiles & Identity Management/Resolution", category: "product-ops", products: ["segment-connections", "segment-unify"], description: "Customer data exists in silos. Reduce fraud, false positives, compliance violations, boost productivity." },
  { id: "consent-preference", name: "Compliant Consent, Preference Management & Secure Segmentation", category: "product-ops", products: ["segment-connections", "privacy-portal", "messaging"], description: "Struggling to manage consent compliance, preference management, or segmentation across channels." },

  // Security buying center
  { id: "secure-signup", name: "Secure Signup", category: "security", products: ["verify", "lookup"], description: "Fake or fraudulent accounts are created without proper safeguards. Improve activation and signup completion rates." },
  { id: "fraud-detection", name: "Fraud Detection & Mitigation", category: "security", products: ["verify", "lookup"], description: "Fraud losses are increasing. Reduce fraud incidents, false positives, and improve deliverability." },
  { id: "secure-login", name: "Secure Login", category: "security", products: ["verify", "lookup"], description: "Logins create friction or risk around account takeovers. Reduce account takeovers, improve OTP success." },
];

const PRODUCTS = [
  { id: "conversation-memory", name: "Conversation Memory", category: "Conversations" },
  { id: "conversation-orchestrator", name: "Conversation Orchestrator", category: "Conversations" },
  { id: "conversation-intelligence", name: "Conversation Intelligence", category: "Conversations" },
  { id: "conversation-relay", name: "Conversation Relay", category: "Conversations" },
  { id: "messaging", name: "Messaging APIs", category: "Communications" },
  { id: "sendgrid", name: "SendGrid Email", category: "Communications" },
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
  { segment: "Retail", verticals: ["Retail", "Hospitality", "Travel & Hospitality", "Transportation", "CPG"] },
  { segment: "High Tech & AI", verticals: ["Technology", "SaaS", "Education", "Media"] },
  { segment: "Healthcare & Life Sciences", verticals: ["Healthcare", "Life Sciences"] },
  { segment: "Financial Services", verticals: ["Financial Services"] },
  { segment: "ISV", verticals: ["Professional Services", "Real Estate", "Nonprofit"] },
];

const BUYER_PERSONAS = [
  { id: "", label: "Any buyer" },
  { id: "cmo", label: "CMO" },
  { id: "cxo", label: "CXO" },
  { id: "cto", label: "CTO" },
  { id: "ciso", label: "CISO" },
  { id: "cdo", label: "CDO" },
  { id: "cfo", label: "CFO" },
  { id: "marketing_director", label: "VP Marketing" },
  { id: "product_engineering_leader", label: "VP Engineering" },
  { id: "it_director", label: "IT Director" },
  { id: "vp_customer_support", label: "VP Support" },
  { id: "software_developer", label: "Developer" },
];

interface AnalysisResult {
  product: any;
  applicableRegulations: any[];
  analysis: {
    overallStatus: string;
    summary: string;
    regulatoryFit: { regulationId: string; regulationName: string; status: string; explanation: string; risks: string[]; mitigations: string[] }[];
    localizedPositioning: { headline: string; valueProposition: string; complianceStatement: string; customerBenefits: string[]; talkTrackBullets: string[] };
    marketEntryReadiness: { score: number; blockers: string[]; accelerators: string[]; timeToMarket: string };
  };
  localization: { localizedContent: string | Record<string, string | string[]>; culturalNotes: string[] } | null;
  objections: { id: string; customerSays: string; reality: string; whatToSay: string; supportingLinks: { label: string; url: string }[] }[];
  alternativeProducts: { name: string; url: string }[];
  residencyNuances: { ie1Status: string; ie1StatusLabel: string; channels: any[] | null; speechProviders: any[] | null; excludedFeatures: string[]; notes: string[]; roadmap: string | null; billingNote: string } | null;
  blogArticles: { title: string; url: string; author: string; date: string; summary: string; tags: string[] }[];
  deletionSolution: { productId: string; productName: string; deletionMethod: string; deletionEndpoint: string | null; retentionDefault: string; configurableRetention: boolean; redactionCapabilities: string[]; automatedDeletion: boolean; dsarSupport: string; steps: string[]; caveats: string[]; documentationUrl: string | null } | null;
  emea_faq: { id: string; title: string; questions: { question: string; answer: string; sources?: string[] }[] }[];
  gtmContext?: {
    persona: { id: string; title: string; tier: string; careabouts: string[]; challenges: string[]; metrics: string[] } | null;
    useCases: { name: string; description: string; valuePool: string; businessGoal: string; kpis: string[] }[];
    kpiDirections: Record<string, string>;
    northStars: Record<string, { metric: string; dir: string }>;
  };
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = { compliant: "bg-emerald-50 text-emerald-700 border-emerald-200", partial: "bg-amber-50 text-amber-700 border-amber-200", "requires-config": "bg-blue-50 text-blue-700 border-blue-200", "not-applicable": "bg-gray-50 text-gray-500 border-gray-200" };
  const labels: Record<string, string> = { compliant: "Twilio supports", partial: "Partial enablement", "requires-config": "Customer config required", "not-applicable": "N/A" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${styles[status] || styles["partial"]}`}>{labels[status] || status}</span>;
}

function ResidencyBadge({ status }: { status: string }) {
  const styles: Record<string, string> = { ga: "bg-emerald-50 text-emerald-700", "private-beta": "bg-purple-50 text-purple-700", partial: "bg-amber-50 text-amber-700", "not-available": "bg-red-50 text-red-700" };
  const labels: Record<string, string> = { ga: "IE1 GA", "private-beta": "Beta", partial: "Partial", "not-available": "No IE1" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${styles[status] || ""}`}>{labels[status] || status}</span>;
}

export default function Home() {
  const [selectionMode, setSelectionMode] = useState<"useCase" | "products">("useCase");
  const [useCaseCategory, setUseCaseCategory] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [segment, setSegment] = useState("");
  const [persona, setPersona] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, AnalysisResult>>({});
  const [error, setError] = useState("");

  const filteredUseCases = useCaseCategory ? USE_CASES.filter(uc => uc.category === useCaseCategory) : USE_CASES;
  const activeUseCase = USE_CASES.find(uc => uc.id === selectedUseCase);
  const selectedCountry = COUNTRIES.find(c => c.code === country);
  const activeProducts = selectionMode === "useCase" ? (activeUseCase?.products || []) : selectedProducts;

  function toggleProductSelection(pid: string) {
    setSelectedProducts(prev => prev.includes(pid) ? prev.filter(p => p !== pid) : [...prev, pid]);
  }

  function switchMode(mode: "useCase" | "products") {
    setSelectionMode(mode);
    setResults({});
    if (mode === "useCase") { setSelectedProducts([]); }
    else { setSelectedUseCase(""); setUseCaseCategory(""); }
  }

  async function runAnalysis() {
    if (!country || activeProducts.length === 0) return;
    if (selectionMode === "useCase" && !selectedUseCase) return;
    setLoading(true);
    setError("");
    setResults({});

    try {
      const analyses = await Promise.all(
        activeProducts.map(async (productId) => {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId,
              country,
              industry: segment || "General",
              vertical: segment || "",
              persona,
              language: selectedCountry?.language !== "en" ? selectedCountry?.language : "en",
            }),
          });
          if (!res.ok) return null;
          const data = await res.json();
          return { productId, data };
        })
      );

      const resultMap: Record<string, AnalysisResult> = {};
      analyses.filter(Boolean).forEach((a: any) => { resultMap[a.productId] = a.data; });
      setResults(resultMap);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const hasResults = Object.keys(results).length > 0;
  const firstResult = hasResults ? Object.values(results)[0] : null;

  return (
    <div className="min-h-screen bg-[#f4f4f6]">
      <header className="bg-[#121c2d]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-3">
          <Shield className="w-8 h-8 text-[#F22F46]" />
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">EMEA Readiness Engine</h1>
            <p className="text-xs text-blue-200/70">Internal reference tool for sales — not a compliance authority</p>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Legal disclaimer banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 flex items-start gap-2 text-amber-800 text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">FYI reference only.</span> This tool provides informational guidance for sales conversations. It is not legal advice and does not constitute a compliance certification. Always verify claims with legal before sharing with customers. Twilio enables businesses to adhere to GDPR — Twilio does not certify GDPR compliance on behalf of customers.
          </div>
        </div>
        {/* Step 1: Selection Mode + Context */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-5">
          {/* Mode toggle */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
            <span className="text-xs font-medium text-gray-500">Select by:</span>
            <button onClick={() => switchMode("useCase")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectionMode === "useCase" ? "bg-[#121c2d] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              Use case
            </button>
            <button onClick={() => switchMode("products")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectionMode === "products" ? "bg-[#121c2d] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              Products
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-4 items-end">
            {/* Left: Use case picker OR product multi-select */}
            {selectionMode === "useCase" ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Buying center</label>
                  <select value={useCaseCategory} onChange={(e) => { setUseCaseCategory(e.target.value); setSelectedUseCase(""); }} className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
                    <option value="">All buying centers</option>
                    {USE_CASE_CATEGORIES.map(c => (<option key={c.id} value={c.id}>{c.label}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Use case</label>
                  <select value={selectedUseCase} onChange={(e) => setSelectedUseCase(e.target.value)} className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
                    <option value="">Select use case...</option>
                    {filteredUseCases.map(uc => (<option key={uc.id} value={uc.id}>{uc.name}</option>))}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Select product</label>
                <select value={selectedProducts[0] || ""} onChange={(e) => setSelectedProducts(e.target.value ? [e.target.value] : [])} className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
                  <option value="">Select product...</option>
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Middle: Context */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
                  <option value="">Select...</option>
                  {COUNTRIES.map(c => (<option key={c.code} value={c.code}>{c.label}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Industry</label>
                <select value={segment} onChange={(e) => setSegment(e.target.value)} className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
                  <option value="">Any</option>
                  {INDUSTRY_SEGMENTS.map(s => (<option key={s.segment} value={s.segment}>{s.segment}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Persona</label>
                <select value={persona} onChange={(e) => setPersona(e.target.value)} className="w-full rounded-lg border-gray-200 border px-3 py-2 text-sm focus:ring-2 focus:ring-[#F22F46] focus:border-[#F22F46]">
                  {BUYER_PERSONAS.map(p => (<option key={p.id} value={p.id}>{p.label}</option>))}
                </select>
              </div>
            </div>

            {/* Right: Action */}
            <button onClick={runAnalysis} disabled={!country || activeProducts.length === 0 || (selectionMode === "useCase" && !selectedUseCase) || loading} className="bg-[#F22F46] hover:bg-[#d91e3a] disabled:bg-gray-300 text-white font-medium py-2 px-5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Analyzing...</> : <><Shield className="w-4 h-4" />Analyze</>}
            </button>
          </div>

          {/* Auto-selected products (use case mode) */}
          {selectionMode === "useCase" && activeUseCase && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">Products needed:</span>
              {activeProducts.map(pid => {
                const p = PRODUCTS.find(x => x.id === pid);
                return p ? <span key={pid} className="px-2 py-0.5 rounded text-xs bg-[#121c2d]/5 text-[#121c2d] font-medium">{p.name}</span> : null;
              })}
              <span className="ml-auto text-xs text-gray-400 italic">{activeUseCase.description}</span>
            </div>
          )}

          {/* Selected product (products mode) */}
          {selectionMode === "products" && selectedProducts.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {PRODUCTS.find(p => p.id === selectedProducts[0])?.name} selected
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 flex items-center gap-2 text-red-800 text-sm">
            <AlertTriangle className="w-4 h-4" />{error}
          </div>
        )}

        {/* Results - Dense multi-column layout */}
        {hasResults && firstResult && (
          <div className="space-y-5">
            {/* Row 1: Product cards (no score) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(results).map(([pid, r]) => (
                <div key={pid} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#121c2d] truncate">{r.product.name}</span>
                    <StatusBadge status={r.analysis.overallStatus} />
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    <span>Time to market: {r.analysis.marketEntryReadiness.timeToMarket}</span>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {r.residencyNuances && <ResidencyBadge status={r.residencyNuances.ie1Status} />}
                    <div className="flex gap-0.5 ml-auto">
                      {r.product.certifications?.slice(0, 3).map((c: string) => (
                        <span key={c} className="px-1 py-0.5 rounded text-[9px] bg-gray-100 text-gray-500">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: Three columns - Positioning | Regulations | Data Residency */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Col 1: Sales positioning */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#F22F46]" />Talk track for {country}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#121c2d]">{firstResult.analysis.localizedPositioning.headline}</p>
                  <p className="text-xs text-gray-600">{firstResult.analysis.localizedPositioning.valueProposition}</p>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">What to say on a call</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      {firstResult.analysis.localizedPositioning.talkTrackBullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5"><ChevronRight className="w-3 h-3 text-[#F22F46] mt-0.5 shrink-0" />{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">Customer benefits</p>
                    <ul className="text-xs text-gray-700 space-y-0.5">
                      {firstResult.analysis.localizedPositioning.customerBenefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5"><CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Col 2: Regulatory breakdown */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#F22F46]" />Regulations
                </h3>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {firstResult.analysis.regulatoryFit.map((reg) => (
                    <details key={reg.regulationId} className="border border-gray-100 rounded-lg">
                      <summary className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 text-xs">
                        <StatusBadge status={reg.status} />
                        <span className="font-medium text-gray-800">{reg.regulationName}</span>
                      </summary>
                      <div className="px-2 pb-2 text-xs text-gray-600">
                        <p className="mb-1">{reg.explanation}</p>
                        {reg.risks.length > 0 && <div className="text-red-600 text-[11px]">{reg.risks.join("; ")}</div>}
                        {reg.mitigations.length > 0 && <div className="text-emerald-600 text-[11px] mt-1">{reg.mitigations.join("; ")}</div>}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Col 3: Data residency */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#F22F46]" />Data residency (IE1)
                </h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {Object.entries(results).map(([pid, r]) => (
                    <div key={pid} className="border border-gray-100 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-800">{r.product.name}</span>
                        {r.residencyNuances ? <ResidencyBadge status={r.residencyNuances.ie1Status} /> : <span className="text-[10px] text-gray-400">{r.product.euDataResidency ? "Available" : "Not available"}</span>}
                      </div>
                      {r.residencyNuances?.channels && (
                        <div className="space-y-0.5 mt-1">
                          {r.residencyNuances.channels.map((ch: any) => (
                            <div key={ch.channel} className="flex items-center gap-1 text-[11px]">
                              {ch.status === "ga" ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : ch.status === "roadmap" ? <Clock className="w-3 h-3 text-amber-500" /> : <AlertTriangle className="w-3 h-3 text-red-400" />}
                              <span className="text-gray-700">{ch.channel}</span>
                              {ch.eta && <span className="text-purple-600 ml-auto">{ch.eta}</span>}
                            </div>
                          ))}
                        </div>
                      )}
                      {r.residencyNuances?.speechProviders && (
                        <div className="space-y-0.5 mt-1">
                          {r.residencyNuances.speechProviders.map((sp: any) => (
                            <div key={sp.provider} className="flex items-center gap-1 text-[11px]">
                              {sp.status === "eu-available" ? <CheckCircle className="w-3 h-3 text-emerald-500" /> : sp.status === "us-only" ? <AlertTriangle className="w-3 h-3 text-red-400" /> : <HelpCircle className="w-3 h-3 text-amber-500" />}
                              <span className="text-gray-700">{sp.provider}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {r.residencyNuances?.excludedFeatures && r.residencyNuances.excludedFeatures.length > 0 && (
                        <div className="mt-1 text-[10px] text-red-500">{r.residencyNuances.excludedFeatures.slice(0, 2).join("; ")}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Row 3: Objections | FAQ | Blog — three columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Objections */}
              {firstResult.objections && firstResult.objections.length > 0 && (
                <div className="bg-white rounded-xl border border-amber-200 p-4">
                  <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />Objection handling
                  </h3>
                  <div className="space-y-2 max-h-[350px] overflow-y-auto">
                    {firstResult.objections.map((obj) => (
                      <details key={obj.id} className="border border-amber-100 rounded-lg">
                        <summary className="p-2 cursor-pointer hover:bg-amber-50 text-xs">
                          <span className="italic text-gray-600">&ldquo;{obj.customerSays}&rdquo;</span>
                        </summary>
                        <div className="px-2 pb-2 text-xs space-y-1">
                          <p className="text-gray-600">{obj.reality}</p>
                          <p className="bg-amber-50 p-2 rounded text-gray-800">{obj.whatToSay}</p>
                          {obj.supportingLinks && obj.supportingLinks.length > 0 && (
                            <div className="pt-1.5 border-t border-amber-100">
                              <span className="text-[9px] font-semibold text-gray-400 uppercase">Sources: </span>
                              {obj.supportingLinks.map((link, li) => (
                                <a key={li} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[10px] text-[#F22F46] hover:underline mr-2">
                                  <ExternalLink className="w-2.5 h-2.5" />{link.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                  {firstResult.alternativeProducts && firstResult.alternativeProducts.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-amber-100">
                      <p className="text-[10px] text-emerald-600 font-semibold uppercase mb-1">Products with IE1 residency</p>
                      <div className="flex flex-wrap gap-1">
                        {firstResult.alternativeProducts.map((alt, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700">{alt.name}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* FAQ */}
              {firstResult.emea_faq && firstResult.emea_faq.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#F22F46]" />EMEA compliance FAQ
                  </h3>
                  <div className="space-y-2 max-h-[350px] overflow-y-auto">
                    {firstResult.emea_faq.slice(0, 4).map((cat) => (
                      <div key={cat.id}>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">{cat.title}</p>
                        {cat.questions.slice(0, 2).map((q, i) => (
                          <details key={i} className="border border-gray-100 rounded-lg mb-1">
                            <summary className="p-2 cursor-pointer hover:bg-gray-50 text-xs font-medium text-gray-700">{q.question}</summary>
                            <div className="px-2 pb-2 text-[11px] text-gray-600">
                              {q.answer}
                              {q.sources && q.sources.length > 0 && (
                                <div className="mt-1.5 pt-1.5 border-t border-gray-100">
                                  <span className="text-[9px] font-semibold text-gray-400 uppercase">Sources: </span>
                                  {q.sources.map((src: string, si: number) => (
                                    <a key={si} href={src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[10px] text-[#F22F46] hover:underline mr-2">
                                      <ExternalLink className="w-2.5 h-2.5" />{new URL(src).pathname.split('/').pop() || 'source'}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </details>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Articles */}
              {firstResult.blogArticles && firstResult.blogArticles.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#F22F46]" />Related articles
                  </h3>
                  <div className="space-y-2 max-h-[350px] overflow-y-auto">
                    {firstResult.blogArticles.map((article, i) => (
                      <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="block p-2 border border-gray-100 rounded-lg hover:border-[#F22F46]/30 transition-colors">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] text-gray-400">{new Date(article.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
                          {article.tags.slice(0, 2).map((tag, j) => (
                            <span key={j} className="px-1 py-0.5 rounded text-[9px] bg-[#121c2d]/5 text-[#121c2d]/60">{tag}</span>
                          ))}
                        </div>
                        <p className="text-xs font-medium text-gray-800 line-clamp-1">{article.title}</p>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{article.summary}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Row 4: Data Deletion & Redaction Solutions */}
            {Object.values(results).some(r => r.deletionSolution) && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-[#F22F46]" />Data removal, redaction, and deletion
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                  {Object.entries(results).filter(([, r]) => r.deletionSolution).map(([pid, r]) => (
                    <div key={pid} className="border border-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#121c2d]">{r.deletionSolution!.productName}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${r.deletionSolution!.automatedDeletion ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                          {r.deletionSolution!.automatedDeletion ? "Auto-purge" : "Manual"}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 mb-2">{r.deletionSolution!.deletionMethod}</p>
                      {r.deletionSolution!.deletionEndpoint && (
                        <code className="block text-[10px] bg-gray-50 rounded px-2 py-1 text-gray-700 mb-2 overflow-x-auto">{r.deletionSolution!.deletionEndpoint}</code>
                      )}
                      <div className="space-y-1.5">
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase">Retention</p>
                          <p className="text-[11px] text-gray-700">{r.deletionSolution!.retentionDefault}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase">Redaction options</p>
                          <ul className="text-[11px] text-gray-600 space-y-0.5">
                            {r.deletionSolution!.redactionCapabilities.slice(0, 2).map((cap, i) => (
                              <li key={i} className="flex items-start gap-1"><CheckCircle className="w-2.5 h-2.5 text-emerald-400 mt-0.5 shrink-0" />{cap}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-400 uppercase">DSAR handling</p>
                          <p className="text-[11px] text-gray-600">{r.deletionSolution!.dsarSupport}</p>
                        </div>
                        {r.deletionSolution!.caveats.length > 0 && (
                          <div>
                            <p className="text-[10px] font-semibold text-amber-500 uppercase">Caveats</p>
                            <ul className="text-[10px] text-gray-500 space-y-0.5">
                              {r.deletionSolution!.caveats.slice(0, 2).map((c, i) => (
                                <li key={i} className="flex items-start gap-1"><AlertTriangle className="w-2.5 h-2.5 text-amber-400 mt-0.5 shrink-0" />{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {r.deletionSolution!.documentationUrl && (
                          <a href={r.deletionSolution!.documentationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-[#F22F46] hover:underline mt-1">
                            <ExternalLink className="w-2.5 h-2.5" />API docs
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Row 5: Persona + Market Entry */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-4">
                {firstResult.gtmContext?.persona && (
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#F22F46]" />Selling to: {firstResult.gtmContext.persona.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">Care-abouts</p>
                        <ul className="text-[11px] text-gray-700 space-y-0.5">
                          {firstResult.gtmContext.persona.careabouts.slice(0, 4).map((c, i) => (
                            <li key={i} className="flex items-start gap-1"><ChevronRight className="w-2.5 h-2.5 text-[#F22F46] mt-0.5 shrink-0" />{c}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">Challenges</p>
                        <ul className="text-[11px] text-gray-700 space-y-0.5">
                          {firstResult.gtmContext.persona.challenges.slice(0, 4).map((c, i) => (
                            <li key={i} className="flex items-start gap-1"><AlertTriangle className="w-2.5 h-2.5 text-amber-400 mt-0.5 shrink-0" />{c}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">Metrics</p>
                        <ul className="text-[11px] text-gray-700 space-y-0.5">
                          {firstResult.gtmContext.persona.metrics.slice(0, 4).map((m, i) => (
                            <li key={i} className="flex items-start gap-1"><TrendingUp className="w-2.5 h-2.5 text-blue-400 mt-0.5 shrink-0" />{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Market entry */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#F22F46]" />Market entry
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-semibold text-red-500 uppercase mb-1">Blockers</p>
                      <ul className="text-[11px] text-gray-700 space-y-0.5">
                        {firstResult.analysis.marketEntryReadiness.blockers.map((b, i) => (
                          <li key={i} className="flex items-start gap-1"><AlertTriangle className="w-2.5 h-2.5 text-red-400 mt-0.5 shrink-0" />{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-emerald-500 uppercase mb-1">Accelerators</p>
                      <ul className="text-[11px] text-gray-700 space-y-0.5">
                        {firstResult.analysis.marketEntryReadiness.accelerators.map((a, i) => (
                          <li key={i} className="flex items-start gap-1"><CheckCircle className="w-2.5 h-2.5 text-emerald-400 mt-0.5 shrink-0" />{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 5: Localized content (if non-English) */}
            {firstResult.localization && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-[#121c2d] mb-3 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#F22F46]" />Localized content ({selectedCountry?.language?.toUpperCase()})
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                  <div className="bg-[#f4f4f6] rounded-lg p-3 text-sm text-gray-800 whitespace-pre-wrap">
                    {typeof firstResult.localization.localizedContent === "string" ? firstResult.localization.localizedContent : Object.entries(firstResult.localization.localizedContent).map(([key, value]) => (
                      <div key={key} className="mb-2">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase mb-0.5">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                        {Array.isArray(value) ? <ul className="list-disc list-inside text-xs">{value.map((v, i) => <li key={i}>{v}</li>)}</ul> : <p className="text-xs">{value}</p>}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">Cultural notes</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {firstResult.localization.culturalNotes.map((note, i) => (
                        <li key={i} className="flex items-start gap-1.5"><Globe className="w-3 h-3 text-purple-400 mt-0.5 shrink-0" />{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!hasResults && !loading && !error && (
          <div className="text-center py-16">
            <Shield className="w-14 h-14 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-medium text-[#121c2d] mb-1">Choose a use case or products, then select a country</h3>
            <p className="text-sm text-gray-400 max-w-lg mx-auto">Start with a use case (auto-selects products) or pick individual products. This tool checks EMEA regulatory compliance for each and generates localized sales content.</p>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 bg-[#121c2d] mt-8">
        <div className="max-w-[1400px] mx-auto px-6 py-3 text-center text-[11px] text-blue-200/60">
          EMEA Readiness Engine — Internal sales reference tool — Content is AI-generated from approved source documents — Not legal advice — Always verify with legal before sharing externally
        </div>
      </footer>
    </div>
  );
}
