export interface Regulation {
  id: string;
  name: string;
  fullName: string;
  region: string;
  country?: string;
  category: "data-protection" | "financial" | "telecom" | "ai" | "identity" | "consumer" | "email";
  description: string;
  enforcementBody: string;
  maxPenalty: string;
  sourceUrl: string;
  keyRequirements: string[];
  relevantProducts: string[];
}

export const EU_REGULATIONS: Regulation[] = [
  {
    id: "gdpr",
    name: "GDPR",
    fullName: "General Data Protection Regulation",
    region: "EU",
    category: "data-protection",
    description: "EU-wide data protection framework governing the collection, processing, and storage of personal data.",
    enforcementBody: "National DPAs (e.g., BfDI in Germany, CNIL in France, ICO in UK)",
    maxPenalty: "€20M or 4% of global annual turnover",
    sourceUrl: "https://www.twilio.com/en-us/gdpr",
    keyRequirements: [
      "Lawful basis for processing personal data",
      "Data subject rights (access, erasure, portability)",
      "Data Protection Impact Assessments (DPIAs)",
      "Data Processing Agreements (DPAs) with processors",
      "Cross-border transfer safeguards (SCCs, adequacy decisions)",
      "Data breach notification within 72 hours",
      "Privacy by design and by default",
      "Records of processing activities"
    ],
    relevantProducts: ["segment-connections", "segment-unify", "segment-engage", "segment-protocols", "sendgrid", "flex", "verify", "messaging", "voice", "lookup", "conversation-memory", "conversation-orchestrator", "conversation-intelligence", "conversation-relay", "video", "marketing-campaigns", "phone-numbers", "elastic-sip-trunking", "event-streams", "trust-hub", "taskrouter", "sync", "twilio-email", "privacy-portal", "serverless", "studio", "functions", "interconnect"]
  },
  {
    id: "eprivacy",
    name: "ePrivacy Directive",
    fullName: "Directive 2002/58/EC (ePrivacy Directive)",
    region: "EU",
    category: "data-protection",
    description: "Regulates electronic communications privacy, including cookies, direct marketing, and confidentiality of communications.",
    enforcementBody: "National telecom regulators and DPAs",
    maxPenalty: "Varies by member state transposition",
    sourceUrl: "https://www.twilio.com/docs/messaging/compliance",
    keyRequirements: [
      "Prior consent for electronic direct marketing",
      "Opt-in for cookies and tracking technologies",
      "Confidentiality of communications content and metadata",
      "Caller line identification rules",
      "Unsolicited communications restrictions"
    ],
    relevantProducts: ["messaging", "sendgrid", "voice", "segment-connections", "segment-engage", "marketing-campaigns", "twilio-email", "conversation-memory"]
  },
  {
    id: "eu-ai-act",
    name: "EU AI Act",
    fullName: "Regulation (EU) 2024/1689 (Artificial Intelligence Act)",
    region: "EU",
    category: "ai",
    description: "Risk-based framework for AI systems deployed in the EU, classifying AI by risk level with corresponding obligations.",
    enforcementBody: "National competent authorities + EU AI Office",
    maxPenalty: "€35M or 7% of global annual turnover",
    sourceUrl: "https://www.twilio.com/en-us/trust-center",
    keyRequirements: [
      "Risk classification (unacceptable, high, limited, minimal)",
      "Transparency obligations for AI-generated content",
      "Human oversight requirements for high-risk AI",
      "Technical documentation and record-keeping",
      "Conformity assessments for high-risk systems",
      "Registration in EU database for high-risk AI",
      "Post-market monitoring obligations"
    ],
    relevantProducts: ["flex", "segment-engage", "segment-unify", "voice", "conversation-intelligence", "conversation-relay"]
  },
  {
    id: "psd2",
    name: "PSD2",
    fullName: "Payment Services Directive 2 (Directive 2015/2366)",
    region: "EU",
    category: "financial",
    description: "Regulates payment services and requires Strong Customer Authentication (SCA) for electronic payments.",
    enforcementBody: "National financial regulators (BaFin, FCA, ACPR)",
    maxPenalty: "Varies by member state",
    sourceUrl: "https://www.twilio.com/docs/verify/psd2",
    keyRequirements: [
      "Strong Customer Authentication (SCA) for payments",
      "Two-factor authentication (2FA) requirements",
      "Secure communication channels for auth codes",
      "Transaction monitoring for fraud detection",
      "Customer notification of payment transactions"
    ],
    relevantProducts: ["verify", "messaging", "voice", "lookup"]
  },
  {
    id: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act (Regulation 2022/2554)",
    region: "EU",
    category: "financial",
    description: "Requires financial entities to ensure ICT resilience, including third-party risk management for critical service providers.",
    enforcementBody: "EBA, ESMA, EIOPA + national financial regulators",
    maxPenalty: "Up to 1% of average daily worldwide turnover (for critical ICT providers)",
    sourceUrl: "https://security.twilio.com/?itemName=certifications&source=click&itemUid=7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
    keyRequirements: [
      "ICT risk management framework",
      "Incident reporting for major ICT incidents",
      "Digital operational resilience testing",
      "Third-party ICT risk management",
      "Information sharing on cyber threats",
      "Contractual requirements for ICT service providers"
    ],
    relevantProducts: ["flex", "messaging", "voice", "verify", "sendgrid", "elastic-sip-trunking", "conversation-orchestrator", "conversation-relay", "event-streams", "interconnect"]
  },
  {
    id: "nis2",
    name: "NIS2",
    fullName: "Network and Information Security Directive 2 (Directive 2022/2555)",
    region: "EU",
    category: "telecom",
    description: "Cybersecurity obligations for essential and important entities across critical sectors.",
    enforcementBody: "National cybersecurity authorities (BSI in Germany, ANSSI in France)",
    maxPenalty: "€10M or 2% of global annual turnover",
    sourceUrl: "https://security.twilio.com/?itemName=certifications&source=click&itemUid=7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
    keyRequirements: [
      "Cybersecurity risk management measures",
      "Incident reporting within 24 hours (early warning)",
      "Supply chain security",
      "Business continuity and crisis management",
      "Vulnerability disclosure policies",
      "Management body accountability for cybersecurity"
    ],
    relevantProducts: ["flex", "messaging", "voice", "verify", "sendgrid", "elastic-sip-trunking", "interconnect", "segment-connections", "event-streams", "conversation-orchestrator"]
  },
  {
    id: "eidas2",
    name: "eIDAS 2.0",
    fullName: "Electronic Identification and Trust Services Regulation (revised)",
    region: "EU",
    category: "identity",
    description: "Framework for electronic identification, authentication, and trust services, including the EU Digital Identity Wallet.",
    enforcementBody: "National supervisory bodies for trust services",
    maxPenalty: "Varies by member state",
    sourceUrl: "https://www.twilio.com/docs/verify",
    keyRequirements: [
      "EU Digital Identity Wallet interoperability",
      "Qualified electronic signatures and seals",
      "Electronic identification scheme notification",
      "Trust service provider obligations",
      "Cross-border recognition of electronic identification"
    ],
    relevantProducts: ["verify", "lookup"]
  },
  {
    id: "data-act",
    name: "Data Act",
    fullName: "Regulation (EU) 2023/2854 (Data Act)",
    region: "EU",
    category: "data-protection",
    description: "Rules on fair access to and use of data generated by connected products and related services.",
    enforcementBody: "National competent authorities",
    maxPenalty: "Varies by member state",
    sourceUrl: "https://segment.com/docs/privacy/portal/",
    keyRequirements: [
      "Data access rights for users of connected products",
      "Fair contractual terms for data sharing",
      "Data portability between service providers",
      "Safeguards against unlawful third-country data access",
      "Interoperability requirements for data spaces"
    ],
    relevantProducts: ["segment-connections", "segment-unify", "segment-engage", "flex", "privacy-portal"]
  },
  {
    id: "pecr",
    name: "PECR",
    fullName: "Privacy and Electronic Communications Regulations 2003 (UK)",
    region: "UK",
    country: "United Kingdom",
    category: "data-protection",
    description: "UK implementation of the ePrivacy Directive, governing electronic marketing, cookies, and communications privacy.",
    enforcementBody: "ICO (Information Commissioner's Office)",
    maxPenalty: "£500,000 (PECR-specific) or GDPR-level for data protection breaches",
    sourceUrl: "https://www.twilio.com/docs/messaging/compliance",
    keyRequirements: [
      "Consent for direct marketing by electronic means",
      "Soft opt-in exception for existing customers",
      "Caller line identification requirements",
      "Cookie consent requirements",
      "Security of public electronic communications services"
    ],
    relevantProducts: ["messaging", "sendgrid", "voice", "marketing-campaigns", "twilio-email"]
  },
  {
    id: "uk-gdpr",
    name: "UK GDPR",
    fullName: "UK General Data Protection Regulation",
    region: "UK",
    country: "United Kingdom",
    category: "data-protection",
    description: "UK's post-Brexit data protection framework, substantially similar to EU GDPR with UK-specific provisions.",
    enforcementBody: "ICO (Information Commissioner's Office)",
    maxPenalty: "£17.5M or 4% of global annual turnover",
    sourceUrl: "https://www.twilio.com/en-us/gdpr",
    keyRequirements: [
      "Lawful basis for processing (same as EU GDPR)",
      "UK-specific international transfer mechanisms",
      "UK representative requirement for non-UK controllers",
      "Data Protection Impact Assessments",
      "UK Adequacy Regulations for transfers"
    ],
    relevantProducts: ["segment-connections", "segment-unify", "segment-engage", "segment-protocols", "sendgrid", "flex", "verify", "messaging", "voice", "lookup", "conversation-memory", "conversation-orchestrator", "conversation-intelligence", "conversation-relay", "video", "marketing-campaigns", "phone-numbers", "elastic-sip-trunking", "event-streams", "trust-hub", "taskrouter", "sync", "twilio-email", "privacy-portal", "serverless", "studio", "functions", "interconnect"]
  },
  {
    id: "fca-consumer-duty",
    name: "FCA Consumer Duty",
    fullName: "FCA Consumer Duty (PS22/9)",
    region: "UK",
    country: "United Kingdom",
    category: "consumer",
    description: "UK financial services regulation requiring firms to deliver good outcomes for retail customers across products and services.",
    enforcementBody: "FCA (Financial Conduct Authority)",
    maxPenalty: "Unlimited fines + enforcement action",
    sourceUrl: "https://www.twilio.com/en-us/trust-center",
    keyRequirements: [
      "Consumer understanding — clear communications",
      "Products and services designed to meet customer needs",
      "Fair value — reasonable price for benefits",
      "Consumer support — accessible and responsive",
      "Monitoring customer outcomes"
    ],
    relevantProducts: ["flex", "messaging", "verify", "conversation-relay", "conversation-orchestrator"]
  },
  {
    id: "bnetza-cli",
    name: "BNetzA Caller-ID Rules",
    fullName: "Bundesnetzagentur Caller Line Identification Regulations",
    region: "EU",
    country: "Germany",
    category: "telecom",
    description: "German telecom regulator rules on caller line identification, anti-spoofing, and number allocation.",
    enforcementBody: "BNetzA (Bundesnetzagentur)",
    maxPenalty: "€300,000 per violation",
    sourceUrl: "https://www.twilio.com/docs/voice/regulatory",
    keyRequirements: [
      "Valid CLI transmission for all outbound calls",
      "Prohibition of CLI manipulation/spoofing",
      "Number allocation compliance",
      "Call origin transparency requirements"
    ],
    relevantProducts: ["voice", "phone-numbers", "elastic-sip-trunking", "conversation-relay"]
  },
  {
    id: "ttdsg",
    name: "TTDSG",
    fullName: "Telekommunikation-Telemedien-Datenschutz-Gesetz (Germany)",
    region: "EU",
    country: "Germany",
    category: "telecom",
    description: "German law governing privacy in telecommunications and telemedia, implementing ePrivacy requirements.",
    enforcementBody: "BfDI (Federal Commissioner for Data Protection) + BNetzA",
    maxPenalty: "€300,000 (TTDSG-specific) + GDPR penalties for data protection breaches",
    sourceUrl: "https://www.twilio.com/docs/messaging/compliance",
    keyRequirements: [
      "Consent for storing/accessing information on end-user devices",
      "Telecommunications secrecy (Fernmeldegeheimnis)",
      "Personal data processing in telecommunications",
      "Cookie consent (PIMS recognized)"
    ],
    relevantProducts: ["messaging", "segment-connections", "segment-engage", "sendgrid", "marketing-campaigns", "twilio-email"]
  },
  {
    id: "arcep-telecom",
    name: "ARCEP Telecom Rules",
    fullName: "Autorité de Régulation des Communications Électroniques (France)",
    region: "EU",
    country: "France",
    category: "telecom",
    description: "French telecom regulator overseeing numbering plans, interconnection, and electronic communications compliance.",
    enforcementBody: "ARCEP",
    maxPenalty: "Up to 5% of annual turnover",
    sourceUrl: "https://www.twilio.com/docs/voice/regulatory",
    keyRequirements: [
      "Number portability compliance",
      "Interconnection obligations",
      "CLI authentication for French numbers",
      "Quality of service standards",
      "MAN (Mécanisme d'Authentification des Numéros) compliance"
    ],
    relevantProducts: ["voice", "messaging", "phone-numbers", "elastic-sip-trunking", "conversation-relay"]
  }
];

export function getRegulationsForProduct(productId: string): Regulation[] {
  return EU_REGULATIONS.filter(r => r.relevantProducts.includes(productId));
}

export function getRegulationsForCountry(country: string): Regulation[] {
  return EU_REGULATIONS.filter(r => !r.country || r.country === country || r.region === "EU");
}

export function getRegulationsByCategory(category: Regulation["category"]): Regulation[] {
  return EU_REGULATIONS.filter(r => r.category === category);
}
