export interface ComplianceLink {
  label: string;
  url: string;
  description: string;
}

export interface ComplianceEntry {
  status: "compliant" | "partial" | "not-applicable" | "requires-config";
  details: string;
  documentation: string;
  customerActions?: string[];
}

export interface TwilioProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  dataProcessed: string[];
  complianceCertifications: string[];
  euDataResidency: boolean;
  euDataResidencyDetails: string;
  complianceLinks: ComplianceLink[];
  relevantRegulations: string[];
  complianceStatus: Record<string, ComplianceEntry>;
}

export const COMPLIANCE_RESOURCES = {
  dpa: "https://www.twilio.com/en-us/legal/data-protection-addendum",
  security: "https://security.twilio.com/?itemName=security_overview&source=click&itemUid=4a7c8b2e-1f3d-4e5a-b6c7-8d9e0f1a2b3c",
  trustCenter: "https://security.twilio.com/?itemName=trust_center&source=click&itemUid=b2c3d4e5-f6a7-4890-b1c2-d3e4f5a6b7c8",
  gdpr: "https://www.twilio.com/en-us/gdpr",
  privacyPortal: "https://www.twilio.com/en-us/products/privacy-portal",
  bcr: "https://www.twilio.com/en-us/legal/bcr",
  subProcessors: "https://security.twilio.com/?itemName=legal&source=click&itemUid=e3fae2ca-94a9-416b-b577-5c90e382df57",
  messagingCompliance: "https://www.twilio.com/docs/messaging/compliance/regulatory",
  verifyDocs: "https://www.twilio.com/docs/verify/compliance",
  segmentPrivacy: "https://segment.com/docs/privacy/portal/",
  securityDocs: "https://security.twilio.com/?itemName=certifications&source=click&itemUid=7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
  segmentSecurity: "https://security.segment.com",
  certifications: "https://security.twilio.com/?itemName=certifications&source=click&itemUid=7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
  dataResidency: "https://security.twilio.com/?itemName=product_features&source=click&itemUid=a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890",
};

const COMMON_LINKS: ComplianceLink[] = [
  { label: "Data Protection Addendum", url: COMPLIANCE_RESOURCES.dpa, description: "Standard DPA covering GDPR processor obligations" },
  { label: "Security Overview", url: COMPLIANCE_RESOURCES.security, description: "Certifications, encryption, and security architecture" },
  { label: "Trust Center", url: COMPLIANCE_RESOURCES.trustCenter, description: "Centralized compliance and trust documentation" },
  { label: "Sub-processors List", url: COMPLIANCE_RESOURCES.subProcessors, description: "Current list of sub-processors by product" },
  { label: "Binding Corporate Rules", url: COMPLIANCE_RESOURCES.bcr, description: "Approved BCRs for international data transfers" },
];

const COMMON_CERTS = ["ISO 27001", "ISO 27017", "ISO 27018", "SOC 2 Type II", "Binding Corporate Rules"];


