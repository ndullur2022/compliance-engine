export interface DataResidencyNuance {
  productId: string;
  productName: string;
  category: string;
  ie1Status: "ga" | "private-beta" | "not-available" | "partial";
  ie1StatusLabel: string;
  channels?: ChannelResidency[];
  speechProviders?: SpeechProviderResidency[];
  excludedFeatures: string[];
  notes: string[];
  roadmap?: string;
  billingNote?: string;
}

export interface ChannelResidency {
  channel: string;
  status: "ga" | "roadmap" | "not-available";
  details: string;
  eta?: string;
}

export interface SpeechProviderResidency {
  provider: string;
  status: "eu-available" | "us-only" | "unknown";
  details: string;
}

export const DATA_RESIDENCY_NUANCES: DataResidencyNuance[] = [
  {
    productId: "messaging",
    productName: "Messaging APIs",
    category: "Communications",
    ie1Status: "partial",
    ie1StatusLabel: "Partial — SMS GA, other channels vary",
    channels: [
      { channel: "SMS", status: "ga", details: "GA in IE1. End-user phone numbers and message bodies stay in EU up to carrier edge." },
      { channel: "MMS", status: "ga", details: "GA in IE1. Media stored in EU region." },
      { channel: "RCS", status: "roadmap", details: "NOT regionalized. All creation, processing, and log storage currently in US.", eta: "Text-only Q3 2026, rich/media Q4 2026" },
      { channel: "WhatsApp", status: "roadmap", details: "NOT in IE1 on the Twilio layer. Meta processes within EU (Meta Platforms Ireland Limited), but the Twilio processing layer is global.", eta: "H1 2027" },
    ],
    excludedFeatures: ["+1 (US) phone numbers not supported in IE1", "Conversations API not in IE1"],
    notes: [
      "SMS in IE1 does NOT support +1 phone numbers — only local EU numbers",
      "Message bodies and end-user phone numbers stay in EU up to the carrier edge",
      "WhatsApp messages are processed by Meta in Ireland (Meta Platforms Ireland Limited) but the Twilio API layer is US-based",
      "RCS is fully US-processed today — no EU residency for any RCS traffic",
    ],
  },
  {
    productId: "voice",
    productName: "Voice API",
    category: "Communications",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1 — core voice features",
    speechProviders: [
      { provider: "Amazon Polly / Transcribe", status: "eu-available", details: "EU endpoints available. Audio processed in EU region (eu-west-1)." },
      { provider: "Google Cloud Speech / TTS", status: "eu-available", details: "EU endpoints available. Audio processed in EU region (europe-west1)." },
      { provider: "Deepgram", status: "unknown", details: "EU infrastructure exists but unclear if Twilio routes to EU Deepgram endpoints. Under investigation." },
      { provider: "ElevenLabs", status: "us-only", details: "No confirmed EU processing. Audio may leave EU even with EU-homed phone numbers." },
    ],
    excludedFeatures: [
      "Connect Room (Video) — not in IE1",
      "VirtualAgent — not in IE1",
      "SIPREC — not in IE1",
      "WhatsApp Calling — not in IE1",
      "BYOC with static IPs — not in IE1",
    ],
    notes: [
      "Core voice calling (PSTN, SIP) fully GA in IE1 when phone numbers and SIP domains are homed in Dublin",
      "Media streams egress from Dublin",
      "German numbers route via Frankfurt edge with London/Dublin fallback",
      "Speech providers vary — Amazon and Google have EU processing; Deepgram and ElevenLabs may not",
      "ConversationRelay uses speech providers — data residency depends on which provider is selected",
    ],
  },
  {
    productId: "conversation-relay",
    productName: "Conversation Relay",
    category: "Conversations",
    ie1Status: "not-available",
    ie1StatusLabel: "Not in IE1 — VirtualAgent unsupported",
    speechProviders: [
      { provider: "Amazon Polly / Transcribe", status: "eu-available", details: "EU endpoints exist for STT/TTS but unclear if ConversationRelay routes to them." },
      { provider: "Google Cloud Speech / TTS", status: "eu-available", details: "EU endpoints exist but ConversationRelay routing unconfirmed." },
      { provider: "Deepgram", status: "unknown", details: "Customer (DocPlanner) reports uncertainty about whether EU Deepgram endpoints are used." },
      { provider: "ElevenLabs", status: "us-only", details: "No confirmed EU processing for ElevenLabs via ConversationRelay." },
    ],
    excludedFeatures: ["Entire product not available in IE1"],
    notes: [
      "ConversationRelay is not available in IE1 region",
      "Even with EU-based speech provider endpoints, the orchestration layer runs in US",
      "Customers asking whether any audio data leaves EU even with regional speech vendor endpoints",
      "For EU-sensitive deployments, validate the full data path: Twilio → speech provider → LLM → back",
    ],
  },
  {
    productId: "sendgrid",
    productName: "SendGrid Email API",
    category: "Communications",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: ["Email Validation API — NOT in EU residency scope"],
    notes: [
      "Email sending and storage fully available in IE1",
      "Email Validation API is explicitly NOT in EU data residency scope",
      "DKIM/SPF/DMARC configuration handled in IE1",
    ],
  },
  {
    productId: "elastic-sip-trunking",
    productName: "Elastic SIP Trunking",
    category: "Communications",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: ["Phone Number API subresource — not in IE1", "BYOC with static IPs — not in IE1"],
    notes: ["SIP trunking fully operational in Dublin", "Supports EU-only call paths when configured correctly"],
  },
  {
    productId: "segment-connections",
    productName: "Segment Connections",
    category: "Customer Data",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1 (eu1.segment.io)",
    excludedFeatures: [],
    notes: ["All data stored and processed within EU when using eu1.segment.io workspace", "Separate infrastructure from US workspaces"],
  },
  {
    productId: "segment-protocols",
    productName: "Segment Protocols",
    category: "Customer Data",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: [],
    notes: ["Schema and validation data stored in EU for EU workspaces"],
  },
  {
    productId: "segment-unify",
    productName: "Segment Unify",
    category: "Customer Data",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: [],
    notes: ["Unified profiles stored and processed within EU"],
  },
  {
    productId: "segment-engage",
    productName: "Segment Engage",
    category: "Customer Data",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: [],
    notes: ["Audience computation and campaign data processed in EU"],
  },
  {
    productId: "serverless",
    productName: "Serverless (Functions & Assets)",
    category: "Builder Tools",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: [],
    notes: ["Functions and Assets confirmed for EU data residency"],
  },
  {
    productId: "functions",
    productName: "Functions",
    category: "Builder Tools",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: [],
    notes: ["Functions and Assets confirmed for EU data residency"],
  },
  {
    productId: "studio",
    productName: "Studio",
    category: "Builder Tools",
    ie1Status: "private-beta",
    ie1StatusLabel: "Private Beta in IE1",
    excludedFeatures: [],
    notes: [
      "Studio in IE1 is Private Beta — not GA",
      "Customers E.ON, Kraken (Octopus Energy), and Securitas have requested GA",
      "Contact account team for access",
    ],
  },
  {
    productId: "taskrouter",
    productName: "TaskRouter",
    category: "Communications",
    ie1Status: "private-beta",
    ie1StatusLabel: "Private Beta in IE1",
    excludedFeatures: [],
    notes: ["TaskRouter in IE1 is Private Beta — not GA", "Contact account team for access"],
  },
  {
    productId: "flex",
    productName: "Twilio Flex",
    category: "Communications",
    ie1Status: "not-available",
    ie1StatusLabel: "Not available in IE1",
    excludedFeatures: ["Entire product not available in IE1"],
    notes: [
      "Flex contact center operations run from US infrastructure",
      "EU deployment not yet supported",
      "Underlying channels (Voice, Messaging) can be IE1-homed but Flex orchestration is US",
    ],
  },
  {
    productId: "conversation-memory",
    productName: "Conversation Memory",
    category: "Conversations",
    ie1Status: "not-available",
    ie1StatusLabel: "Not available in IE1",
    excludedFeatures: ["Entire product not available in IE1"],
    notes: ["Product operates from US infrastructure"],
  },
  {
    productId: "conversation-orchestrator",
    productName: "Conversation Orchestrator",
    category: "Conversations",
    ie1Status: "not-available",
    ie1StatusLabel: "Not available in IE1",
    excludedFeatures: ["Entire product not available in IE1"],
    notes: ["Orchestration runs from US infrastructure"],
  },
  {
    productId: "conversation-intelligence",
    productName: "Conversation Intelligence",
    category: "Conversations",
    ie1Status: "not-available",
    ie1StatusLabel: "Not available in IE1",
    excludedFeatures: ["Entire product explicitly unsupported in IE1"],
    notes: ["Explicitly unsupported in IE1 per regional availability documentation"],
  },
  {
    productId: "verify",
    productName: "Twilio Verify",
    category: "Authentication",
    ie1Status: "partial",
    ie1StatusLabel: "Partial — Silent Network Auth via Lookup v2 in IE1",
    excludedFeatures: ["Full Verify product not confirmed for IE1", "SMS/Voice verification delivered via regional channels but product-level residency unconfirmed"],
    notes: [
      "Verify Silent Network Auth available under Lookup v2 in IE1",
      "SMS/Voice OTP delivery can use IE1-homed messaging/voice but Verify service layer residency unclear",
      "TOTP and Push verification processing location not confirmed for IE1",
    ],
  },
  {
    productId: "lookup",
    productName: "Twilio Lookup",
    category: "Authentication",
    ie1Status: "ga",
    ie1StatusLabel: "Lookup v2 GA in IE1",
    excludedFeatures: [],
    notes: ["Lookup v2 available in IE1 (Dublin) Region", "Includes Verify Silent Network Auth", "Queries processed in EU"],
  },
  {
    productId: "video",
    productName: "Twilio Video",
    category: "Communications",
    ie1Status: "not-available",
    ie1StatusLabel: "Not available in IE1",
    excludedFeatures: ["Connect Room explicitly unsupported in IE1"],
    notes: ["Video Rooms (Connect Room) explicitly unsupported in IE1", "EU media regions available for latency but not residency"],
  },
];

export const BILLING_DATA_NOTE = "Billing data is stored in Northern Virginia (US). It is anonymized after 120 days. There is a distinction between processor data (can be in EU) and controller data (remains US-based).";

export const PROXY_NOTE = "Twilio Proxy is NOT available in IE1. If masking/anonymization is needed for EU-resident data, alternative approaches are required.";

export function getResidencyForProduct(productId: string): DataResidencyNuance | undefined {
  return DATA_RESIDENCY_NUANCES.find(n => n.productId === productId);
}
