/**
 * Twilio IE1 (Ireland/Dublin) Data Residency Product Availability
 *
 * Last updated: 2026-08-12
 * Source: Twilio MCP (authoritative Twilio documentation)
 * Primary reference: https://www.twilio.com/docs/global-infrastructure/regional-product-and-feature-availability
 *
 * This file tracks which Twilio products and features are available in the IE1 (Dublin) region
 * for EU data residency compliance. Information sourced directly from official Twilio documentation.
 *
 * Key findings:
 * - SMS: GA (no +1 numbers, no MMS/WhatsApp/RCS)
 * - Voice: GA (multiple TwiML verbs unsupported)
 * - SendGrid: GA (requires EU subusers and dedicated IPs)
 * - Segment: GA (full platform with EU workspace)
 * - Conversations: Partial (Chat only, no SMS/WhatsApp channels)
 * - Lookup v2: GA (includes Verify Silent Network Auth)
 * - Studio: Private Beta
 * - TaskRouter: Private Beta
 * - Functions/Assets: GA (not for IE1 messaging inbound)
 * - Flex: NOT available
 * - ConversationRelay: NOT available
 * - Video: NOT available
 */

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
      { channel: "MMS", status: "not-available", details: "NOT supported in IE1 region per official Twilio documentation." },
      { channel: "RCS", status: "not-available", details: "NOT supported in IE1 region. All RCS processing occurs in US." },
      { channel: "WhatsApp", status: "not-available", details: "NOT supported in IE1 region. Meta processes within EU (Meta Platforms Ireland Limited), but the Twilio API layer is US-based." },
    ],
    excludedFeatures: [
      "+1 (US) phone numbers not supported in IE1",
      "MMS not available in IE1",
      "WhatsApp not available in IE1",
      "RCS not available in IE1",
      "Facebook Messenger not available in IE1",
      "Short codes not supported in IE1",
      "Integration with Verify, Studio, Flex, Conversations not supported for IE1 messaging"
    ],
    notes: [
      "SMS in IE1 does NOT support +1 phone numbers — only local EU numbers and alphanumeric sender IDs",
      "Message bodies and end-user phone numbers stay in EU up to the carrier edge",
      "MMS, WhatsApp, RCS, and Facebook Messenger are explicitly NOT supported in IE1 per official Twilio documentation",
      "Messaging features only available in new Twilio Console, not legacy Console",
      "Studio and Functions integrations not supported for messages received in IE1"
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
      "<Connect><Room> TwiML verb — not in IE1",
      "<Connect><VirtualAgent> TwiML verb — not in IE1",
      "<Start><Siprec> TwiML verb — not in IE1",
      "<Dial><WhatsApp> TwiML noun — not in IE1",
      "BYOC Trunks with static IP addresses — not in IE1",
      "Verified Caller IDs — not in IE1",
      "Conversation Intelligence (classic) — not in IE1",
      "WhatsApp Business Calling — not in IE1"
    ],
    notes: [
      "Core voice calling (PSTN, SIP) fully GA in IE1 when phone numbers and SIP domains are homed in Dublin",
      "Media streams egress from Dublin when properly configured",
      "German numbers route via Frankfurt edge with London/Dublin fallback",
      "Speech providers vary — Amazon and Google have EU processing; Deepgram and ElevenLabs residency unclear",
      "Multiple TwiML verbs explicitly unsupported: <Connect><Room>, <Connect><VirtualAgent>, <Start><Siprec>, <Dial><WhatsApp>",
      "Voice SDK minimum versions required: iOS 6.4.0+, Android 6.1.0+, JavaScript 2.1.0+"
    ],
  },
  {
    productId: "conversations",
    productName: "Conversations API",
    category: "Communications",
    ie1Status: "partial",
    ie1StatusLabel: "Partial — Chat only",
    channels: [
      { channel: "Chat", status: "ga", details: "GA in IE1. Chat data processed and stored in Ireland data centers." },
      { channel: "SMS", status: "not-available", details: "NOT available in IE1 Conversations." },
      { channel: "WhatsApp", status: "not-available", details: "NOT available in IE1 Conversations." },
      { channel: "Facebook Messenger", status: "not-available", details: "NOT available in IE1 Conversations." },
    ],
    excludedFeatures: [
      "SMS channel not available in IE1",
      "WhatsApp channel not available in IE1",
      "Facebook Messenger not available in IE1",
      "Messaging services integration not available",
      "Notification logs not available",
      "Delivery receipts not available",
      "Static IP address configuration not available"
    ],
    notes: [
      "Only Chat channel available in IE1 — SMS, WhatsApp, and Facebook Messenger not supported",
      "If multi-channel Conversations needed, must use US1 region",
      "Conversations features unavailable in IE1: messaging services, notification logs, delivery receipts, static IP config"
    ],
  },
  {
    productId: "conversation-relay",
    productName: "Conversation Relay",
    category: "Conversations",
    ie1Status: "not-available",
    ie1StatusLabel: "Not available in IE1",
    speechProviders: [
      { provider: "Amazon Polly / Transcribe", status: "eu-available", details: "EU endpoints exist for STT/TTS but ConversationRelay is not available in IE1." },
      { provider: "Google Cloud Speech / TTS", status: "eu-available", details: "EU endpoints exist but ConversationRelay not available in IE1." },
      { provider: "Deepgram", status: "unknown", details: "ConversationRelay not available in IE1 regardless of provider." },
      { provider: "ElevenLabs", status: "us-only", details: "ConversationRelay not available in IE1." },
    ],
    excludedFeatures: ["Entire product not available in IE1 — <Connect><VirtualAgent> TwiML explicitly unsupported"],
    notes: [
      "ConversationRelay is explicitly NOT available in IE1 region per official Twilio documentation",
      "The TwiML verb <Connect><VirtualAgent> is listed as unsupported in IE1",
      "Even with EU-based speech provider endpoints, the orchestration layer would run in US",
      "For EU-sensitive deployments requiring ConversationRelay, must use US1 region with appropriate data transfer agreements"
    ],
  },
  {
    productId: "sendgrid",
    productName: "SendGrid Email API",
    category: "Communications",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1 (requires EU subuser)",
    excludedFeatures: [
      "Email Validation API — NOT in EU residency scope",
      "Marketing Campaigns — not supported in EU environment",
      "Activity feature — not available for EU subusers",
      "Geostats — not available for EU subusers"
    ],
    notes: [
      "Email sending and storage fully available in IE1 via EU subusers with dedicated EU IPs",
      "Must use EU API endpoint (api.eu.sendgrid.com) and EU-specific subusers for data residency",
      "Email Validation API is explicitly NOT in EU data residency scope",
      "DKIM/SPF/DMARC configuration handled in IE1",
      "Requires Pro, Premier, or Custom plan for dedicated EU IPs (shared IPs not eligible)",
      "Billing data stored in Northern Virginia (US) and anonymized after 120 days"
    ],
  },
  {
    productId: "elastic-sip-trunking",
    productName: "Elastic SIP Trunking",
    category: "Communications",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: [
      "SIP Trunk Phone Number API subresource — not in IE1",
      "BYOC Trunks with static IP addresses — not in IE1",
      "Bulk Exports API resource — not in IE1"
    ],
    notes: [
      "SIP trunking fully operational in Dublin (confirmed by official Twilio documentation)",
      "Supports EU-only call paths when configured correctly",
      "Use dublin edge-specific FQDN (trunking.dublin.ie1.twilio.com) for IE1 targeting"
    ],
  },
  {
    productId: "segment-connections",
    productName: "Segment Connections",
    category: "Customer Data",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1 (eu1.segment.io)",
    excludedFeatures: [],
    notes: [
      "All data stored and processed within EU when using eu1.segment.io workspace (confirmed by official Twilio documentation)",
      "Separate infrastructure from US workspaces — EU data never crosses to US",
      "Regional infrastructure can fail-over within EU locations but never across regions",
      "Available to Segment Business Tier customers",
      "Must create workspace in EU or migrate existing workspace for data residency"
    ],
  },
  {
    productId: "segment-protocols",
    productName: "Segment Protocols",
    category: "Customer Data",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: [],
    notes: [
      "Schema and validation data stored in EU for EU workspaces (confirmed by official Twilio documentation)",
      "Part of Segment regional infrastructure — fully data resident"
    ],
  },
  {
    productId: "segment-unify",
    productName: "Segment Unify",
    category: "Customer Data",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: [],
    notes: [
      "Unified profiles stored and processed within EU (confirmed by official Twilio documentation)",
      "Identity resolution and profile merging occurs entirely within EU infrastructure"
    ],
  },
  {
    productId: "segment-engage",
    productName: "Segment Engage",
    category: "Customer Data",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: [],
    notes: [
      "Audience computation and campaign data processed in EU (confirmed by official Twilio documentation)",
      "Audience building and activation workflows run entirely within EU infrastructure"
    ],
  },
  {
    productId: "serverless",
    productName: "Serverless (Functions & Assets)",
    category: "Builder Tools",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: ["Not supported for IE1 messaging inbound processing"],
    notes: [
      "Functions and Assets confirmed GA for EU data residency (official Twilio documentation)",
      "Not supported for inbound SMS processing in IE1 messaging flows",
      "Can be used for other IE1 product integrations"
    ],
  },
  {
    productId: "functions",
    productName: "Functions",
    category: "Builder Tools",
    ie1Status: "ga",
    ie1StatusLabel: "GA in IE1",
    excludedFeatures: ["Not supported for IE1 messaging inbound processing"],
    notes: [
      "Functions and Assets confirmed GA for EU data residency (official Twilio documentation)",
      "Functions not supported for inbound SMS processing in IE1 messaging flows",
      "Can be used for other IE1 product integrations (Voice, etc.)"
    ],
  },
  {
    productId: "studio",
    productName: "Studio",
    category: "Builder Tools",
    ie1Status: "private-beta",
    ie1StatusLabel: "Private Beta in IE1",
    excludedFeatures: ["Not available for IE1 messaging inbound processing"],
    notes: [
      "Studio in IE1 is Private Beta — not GA (confirmed by official Twilio documentation)",
      "Studio not supported for inbound SMS processing in IE1 messaging flows",
      "Contact account team for Private Beta access",
      "Full Studio capabilities may be limited compared to US1"
    ],
  },
  {
    productId: "taskrouter",
    productName: "TaskRouter",
    category: "Communications",
    ie1Status: "private-beta",
    ie1StatusLabel: "Private Beta in IE1",
    excludedFeatures: [],
    notes: [
      "TaskRouter in IE1 is Private Beta — not GA (confirmed by official Twilio documentation)",
      "Contact account team for Private Beta access",
      "Required for Flex contact center operations, but Flex itself not available in IE1"
    ],
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
    ie1StatusLabel: "Partial — Silent Network Auth only",
    excludedFeatures: [
      "Full Verify product not available in IE1",
      "SMS/Voice OTP verification not available in IE1 Verify service",
      "TOTP not available in IE1",
      "Push verification not available in IE1"
    ],
    notes: [
      "Verify Silent Network Auth is available via Lookup v2 in IE1 (confirmed GA)",
      "Full Verify service (SMS/Voice OTP, TOTP, Push) not listed as available in IE1",
      "For OTP delivery, SMS and Voice APIs can be used directly in IE1, but Verify orchestration layer is not regionalized",
      "Official Twilio documentation lists only 'Verify Silent Network Auth' as IE1-available, not the full Verify product"
    ],
  },
  {
    productId: "lookup",
    productName: "Twilio Lookup v2",
    category: "Authentication",
    ie1Status: "ga",
    ie1StatusLabel: "Lookup v2 GA in IE1",
    excludedFeatures: [],
    notes: [
      "Lookup v2 confirmed GA in IE1 (Dublin) Region per official Twilio documentation",
      "Includes Verify Silent Network Auth (SIM Swap detection)",
      "Supports Line Type Intelligence and Identity Match endpoints",
      "Queries processed in EU when using IE1 API endpoint (lookups.dublin.ie1.twilio.com)",
      "Requires IE1-specific API keys for authentication"
    ],
  },
  {
    productId: "video",
    productName: "Twilio Video",
    category: "Communications",
    ie1Status: "not-available",
    ie1StatusLabel: "Not available in IE1",
    excludedFeatures: ["<Connect><Room> TwiML verb explicitly unsupported in IE1"],
    notes: [
      "Video Rooms not available in IE1 — the <Connect><Room> TwiML verb is explicitly listed as unsupported",
      "EU media regions exist for latency optimization in US1 region but do not provide data residency",
      "For video use cases requiring EU data residency, third-party solutions or custom implementation required"
    ],
  },
];

export const BILLING_DATA_NOTE = "Billing data is stored in Northern Virginia (US) for all Twilio products including SendGrid. SendGrid billing data is anonymized after 120 days. There is a distinction between processor data (can be in EU) and controller data (remains US-based). This applies across all IE1 products.";

export const PROXY_NOTE = "Twilio Proxy is NOT available in IE1. If masking/anonymization is needed for EU-resident data, alternative approaches are required.";

export function getResidencyForProduct(productId: string): DataResidencyNuance | undefined {
  return DATA_RESIDENCY_NUANCES.find(n => n.productId === productId);
}