export const TWILIO_PRODUCTS: TwilioProduct[] = [
  // ─── CONVERSATIONS ────────────────────────────────────────
  {
    id: "conversation-memory",
    name: "Conversation Memory",
    category: "Conversations",
    description: "Build a persistent memory of customer interactions across channels and sessions.",
    dataProcessed: ["Customer interaction history", "Conversation metadata", "Channel identifiers", "Contextual data from prior sessions"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. Product operates from US infrastructure. Data may be processed outside the EU.",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "GDPR data handling and retention controls" }],
    relevantRegulations: ["gdpr", "eprivacy", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Twilio acts as data processor. Configurable retention and deletion. DPA available.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Define retention policies for conversation history", "Implement data subject deletion workflows", "Document lawful basis for storing interaction memory"] },
      eprivacy: { status: "requires-config", details: "Customer must obtain consent before storing persistent interaction data for marketing purposes.", documentation: COMPLIANCE_RESOURCES.gdpr, customerActions: ["Obtain consent for persistent profiling", "Provide opt-out for interaction tracking"] },
    }
  },
  {
    id: "conversation-orchestrator",
    name: "Conversation Orchestrator",
    category: "Conversations",
    description: "Keep conversations connected across channels with intelligent routing and context handoff.",
    dataProcessed: ["Cross-channel conversation state", "Routing decisions", "Customer identifiers", "Channel metadata"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. Orchestration operates from US infrastructure.",
    complianceLinks: [...COMMON_LINKS],
    relevantRegulations: ["gdpr", "uk-gdpr", "nis2"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Processes routing and state data as processor. Minimal personal data retained beyond session.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Include orchestration in data processing records", "Configure session data retention"] },
    }
  },
  {
    id: "conversation-intelligence",
    name: "Conversation Intelligence",
    category: "Conversations",
    description: "Extract context, sentiment, and insights from real-time customer conversations using AI.",
    dataProcessed: ["Conversation transcripts", "Sentiment analysis outputs", "AI-generated summaries", "Customer intent classifications"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. Explicitly unsupported in IE1 per regional availability documentation.",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "AI data processing and GDPR alignment" }],
    relevantRegulations: ["gdpr", "eu-ai-act", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "AI processing performed as data processor. Transcripts and outputs subject to configurable retention.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Conduct DPIA for AI-based conversation analysis", "Inform customers of AI processing in privacy notice", "Set retention limits on transcripts and AI outputs"] },
      "eu-ai-act": { status: "requires-config", details: "Sentiment analysis and intent classification may constitute AI systems under the EU AI Act. Risk classification depends on deployment context.", documentation: COMPLIANCE_RESOURCES.security, customerActions: ["Classify AI use case by risk level (likely limited risk)", "Implement transparency notices for AI-analyzed conversations", "Document AI system capabilities and limitations", "Maintain human oversight for consequential decisions"] },
    }
  },
  {
    id: "conversation-relay",
    name: "Conversation Relay",
    category: "Conversations",
    description: "Build advanced voice AI agents for natural, real-time conversations with sub-500ms latency.",
    dataProcessed: ["Voice audio streams", "Speech-to-text transcripts", "AI model inputs/outputs", "Call metadata"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. VirtualAgent and related voice AI features are unsupported in IE1.",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Voice AI data handling" }],
    relevantRegulations: ["gdpr", "eu-ai-act", "uk-gdpr", "eprivacy"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Voice data processed ephemerally. Recordings (if enabled) subject to customer-configured retention. DPA covers AI processing.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Inform callers of AI agent interaction", "Obtain recording consent where required", "Configure audio retention policies"] },
      "eu-ai-act": { status: "requires-config", details: "Voice AI agents likely constitute AI systems under the EU AI Act. Must disclose AI interaction to users. Risk depends on use case.", documentation: COMPLIANCE_RESOURCES.security, customerActions: ["Disclose AI nature of the agent to callers (mandatory under Art. 50)", "Classify risk level based on domain (high-risk if health/finance/legal)", "Document AI system for transparency register", "Ensure human escalation path available"] },
    }
  },
  // ─── COMMUNICATIONS ───────────────────────────────────────
  {
    id: "messaging",
    name: "Messaging APIs (SMS/MMS/WhatsApp/RCS)",
    category: "Communications",
    description: "Send and receive messages across SMS, MMS, WhatsApp, and RCS channels globally.",
    dataProcessed: ["Phone numbers (sender/recipient)", "Message content", "Delivery metadata", "Opt-in/opt-out preferences", "Channel identifiers"],
    complianceCertifications: [...COMMON_CERTS, "CSA STAR", "BSI C5"],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region. Programmable Messaging (SMS) confirmed for EU data residency per regional availability documentation.",
    complianceLinks: [...COMMON_LINKS, { label: "Messaging Compliance Guide", url: COMPLIANCE_RESOURCES.messagingCompliance, description: "Opt-in, consent, and regulatory guidance per channel" }, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Data handling for messaging" }],
    relevantRegulations: ["gdpr", "eprivacy", "pecr", "ttdsg", "arcep-telecom", "nis2", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Twilio acts as data processor. DPA available. Sub-processor list published. DSR support via API.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Execute DPA", "Configure message retention", "Implement opt-in/opt-out per local law", "Conduct DPIA for marketing messaging"] },
      eprivacy: { status: "requires-config", details: "Customer responsible for obtaining consent for electronic direct marketing. Soft opt-in rules vary by member state.", documentation: COMPLIANCE_RESOURCES.messagingCompliance, customerActions: ["Obtain prior consent for marketing messages", "Implement sender identification", "Provide opt-out in every marketing message"] },
      pecr: { status: "requires-config", details: "UK PECR requires consent for unsolicited marketing. Soft opt-in workflows supported.", documentation: COMPLIANCE_RESOURCES.messagingCompliance, customerActions: ["Verify soft opt-in eligibility", "Include sender identity", "Offer unsubscribe in every message"] },
      ttdsg: { status: "requires-config", details: "German TTDSG requires explicit consent for commercial electronic messages.", documentation: COMPLIANCE_RESOURCES.messagingCompliance, customerActions: ["Obtain double opt-in for German recipients", "Maintain auditable consent records"] },
    }
  },
  {
    id: "sendgrid",
    name: "SendGrid Email API",
    category: "Communications",
    description: "Cloud-based email delivery platform for transactional and marketing email at scale.",
    dataProcessed: ["Email addresses", "Email content/metadata", "Engagement data (opens, clicks)", "DKIM/SPF/DMARC records", "Suppression lists"],
    complianceCertifications: [...COMMON_CERTS, "CSA STAR"],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region. SendGrid confirmed for EU data residency. EU email processing and storage supported.",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Email data handling under GDPR" }],
    relevantRegulations: ["gdpr", "eprivacy", "pecr", "ttdsg", "nis2", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "DPA available. Suppression list management, data export, and deletion APIs support DSR. EU processing available.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Execute DPA", "Configure EU data residency", "Implement preference center", "Set engagement data retention"] },
      eprivacy: { status: "requires-config", details: "Consent required for commercial email. SendGrid provides infrastructure; consent management is customer responsibility.", documentation: COMPLIANCE_RESOURCES.gdpr, customerActions: ["Implement double opt-in for EU marketing emails", "Provide one-click unsubscribe (RFC 8058)", "Segment lists by consent status"] },
    }
  },
  {
    id: "voice",
    name: "Voice API",
    category: "Communications",
    description: "Programmable voice calling, SIP trunking, and PSTN connectivity for calls, IVR, and contact centers.",
    dataProcessed: ["Phone numbers (caller/callee)", "Call recordings", "Call metadata (duration, routing)", "DTMF inputs", "Voicemail content"],
    complianceCertifications: [...COMMON_CERTS, "CSA STAR", "BSI C5", "PCI DSS Level 1"],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region. Programmable Voice confirmed for EU data residency. Note: some features unsupported in IE1 (Connect Room, VirtualAgent, SIPREC, WhatsApp calling, BYOC with static IPs).",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Voice data and recording compliance" }],
    relevantRegulations: ["gdpr", "eprivacy", "bnetza-cli", "arcep-telecom", "nis2", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Twilio acts as data processor. Call recordings require customer-side consent management. EU storage available.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Inform callers of recording and obtain consent", "Configure EU storage for recordings", "Implement retention policies", "Handle DSARs for recordings"] },
      "bnetza-cli": { status: "compliant", details: "Valid CLI transmitted for outbound calls from German numbers. Anti-spoofing in place. BNetzA numbering plan compliant.", documentation: COMPLIANCE_RESOURCES.trustCenter, customerActions: ["Use verified German numbers", "Do not suppress or manipulate CLI"] },
      "arcep-telecom": { status: "compliant", details: "French number allocation ARCEP-compliant. MAN caller authentication supported.", documentation: COMPLIANCE_RESOURCES.trustCenter, customerActions: ["Register French numbers per ARCEP requirements", "Comply with MAN authentication"] },
    }
  },
  {
    id: "phone-numbers",
    name: "Phone Numbers",
    category: "Communications",
    description: "Access toll-free, local, mobile, and short code numbers in 100+ countries with regulatory bundle support.",
    dataProcessed: ["Number ownership records", "Regulatory bundle documentation", "Address verification data"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Phone Numbers product is not listed as available in the IE1 (EU) Region. Number provisioning managed from US infrastructure.",
    complianceLinks: [...COMMON_LINKS, { label: "Trust Hub", url: COMPLIANCE_RESOURCES.trustCenter, description: "Number registration and regulatory bundles" }],
    relevantRegulations: ["gdpr", "bnetza-cli", "arcep-telecom", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Number provisioning data handled as processor. Regulatory bundle data processed per local telecom requirements.", documentation: COMPLIANCE_RESOURCES.dpa },
      "bnetza-cli": { status: "compliant", details: "German number allocation fully compliant with BNetzA numbering plan. Regulatory bundles enforce proper documentation.", documentation: COMPLIANCE_RESOURCES.trustCenter },
    }
  },
  {
    id: "elastic-sip-trunking",
    name: "Elastic SIP Trunking",
    category: "Communications",
    description: "Connect existing communications infrastructure with flexible, secure SIP trunking.",
    dataProcessed: ["SIP signaling data", "Call routing metadata", "Authentication credentials", "Network endpoints"],
    complianceCertifications: [...COMMON_CERTS, "PCI DSS Level 1"],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region. Elastic SIP Trunking confirmed for EU data residency. Some features unsupported (Phone Number API subresource, BYOC with static IPs).",
    complianceLinks: [...COMMON_LINKS],
    relevantRegulations: ["gdpr", "nis2", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "SIP trunking infrastructure processes minimal personal data. Call metadata subject to standard DPA.", documentation: COMPLIANCE_RESOURCES.dpa },
      nis2: { status: "compliant", details: "Infrastructure meets NIS2 cybersecurity requirements. Encrypted signaling and media. Geo-redundant architecture.", documentation: COMPLIANCE_RESOURCES.security },
    }
  },
  {
    id: "flex",
    name: "Twilio Flex",
    category: "Communications",
    description: "Programmable cloud contact center that orchestrates inbound and outbound interactions across every channel.",
    dataProcessed: ["Customer interaction data (chat, voice, email)", "Agent performance data", "Customer identity and history", "AI/ML model inputs/outputs", "Quality management recordings"],
    complianceCertifications: [...COMMON_CERTS, "PCI DSS Level 1", "CSA STAR", "BSI C5", "HIPAA eligible"],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. Contact center operations run from US infrastructure. EU deployment not yet supported.",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Contact center data handling" }, { label: "Privacy Portal", url: COMPLIANCE_RESOURCES.privacyPortal, description: "Data governance for customer interactions" }],
    relevantRegulations: ["gdpr", "eu-ai-act", "nis2", "fca-consumer-duty", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Flex supports GDPR through data residency controls, configurable retention, agent access controls, and consent framework integration.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Configure EU data residency", "Implement agent-level access controls", "Set recording retention policies", "Enable customer data deletion workflows"] },
      "eu-ai-act": { status: "requires-config", details: "Flex AI features (Agent Copilot, automated routing, sentiment analysis) may constitute AI systems. Risk classification depends on deployment context.", documentation: COMPLIANCE_RESOURCES.security, customerActions: ["Classify each AI feature by risk level", "Disclose AI interaction to customers", "Maintain human oversight and escalation paths", "Document AI system purpose and limitations"] },
      "fca-consumer-duty": { status: "requires-config", details: "For UK financial services, Flex supports Consumer Duty through quality management, outcome monitoring, and accessible communication channels.", documentation: COMPLIANCE_RESOURCES.security, customerActions: ["Configure quality management for outcome monitoring", "Ensure accessible channel options", "Implement fair treatment workflows"] },
    }
  },
  {
    id: "video",
    name: "Twilio Video",
    category: "Communications",
    description: "Enable high-quality, global video calls with programmable video rooms and recording capabilities.",
    dataProcessed: ["Video/audio streams", "Participant identifiers", "Room metadata", "Recordings (if enabled)", "Network quality metrics"],
    complianceCertifications: [...COMMON_CERTS, "HIPAA eligible"],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. Video Rooms (Connect Room) explicitly unsupported in IE1.",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Video data and recording compliance" }],
    relevantRegulations: ["gdpr", "eprivacy", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Video streams processed ephemerally. Recordings subject to customer retention policies. EU media regions available.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Obtain participant consent for recording", "Configure EU media region", "Set recording retention and deletion policies"] },
    }
  },
  {
    id: "marketing-campaigns",
    name: "Marketing Campaigns",
    category: "Communications",
    description: "Design email and messaging campaigns with dynamic templates, audience segmentation, and engagement analytics.",
    dataProcessed: ["Contact lists and segments", "Campaign content", "Engagement metrics (opens, clicks)", "Consent/preference records", "A/B test data"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. Campaign management operates from US infrastructure.",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Marketing consent and data handling" }, { label: "Messaging Compliance", url: COMPLIANCE_RESOURCES.messagingCompliance, description: "Channel-specific marketing rules" }],
    relevantRegulations: ["gdpr", "eprivacy", "pecr", "ttdsg", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Campaign platform supports consent-based marketing. Contact management with DSR support. EU storage available.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Implement consent collection for marketing", "Enable preference center for contacts", "Configure retention for engagement data"] },
      eprivacy: { status: "requires-config", details: "All electronic marketing requires prior consent under ePrivacy. Platform provides tools; consent collection is customer responsibility.", documentation: COMPLIANCE_RESOURCES.messagingCompliance, customerActions: ["Obtain explicit opt-in before campaigns", "Segment audiences by consent jurisdiction", "Include unsubscribe in every communication"] },
    }
  },
  {
    id: "trust-hub",
    name: "Trust Hub",
    category: "Communications",
    description: "Centralized onboarding for verified business profiles, A2P 10DLC, SHAKEN/STIR, and regulatory compliance.",
    dataProcessed: ["Business identity documents", "Verification records", "Regulatory bundle data", "Compliance attestations"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. Business verification and trust services operate from US infrastructure.",
    complianceLinks: [...COMMON_LINKS, { label: "Trust Center", url: COMPLIANCE_RESOURCES.trustCenter, description: "Business verification and compliance hub" }],
    relevantRegulations: ["gdpr", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Business identity data processed for legitimate regulatory compliance purposes. Minimal personal data involved.", documentation: COMPLIANCE_RESOURCES.dpa },
    }
  },
  {
    id: "event-streams",
    name: "Event Streams",
    category: "Communications",
    description: "Unified real-time feed of all events across the Twilio platform for monitoring, analytics, and compliance.",
    dataProcessed: ["Platform event data", "Interaction metadata", "Audit trail records", "Webhook payloads"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. Event streaming operates from US infrastructure.",
    complianceLinks: [...COMMON_LINKS],
    relevantRegulations: ["gdpr", "nis2", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Event Streams enables compliance monitoring and audit trails. Data minimization through event filtering. EU sink routing available.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Configure event filtering to minimize personal data in streams", "Route events to EU-based destinations", "Set retention policies on event sinks"] },
    }
  },
  {
    id: "interconnect",
    name: "Interconnect",
    category: "Communications",
    description: "End-to-end network-level security for communications with private connectivity to the Twilio platform.",
    dataProcessed: ["Network routing data", "Connection metadata", "Peering configuration"],
    complianceCertifications: [...COMMON_CERTS, "PCI DSS Level 1"],
    euDataResidency: false,
    euDataResidencyDetails: "Not listed as available in the IE1 (EU) Region. Private connectivity endpoints currently US-based.",
    complianceLinks: [...COMMON_LINKS],
    relevantRegulations: ["gdpr", "nis2", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Enhances GDPR compliance by keeping data in private network paths. Reduces exposure of personal data in transit.", documentation: COMPLIANCE_RESOURCES.security },
      nis2: { status: "compliant", details: "Private connectivity meets NIS2 network security requirements. Eliminates public internet exposure for sensitive communications.", documentation: COMPLIANCE_RESOURCES.security },
    }
  },
  {
    id: "taskrouter",
    name: "TaskRouter",
    category: "Communications",
    description: "Skills-based routing engine that matches tasks to the right workers based on attributes and availability.",
    dataProcessed: ["Task attributes", "Worker skills and availability", "Routing decisions", "Queue metrics"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region in Private Beta. TaskRouter confirmed for EU data residency (limited availability).",
    complianceLinks: [...COMMON_LINKS],
    relevantRegulations: ["gdpr", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "TaskRouter processes minimal personal data. Task attributes configurable to minimize PII in routing decisions.", documentation: COMPLIANCE_RESOURCES.dpa },
    }
  },
  {
    id: "sync",
    name: "Sync",
    category: "Communications",
    description: "Real-time, two-way data synchronization across devices and applications.",
    dataProcessed: ["Synchronized data objects", "Device identifiers", "Session state", "Conflict resolution metadata"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not available in the IE1 (EU) Region. Data synchronization operates from US infrastructure.",
    complianceLinks: [...COMMON_LINKS],
    relevantRegulations: ["gdpr", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Sync stores customer-defined data objects. Content and retention managed by customer. DPA covers infrastructure processing.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Minimize personal data in synced objects", "Configure TTL for sync documents"] },
    }
  },
  {
    id: "twilio-email",
    name: "Twilio Email",
    category: "Communications",
    description: "Build and scale email workflows across channels with deliverability optimization and analytics.",
    dataProcessed: ["Email addresses", "Email content", "Delivery and engagement data", "Authentication records (DKIM/SPF/DMARC)"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not listed separately in the IE1 (EU) Region. SendGrid Email API is available in IE1; Twilio Email as a distinct product is not confirmed.",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Email data handling under GDPR" }],
    relevantRegulations: ["gdpr", "eprivacy", "pecr", "ttdsg", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Email platform operates as data processor. DPA available. Suppression and deletion APIs support DSR compliance.", documentation: COMPLIANCE_RESOURCES.dpa },
      eprivacy: { status: "requires-config", details: "Commercial email requires prior consent under ePrivacy. Platform provides unsubscribe infrastructure; consent is customer responsibility.", documentation: COMPLIANCE_RESOURCES.gdpr, customerActions: ["Obtain consent for marketing emails", "Implement one-click unsubscribe", "Maintain suppression lists"] },
    }
  },
  // ─── AUTHENTICATION ───────────────────────────────────────
  {
    id: "verify",
    name: "Twilio Verify",
    category: "Authentication",
    description: "Multi-channel verification and authentication optimized for conversion and fraud prevention across SMS, voice, email, TOTP, push, and silent network auth.",
    dataProcessed: ["Phone numbers", "Email addresses", "Verification codes (ephemeral)", "Authentication attempt metadata", "Device identifiers (push/SNA)"],
    complianceCertifications: [...COMMON_CERTS, "CSA STAR", "BSI C5"],
    euDataResidency: false,
    euDataResidencyDetails: "Full Verify product not explicitly listed for IE1 (EU) Region. Verify Silent Network Auth is available in IE1 as a Verify feature. SMS/voice verification may work via regional Messaging/Voice but product-level residency is not confirmed.",
    complianceLinks: [...COMMON_LINKS, { label: "Verify Documentation", url: COMPLIANCE_RESOURCES.verifyDocs, description: "Implementation guides and compliance features" }, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Authentication data handling" }],
    relevantRegulations: ["gdpr", "psd2", "nis2", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Verify processes minimal personal data (phone/email) for authentication. Data minimization by design — codes are ephemeral.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Include Verify in privacy notice", "Define retention for verification logs", "Establish lawful basis (legitimate interest or contract)"] },
      psd2: { status: "compliant", details: "Twilio Verify supports PSD2 Strong Customer Authentication (SCA) with multi-factor options. Dynamic linking supported for payment authentication.", documentation: COMPLIANCE_RESOURCES.verifyDocs, customerActions: ["Implement two independent authentication factors", "Use dynamic linking for payment transactions", "Monitor SCA exemption eligibility", "Configure fallback authentication methods"] },
    }
  },
  {
    id: "lookup",
    name: "Twilio Lookup",
    category: "Authentication",
    description: "Phone number intelligence API providing carrier info, line type, caller name, SIM swap detection, and identity verification signals.",
    dataProcessed: ["Phone numbers queried", "Carrier and line type data", "Identity match signals", "SIM swap detection signals", "Reassigned number indicators"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Lookup v2 available in IE1 (Dublin) Region. Supports Line Type Intelligence, SIM Swap detection, and Identity Match. Queries processed in EU.",
    complianceLinks: [...COMMON_LINKS, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Phone intelligence data handling" }],
    relevantRegulations: ["gdpr", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Lookup processes phone numbers as personal data. Results ephemeral (not stored beyond API response). Lawful basis required for queries.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Establish lawful basis for lookups (legitimate interest for fraud, consent for marketing)", "Document Lookup usage in processing records", "Limit usage to stated lawful purpose"] },
    }
  },
  // ─── CUSTOMER DATA ────────────────────────────────────────
  {
    id: "segment-connections",
    name: "Segment Connections",
    category: "Customer Data",
    description: "Connect first-party customer data from any source to any destination in a single platform.",
    dataProcessed: ["Customer behavioral events", "Identity data (email, phone, IDs)", "Integration credentials", "Data pipeline metadata"],
    complianceCertifications: [...COMMON_CERTS, "HIPAA eligible", "CSA STAR"],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region. Segment confirmed for EU data residency (eu1.segment.io). All data stored and processed within EU.",
    complianceLinks: [...COMMON_LINKS, { label: "Segment Privacy", url: COMPLIANCE_RESOURCES.segmentPrivacy, description: "Privacy controls and consent management" }, { label: "Segment Security", url: COMPLIANCE_RESOURCES.segmentSecurity, description: "Security documentation portal" }],
    relevantRegulations: ["gdpr", "eprivacy", "data-act", "uk-gdpr", "nis2"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Segment offers comprehensive GDPR tooling: consent integration, DSR APIs, configurable retention, EU residency, purpose-based routing.", documentation: COMPLIANCE_RESOURCES.segmentPrivacy, customerActions: ["Configure EU regional infrastructure (eu1.segment.io)", "Implement consent-based event collection", "Set up automated DSR handling", "Define data retention policies"] },
      eprivacy: { status: "requires-config", details: "Segment enforces consent signals before collection when configured. Customer must integrate a CMP and configure consent-based filtering.", documentation: COMPLIANCE_RESOURCES.segmentPrivacy, customerActions: ["Integrate CMP with Segment consent framework", "Configure consent categories per destination", "Block collection until valid consent obtained"] },
    }
  },
  {
    id: "segment-protocols",
    name: "Segment Protocols",
    category: "Customer Data",
    description: "Data quality controls with a shared data dictionary, validation rules, and schema enforcement.",
    dataProcessed: ["Event schemas and definitions", "Validation rules", "Data quality metrics", "Schema violations"],
    complianceCertifications: [...COMMON_CERTS, "HIPAA eligible"],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region as part of Segment. Schema and validation data stored in EU for EU workspaces.",
    complianceLinks: [...COMMON_LINKS, { label: "Segment Privacy", url: COMPLIANCE_RESOURCES.segmentPrivacy, description: "Data governance controls" }],
    relevantRegulations: ["gdpr", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Protocols enforces data quality without processing additional personal data. Supports GDPR by ensuring only intended data flows to destinations.", documentation: COMPLIANCE_RESOURCES.segmentPrivacy, customerActions: ["Define schemas to prevent unintended PII collection", "Use blocking rules to reject non-compliant events"] },
    }
  },
  {
    id: "segment-unify",
    name: "Segment Unify",
    category: "Customer Data",
    description: "Consolidate customer data across channels into unified profiles with identity resolution.",
    dataProcessed: ["Cross-channel customer identifiers", "Behavioral data merged into profiles", "Identity graph relationships", "Trait data (demographics, preferences)"],
    complianceCertifications: [...COMMON_CERTS, "HIPAA eligible"],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region as part of Segment. Unified profiles stored and processed within EU.",
    complianceLinks: [...COMMON_LINKS, { label: "Segment Privacy", url: COMPLIANCE_RESOURCES.segmentPrivacy, description: "Profile data governance" }, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Unified profile compliance" }],
    relevantRegulations: ["gdpr", "eprivacy", "data-act", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Unify creates profiles as data processor. Purpose limitation and data minimization supported through configurable identity resolution rules.", documentation: COMPLIANCE_RESOURCES.segmentPrivacy, customerActions: ["Conduct DPIA for cross-channel profiling", "Configure identity resolution rules to minimize data", "Implement profile deletion for DSR compliance", "Document lawful basis for profiling activities"] },
      "data-act": { status: "partial", details: "Data portability supported through export APIs. Full Data Act compliance depends on customer implementation of access rights.", documentation: COMPLIANCE_RESOURCES.segmentPrivacy, customerActions: ["Enable data export APIs for portability", "Document data sharing arrangements"] },
    }
  },
  {
    id: "segment-engage",
    name: "Segment Engage",
    category: "Customer Data",
    description: "Build personalized omnichannel campaigns with audience orchestration powered by unified customer profiles.",
    dataProcessed: ["Audience segments", "Campaign targeting criteria", "Engagement outcomes", "Predictive traits and scores", "Journey orchestration data"],
    complianceCertifications: [...COMMON_CERTS, "HIPAA eligible"],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region as part of Segment. Audience computation and campaign data processed in EU.",
    complianceLinks: [...COMMON_LINKS, { label: "Segment Privacy", url: COMPLIANCE_RESOURCES.segmentPrivacy, description: "Campaign consent and privacy controls" }, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "Marketing automation compliance" }],
    relevantRegulations: ["gdpr", "eprivacy", "eu-ai-act", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Engage supports consent-based audience building and campaign execution. Purpose-based activation controls prevent unauthorized use.", documentation: COMPLIANCE_RESOURCES.segmentPrivacy, customerActions: ["Enforce consent checks before audience activation", "Configure purpose limitations per destination", "Implement right-to-object for profiling"] },
      "eu-ai-act": { status: "requires-config", details: "Predictive traits and AI-powered audiences may constitute AI systems. Customer must assess risk classification for automated decision-making.", documentation: COMPLIANCE_RESOURCES.segmentPrivacy, customerActions: ["Classify predictive features by AI Act risk level", "Document AI transparency for audience scoring", "Assess bias and fairness in predictive models", "Ensure human oversight for consequential decisions"] },
      eprivacy: { status: "requires-config", details: "Campaign execution requires valid consent. Engage enforces consent signals when configured with CMP integration.", documentation: COMPLIANCE_RESOURCES.segmentPrivacy, customerActions: ["Integrate consent management with campaign triggers", "Respect channel-specific consent requirements"] },
    }
  },
  {
    id: "privacy-portal",
    name: "Privacy Portal",
    category: "Customer Data",
    description: "Automate data privacy compliance with risk-based classification, access controls, and regulatory workflow management.",
    dataProcessed: ["Data inventory and classifications", "Privacy request records (DSARs)", "Consent records", "Compliance audit trails"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: false,
    euDataResidencyDetails: "Not listed as available in the IE1 (EU) Region. Privacy governance tools operate from US infrastructure.",
    complianceLinks: [...COMMON_LINKS, { label: "Privacy Portal Product", url: COMPLIANCE_RESOURCES.privacyPortal, description: "Product page with capabilities overview" }, { label: "GDPR Compliance", url: COMPLIANCE_RESOURCES.gdpr, description: "GDPR-specific privacy automation" }],
    relevantRegulations: ["gdpr", "uk-gdpr", "data-act"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Privacy Portal is purpose-built for GDPR compliance. Automates DSARs, manages consent records, provides data inventory, and maintains audit trails.", documentation: COMPLIANCE_RESOURCES.privacyPortal, customerActions: ["Configure data classification rules", "Set up automated DSAR workflows", "Integrate with downstream systems for deletion propagation"] },
      "data-act": { status: "partial", details: "Supports data portability and access rights management. Customer must configure specific Data Act workflows as regulations mature.", documentation: COMPLIANCE_RESOURCES.privacyPortal },
    }
  },
  // ─── BUILDER TOOLS ────────────────────────────────────────
  {
    id: "serverless",
    name: "Serverless",
    category: "Builder Tools",
    description: "Event-driven runtime environment for building Twilio applications without managing infrastructure.",
    dataProcessed: ["Function execution logs", "Environment variables", "Request/response payloads"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region. Functions and Assets confirmed for EU data residency.",
    complianceLinks: [...COMMON_LINKS],
    relevantRegulations: ["gdpr", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Serverless infrastructure processes customer code. Any personal data in function payloads covered by standard DPA. Execution logs configurable.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Avoid storing PII in environment variables", "Configure log retention", "Ensure functions handle personal data per GDPR requirements"] },
    }
  },
  {
    id: "studio",
    name: "Studio",
    category: "Builder Tools",
    description: "Visual workflow builder for designing communication flows across channels without writing code.",
    dataProcessed: ["Workflow definitions", "Execution logs", "Widget configuration data"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region in Private Beta. Studio confirmed for EU data residency (limited availability).",
    complianceLinks: [...COMMON_LINKS],
    relevantRegulations: ["gdpr", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Studio stores workflow definitions and execution logs. Personal data in flows is transient and subject to standard DPA.", documentation: COMPLIANCE_RESOURCES.dpa, customerActions: ["Review flows for unnecessary PII storage in widgets", "Configure execution log retention"] },
    }
  },
  {
    id: "functions",
    name: "Functions",
    category: "Builder Tools",
    description: "Production-grade serverless environment for deploying Twilio applications with built-in scaling.",
    dataProcessed: ["Function code and assets", "Execution logs", "Request/response data"],
    complianceCertifications: [...COMMON_CERTS],
    euDataResidency: true,
    euDataResidencyDetails: "Available in IE1 (Dublin) Region. Functions and Assets confirmed for EU data residency.",
    complianceLinks: [...COMMON_LINKS],
    relevantRegulations: ["gdpr", "uk-gdpr"],
    complianceStatus: {
      gdpr: { status: "compliant", details: "Functions infrastructure is GDPR-compliant. Personal data handling within function code is customer responsibility.", documentation: COMPLIANCE_RESOURCES.dpa },
    }
  },
];

export function getProductById(id: string): TwilioProduct | undefined {
  return TWILIO_PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(category: string): TwilioProduct[] {
  return TWILIO_PRODUCTS.filter(p => p.category === category);
}
