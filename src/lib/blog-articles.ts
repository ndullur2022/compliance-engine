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
