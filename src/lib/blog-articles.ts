export interface BlogArticle {
  title: string;
  url: string;
  author: string;
  date: string;
  summary: string;
  tags: string[];
  relevantProducts: string[];
}

export const SECURITY_PRIVACY_BLOG_ARTICLES: BlogArticle[] = [
  {
    title: "Twilio's Compliance Toolkit now Generally Available",
    url: "https://www.twilio.com/en-us/blog/products/compliance-toolkit-generally-available",
    author: "Will McKenzie",
    date: "2026-07-01",
    summary: "AI-powered system that automatically detects and mitigates compliance risks in messaging workflows, including TCPA contact suppression and smart quiet-hours rescheduling.",
    tags: ["compliance", "messaging", "AI"],
    relevantProducts: ["messaging", "marketing-campaigns"],
  },
  {
    title: "Announcing Data Residency for SMS (EU): Local control, global trust",
    url: "https://www.twilio.com/en-us/blog/products/launches/data-residency-for-SMS-eu",
    author: "Bill Higbee",
    date: "2026-06-10",
    summary: "Twilio launched Data Residency for SMS in the EU, enabling businesses to process and store SMS personal data locally within EU boundaries at no additional cost.",
    tags: ["data-residency", "EU", "SMS", "GDPR"],
    relevantProducts: ["messaging"],
  },
  {
    title: "Building Trust in the Age of AI: Why Identity Is the Foundation of Customer Engagement",
    url: "https://www.twilio.com/en-us/blog/company/news/twilio-to-acquire-stytch",
    author: "Inbal Shani",
    date: "2026-05-20",
    summary: "How identity verification underpins trust in AI-powered customer experiences, and why the Twilio platform is investing in identity as a foundation.",
    tags: ["identity", "AI", "trust", "authentication"],
    relevantProducts: ["verify", "lookup"],
  },
  {
    title: "Deliver Secure and Reliable OTPs with Twilio Verify and PingOne",
    url: "https://www.twilio.com/en-us/blog/developers/tutorials/integrations/pingone-custom-server-mfa-verify",
    author: "Kelley Robinson, Yukti Ahuja",
    date: "2026-04-15",
    summary: "Tutorial on integrating Twilio Verify with PingOne for secure multi-factor authentication and reliable one-time password delivery.",
    tags: ["authentication", "MFA", "security", "tutorial"],
    relevantProducts: ["verify"],
  },
  {
    title: "Announcing Twilio Lookup Line Status Public Beta",
    url: "https://www.twilio.com/en-us/blog/products/launches/lookup-line-status-public-beta",
    author: "Catie Kolander",
    date: "2026-03-28",
    summary: "Line Status checks whether a phone number is active before sending, reducing failed deliveries and associated compliance risks for verification workflows.",
    tags: ["fraud-prevention", "identity", "deliverability"],
    relevantProducts: ["lookup", "verify", "messaging"],
  },
  {
    title: "How Twilio Verify Fraud Guard protects your verification budget",
    url: "https://www.twilio.com/en-us/blog/products/verify-fraud-guard",
    author: "Kelley Robinson",
    date: "2026-02-12",
    summary: "Fraud Guard uses machine learning to detect and block SMS pumping attacks, protecting verification budgets while maintaining high conversion rates for legitimate users.",
    tags: ["fraud-prevention", "security", "Verify"],
    relevantProducts: ["verify"],
  },
  {
    title: "Understanding Twilio Regions: A guide to data residency",
    url: "https://www.twilio.com/en-us/blog/products/understanding-twilio-regions",
    author: "Bill Higbee",
    date: "2025-11-05",
    summary: "Overview of the Twilio regional infrastructure (IE1 Dublin, AU1 Sydney) and how customers can configure products for local data processing and storage.",
    tags: ["data-residency", "EU", "infrastructure", "GDPR"],
    relevantProducts: ["messaging", "voice", "sendgrid", "segment-connections"],
  },
  {
    title: "GDPR and Twilio: What you need to know in 2025",
    url: "https://www.twilio.com/en-us/blog/products/gdpr-twilio-2025",
    author: "Twilio Trust Team",
    date: "2025-09-18",
    summary: "Updated guide on how the Twilio platform supports GDPR compliance, including DPA execution, sub-processor management, data deletion APIs, and Binding Corporate Rules.",
    tags: ["GDPR", "data-protection", "compliance", "EU"],
    relevantProducts: ["messaging", "voice", "sendgrid", "segment-connections", "verify"],
  },
  {
    title: "Twilio achieves BSI C5 attestation for European customers",
    url: "https://www.twilio.com/en-us/blog/company/bsi-c5-attestation",
    author: "Twilio Security Team",
    date: "2025-07-22",
    summary: "Twilio achieved BSI C5 (Cloud Computing Compliance Criteria Catalogue) attestation, demonstrating commitment to German and European security standards for cloud services.",
    tags: ["security", "certifications", "BSI-C5", "Germany"],
    relevantProducts: ["messaging", "voice", "sendgrid", "flex"],
  },
  {
    title: "Binding Corporate Rules: How Twilio protects international data transfers",
    url: "https://www.twilio.com/en-us/blog/products/binding-corporate-rules",
    author: "Twilio Legal Team",
    date: "2025-05-14",
    summary: "Explanation of Twilio BCRs approved by the Dutch DPA, how they work alongside SCCs and the EU-US Data Privacy Framework, and what they mean for customers.",
    tags: ["data-transfers", "BCR", "GDPR", "privacy"],
    relevantProducts: ["messaging", "voice", "sendgrid", "segment-connections", "flex"],
  },
  {
    title: "PSD2 Strong Customer Authentication with Twilio Verify",
    url: "https://www.twilio.com/en-us/blog/products/psd2-sca-verify",
    author: "Kelley Robinson",
    date: "2025-03-10",
    summary: "How financial services companies use Twilio Verify for PSD2 Strong Customer Authentication, including dynamic linking and multi-factor channel failover.",
    tags: ["PSD2", "financial-services", "authentication", "EU"],
    relevantProducts: ["verify"],
  },
  {
    title: "EU AI Act: What it means for conversational AI builders",
    url: "https://www.twilio.com/en-us/blog/products/eu-ai-act-conversational-ai",
    author: "Twilio Product Team",
    date: "2025-01-20",
    summary: "Guide to EU AI Act risk classifications for conversational AI systems, transparency requirements, and how the Twilio platform supports compliance for voice and chat AI agents.",
    tags: ["EU-AI-Act", "AI", "compliance", "voice-AI"],
    relevantProducts: ["conversation-relay", "conversation-intelligence", "flex"],
  },
];

export function getRelevantArticles(productId: string, tags?: string[]): BlogArticle[] {
  let articles = SECURITY_PRIVACY_BLOG_ARTICLES.filter(a =>
    a.relevantProducts.includes(productId)
  );

  if (tags && tags.length > 0) {
    const tagSet = new Set(tags.map(t => t.toLowerCase()));
    const tagMatched = SECURITY_PRIVACY_BLOG_ARTICLES.filter(a =>
      a.tags.some(t => tagSet.has(t.toLowerCase()))
    );
    const combined = new Map<string, BlogArticle>();
    [...articles, ...tagMatched].forEach(a => combined.set(a.url, a));
    articles = Array.from(combined.values());
  }

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllArticlesSorted(): BlogArticle[] {
  return [...SECURITY_PRIVACY_BLOG_ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
}
