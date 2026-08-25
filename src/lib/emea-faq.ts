export interface FAQCategory {
  id: string;
  title: string;
  description: string;
  questions: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
  sources?: string[];
  relatedProducts?: string[];
}

export const EMEA_FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "data-residency",
    title: "Data residency and storage location",
    description: "Where customer data is stored, processed, and whether it leaves the EU",
    questions: [
      {
        question: "Where is my data stored? Can I guarantee it stays in the EU?",
        answer: "It depends on the product. Programmable Messaging (SMS), SendGrid, Voice, Segment, Serverless, and Elastic SIP Trunking are available in the IE1 (Dublin) region, meaning data is stored and processed in the EU. Other products like Flex, Video, Studio (GA), and the Conversations suite operate from US infrastructure. For products not in IE1, Twilio uses EU-US Data Privacy Framework, Binding Corporate Rules (BCRs), and Standard Contractual Clauses (SCCs) as legal transfer mechanisms.",
        sources: ["https://www.twilio.com/docs/global-infrastructure/understanding-twilio-regions"],
        relatedProducts: ["messaging", "sendgrid", "voice", "segment-connections", "flex"],
      },
      {
        question: "What about sub-processors? Do any of them process data outside the EU?",
        answer: "Twilio publishes a complete sub-processor list. For IE1-homed products, primary processing stays in EU. However, some sub-processors (e.g., AI/ML vendors, billing systems) may process data in the US. The sub-processor list is updated regularly, and customers can subscribe to change notifications. Always check the current list for your specific products.",
        sources: ["https://www.twilio.com/en-us/legal/sub-processors"],
        relatedProducts: ["messaging", "voice", "sendgrid"],
      },
      {
        question: "Is billing data stored in the EU?",
        answer: "No. Billing data is stored in Northern Virginia (US). It is anonymized after 120 days. There is a distinction between processor data (can be in EU) and controller data (billing, account metadata — remains US-based). This is standard for most cloud platforms and does not typically create GDPR compliance issues since billing data has a separate legal basis.",
        sources: ["https://www.twilio.com/en-us/legal/data-protection-addendum"],
      },
    ],
  },
  {
    id: "gdpr-compliance",
    title: "GDPR compliance and data processing",
    description: "Data Protection Addendum, processor/controller roles, and GDPR readiness",
    questions: [
      {
        question: "Is Twilio a data processor or data controller?",
        answer: "Twilio acts as a data processor for customer communications data. Twilio processes personal data on behalf of and under the instructions of its customers. Customers remain the data controller. For some limited purposes (e.g., fraud prevention, abuse detection), Twilio may act as a controller — these are documented in the DPA.",
        sources: ["https://www.twilio.com/en-us/legal/data-protection-addendum"],
      },
      {
        question: "Can we get a Data Protection Addendum (DPA)?",
        answer: "Yes. The Twilio DPA is available for execution and covers GDPR processor obligations, Standard Contractual Clauses, and sub-processor management. It is a standard document that does not require negotiation for most use cases. Enterprise customers can request customized DPA terms through their account team.",
        sources: ["https://www.twilio.com/en-us/legal/data-protection-addendum"],
      },
      {
        question: "How do we handle Data Subject Access Requests (DSARs)?",
        answer: "Twilio provides APIs for data retrieval and deletion across products. For Messaging, call logs, recordings, and Segment profiles, customers can use the REST API to retrieve or delete personal data. Twilio also offers a DSAR support process where customers can submit requests through their account team for data not accessible via API.",
        sources: ["https://www.twilio.com/en-us/gdpr"],
        relatedProducts: ["messaging", "voice", "segment-connections"],
      },
    ],
  },
  {
    id: "security-certifications",
    title: "Security certifications and audits",
    description: "ISO, SOC 2, BSI C5, PCI DSS, and penetration testing",
    questions: [
      {
        question: "What security certifications does Twilio hold?",
        answer: "Twilio maintains ISO 27001, ISO 27017, ISO 27018, SOC 2 Type II, BSI C5, CSA STAR, and PCI DSS Level 1 certifications. Segment holds additional HIPAA eligibility. Certificates and attestation letters are available through the Trust Center. BSI C5 is specifically relevant for German public sector and regulated industries.",
        sources: ["https://security.twilio.com/?itemName=security_overview&source=click&itemUid=4a7c8b2e-1f3d-4e5a-b6c7-8d9e0f1a2b3c", "https://security.twilio.com/?itemName=certifications&source=click&itemUid=7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b"],
      },
      {
        question: "Can we get copies of your SOC 2 report and penetration test results?",
        answer: "SOC 2 Type II reports are available under NDA through the Trust Center or your account team. Penetration test summary results are available upon request. Full penetration test reports are not shared externally, but the summary includes scope, methodology, and findings overview.",
        sources: ["https://security.twilio.com/?itemName=certifications&source=click&itemUid=7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b"],
      },
      {
        question: "Do you have BSI C5 attestation? (German customers)",
        answer: "Yes. Twilio holds BSI C5 (Cloud Computing Compliance Criteria Catalogue) attestation. This is particularly relevant for German public sector customers and regulated industries in the DACH region. The attestation covers the Twilio platform infrastructure.",
        sources: ["https://security.twilio.com/?itemName=certifications&source=click&itemUid=7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b"],
      },
    ],
  },
  {
    id: "encryption",
    title: "Encryption and data protection",
    description: "Encryption at rest, in transit, key management, and access controls",
    questions: [
      {
        question: "Is data encrypted at rest and in transit?",
        answer: "Yes. All data is encrypted in transit using TLS 1.2+ and at rest using AES-256. This applies across all products and regions. Key management uses hardware security modules (HSMs). Customers can also bring their own encryption keys (BYOK) for Segment workspaces.",
        sources: ["https://security.twilio.com/?itemName=security_overview&source=click&itemUid=4a7c8b2e-1f3d-4e5a-b6c7-8d9e0f1a2b3c"],
      },
      {
        question: "Who has access to our data within Twilio?",
        answer: "Access to customer data is strictly controlled through role-based access control (RBAC), least-privilege principles, and just-in-time access provisioning. All access is logged and audited. Support engineers access customer data only with explicit customer permission during support interactions. Twilio employees undergo background checks and security training.",
        sources: ["https://security.twilio.com/?itemName=security_overview&source=click&itemUid=4a7c8b2e-1f3d-4e5a-b6c7-8d9e0f1a2b3c"],
      },
    ],
  },
  {
    id: "ai-and-llm",
    title: "AI, LLM, and automated decision-making",
    description: "EU AI Act readiness, LLM data usage, and transparency requirements",
    questions: [
      {
        question: "Does Twilio use customer data to train AI models?",
        answer: "Twilio does not use identifiable customer data to train customer-facing AI/ML models. Customer data processed through AI features (ConversationRelay, Conversation Intelligence, Agent Copilot) is used only to deliver the service. However, per the product datasheets (July 2026), Twilio may use anonymized, de-identified, or aggregated data (such as messaging patterns and call metadata) as an independent controller to train models for platform security purposes — specifically spam detection, fraud prevention, and deliverability optimization. This is a controller activity for platform integrity, not a customer-facing AI feature.",
        sources: ["https://www.twilio.com/en-us/legal/data-protection-addendum", "https://security.twilio.com/?itemName=product_features&source=click"],
        relatedProducts: ["conversation-relay", "conversation-intelligence"],
      },
      {
        question: "How does Twilio address EU AI Act requirements?",
        answer: "AI features in the Twilio platform (ConversationRelay, Conversation Intelligence, Agent Copilot, Segment predictive traits) are designed to support EU AI Act compliance. Customers are responsible for classifying their specific use cases by risk level. Twilio provides transparency documentation, human oversight capabilities, and disclosure mechanisms (e.g., caller notification for AI agents). High-risk deployments (healthcare, finance, legal) require additional customer-side measures.",
        sources: ["https://security.twilio.com/?itemName=security_overview&source=click&itemUid=4a7c8b2e-1f3d-4e5a-b6c7-8d9e0f1a2b3c"],
        relatedProducts: ["conversation-relay", "conversation-intelligence", "segment-engage"],
      },
      {
        question: "Where does AI/LLM processing happen? Does audio leave the EU?",
        answer: "It depends on the speech provider and LLM selected. For Voice AI (ConversationRelay), Amazon and Google speech services have EU processing endpoints. Deepgram EU routing is unconfirmed. ElevenLabs currently has no confirmed EU processing. The customer's chosen LLM endpoint also matters — if using an EU-hosted LLM, the full path can stay in EU (for Amazon/Google speech), but this requires careful configuration.",
        relatedProducts: ["conversation-relay", "voice"],
      },
    ],
  },
  {
    id: "data-transfers",
    title: "International data transfers",
    description: "Legal mechanisms for EU-US data transfers post-Schrems II",
    questions: [
      {
        question: "What legal mechanism do you use for EU-US data transfers?",
        answer: "Twilio relies on multiple complementary mechanisms: (1) EU-US Data Privacy Framework (DPF) certification, (2) Binding Corporate Rules (BCRs) approved by the Dutch DPA and recognized across the EU, (3) EU Standard Contractual Clauses (SCCs) incorporated into the DPA. These provide redundancy — if one mechanism is challenged, others remain valid.",
        sources: ["https://www.twilio.com/en-us/legal/bcr", "https://www.twilio.com/en-us/legal/data-protection-addendum"],
      },
      {
        question: "Are Twilio BCRs recognized by my local DPA?",
        answer: "Yes. The Twilio Binding Corporate Rules were approved by the Dutch DPA (Autoriteit Persoonsgegevens) as the lead authority, and are recognized across all EU/EEA member states under the GDPR consistency mechanism. This means they are valid regardless of which EU country your organization is based in.",
        sources: ["https://www.twilio.com/en-us/legal/bcr"],
      },
    ],
  },
  {
    id: "incident-response",
    title: "Breach notification and incident response",
    description: "Breach notification timelines, DPA obligations, and incident handling",
    questions: [
      {
        question: "How quickly will Twilio notify us of a data breach?",
        answer: "Per the DPA, Twilio will notify affected customers without undue delay (and within 72 hours where feasible) of confirmed personal data breaches. Notification includes the nature of the breach, categories of data affected, approximate number of records, and measures taken or proposed. The Twilio security incident response team operates 24/7.",
        sources: ["https://www.twilio.com/en-us/legal/data-protection-addendum"],
      },
      {
        question: "Do you have a documented incident response plan?",
        answer: "Yes. Twilio maintains a formal incident response plan aligned with ISO 27001 and SOC 2 requirements. It covers detection, classification, containment, eradication, recovery, and post-incident review. The plan is tested regularly through tabletop exercises and real-world incident responses. Summary details are available through the Trust Center.",
        sources: ["https://security.twilio.com/?itemName=certifications&source=click&itemUid=7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b"],
      },
    ],
  },
  {
    id: "financial-services",
    title: "Financial services and DORA",
    description: "DORA compliance, operational resilience, and financial sector requirements",
    questions: [
      {
        question: "Is Twilio DORA-compliant for financial services customers?",
        answer: "Twilio supports DORA (Digital Operational Resilience Act) compliance through documented SLAs, geo-redundant infrastructure, incident response processes, and exit strategy documentation. Twilio can be included in the ICT third-party risk register. Customers should document their dependency on Twilio services and verify SLA alignment with their DORA requirements.",
        sources: ["https://security.twilio.com/?itemName=security_overview&source=click&itemUid=4a7c8b2e-1f3d-4e5a-b6c7-8d9e0f1a2b3c"],
        relatedProducts: ["voice", "messaging", "flex", "verify"],
      },
      {
        question: "Can you provide exit strategy documentation for DORA Article 28?",
        answer: "Yes. Twilio provides exit strategy guidance covering data portability, transition timelines, and service continuity during migration. This supports DORA Article 28 requirements for ICT third-party contracts. Contact your account team for the formal exit strategy document.",
        relatedProducts: ["voice", "messaging", "flex"],
      },
      {
        question: "Do you support PSD2 Strong Customer Authentication?",
        answer: "Yes. Twilio Verify supports PSD2 SCA requirements with multi-factor authentication, dynamic linking for payment transactions, and channel failover. SMS OTP, Push, TOTP, and Silent Network Auth provide multiple factor options. The Verify Fraud Guard feature helps optimize conversion while maintaining security.",
        sources: ["https://www.twilio.com/docs/verify"],
        relatedProducts: ["verify"],
      },
    ],
  },
  {
    id: "telecom-regulatory",
    title: "Telecom regulations and number compliance",
    description: "Local number regulations, CLI authentication, and carrier requirements",
    questions: [
      {
        question: "Are you compliant with local telecom regulations (BNetzA, ARCEP, Ofcom)?",
        answer: "Yes. Twilio maintains compliance with local telecom regulators across EU markets. This includes BNetzA numbering plan compliance in Germany, ARCEP requirements in France (including MAN caller authentication), and Ofcom regulations in the UK. Number provisioning includes regulatory bundles that enforce local documentation requirements.",
        sources: ["https://www.twilio.com/en-us/trust-center"],
        relatedProducts: ["voice", "phone-numbers", "messaging"],
      },
      {
        question: "How do you handle caller ID authentication and anti-spoofing?",
        answer: "Twilio enforces valid CLI (Calling Line Identification) for outbound calls. In Germany, BNetzA anti-spoofing rules are enforced. In France, ARCEP MAN authentication is supported. In the UK, Ofcom CLI guidance is followed. Twilio does not allow CLI manipulation or suppression for commercial calls.",
        relatedProducts: ["voice", "phone-numbers"],
      },
    ],
  },
  {
    id: "consent-management",
    title: "Consent and marketing compliance",
    description: "Opt-in/opt-out, ePrivacy, double opt-in, and consent record management",
    questions: [
      {
        question: "How do we manage opt-in/opt-out for EU marketing messages?",
        answer: "Twilio provides consent management infrastructure across channels. For SMS, opt-out keywords (STOP) are automatically handled. For email (SendGrid), one-click unsubscribe (RFC 8058) is supported. Twilio does not manage consent collection — this is the customer's responsibility. Customers should implement double opt-in for German and Austrian markets (TTDSG requirement) and maintain auditable consent records.",
        sources: ["https://www.twilio.com/docs/messaging/compliance"],
        relatedProducts: ["messaging", "sendgrid", "marketing-campaigns"],
      },
      {
        question: "Do you support double opt-in workflows for Germany?",
        answer: "Yes. The Twilio Messaging API and SendGrid both support building double opt-in (DOI) workflows. While Twilio provides the infrastructure (message delivery, webhook handling), the DOI logic (send confirmation, record consent) must be implemented by the customer. Templates and implementation guides are available in the documentation.",
        sources: ["https://www.twilio.com/docs/messaging/compliance"],
        relatedProducts: ["messaging", "sendgrid"],
      },
    ],
  },
];

export function getFAQForProduct(productId: string): FAQCategory[] {
  return EMEA_FAQ_CATEGORIES.filter(cat =>
    cat.questions.some(q => !q.relatedProducts || q.relatedProducts.includes(productId))
  );
}

export function getFAQByCategory(categoryId: string): FAQCategory | undefined {
  return EMEA_FAQ_CATEGORIES.find(cat => cat.id === categoryId);
}
