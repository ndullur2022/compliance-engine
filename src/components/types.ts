export interface AnalysisResult {
  product: { id: string; name: string; category: string; certifications: string[]; euDataResidency: boolean; euDataResidencyDetails: string; complianceLinks: { label: string; url: string; description: string }[] };
  applicableRegulations: { id: string; name: string; fullName: string; category: string; enforcementBody: string; maxPenalty: string; sourceUrl: string }[];
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
  competitors: { competitor: string; gapClaim: string; whatToSay: string; sources: { label: string; url: string }[] }[];
  gtmContext?: {
    persona: { id: string; title: string; tier: string; careabouts: string[]; challenges: string[]; metrics: string[] } | null;
    useCases: { name: string; description: string; valuePool: string; businessGoal: string; kpis: string[] }[];
    kpiDirections: Record<string, string>;
    northStars: Record<string, { metric: string; dir: string }>;
  };
}
