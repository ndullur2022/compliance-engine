export interface DataDeletionSolution {
  productId: string;
  productName: string;
  deletionMethod: string;
  deletionEndpoint?: string;
  retentionDefault: string;
  configurableRetention: boolean;
  redactionCapabilities: string[];
  automatedDeletion: boolean;
  dsarSupport: string;
  steps: string[];
  caveats: string[];
  documentationUrl?: string;
}

export const DATA_DELETION_SOLUTIONS: DataDeletionSolution[] = [
  {
    productId: "messaging",
    productName: "Messaging APIs",
    deletionMethod: "Message Resource DELETE API + configurable retention",
    deletionEndpoint: "DELETE /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}",
    retentionDefault: "400 days (message body), 13 months (metadata/CDRs)",
    configurableRetention: true,
    redactionCapabilities: [
      "Redact message body via POST with Body='' (replaces content with empty string)",
      "Message body can be deleted while retaining delivery metadata",
      "Media URLs can be deleted separately via Media subresource DELETE",
    ],
    automatedDeletion: true,
    dsarSupport: "Use Message Resource list filtered by To/From number to locate all messages for a data subject, then DELETE each",
    steps: [
      "Set account-level data retention to minimum needed (Console > Messaging > Settings)",
      "Use the Redact API (POST with Body='') for immediate content removal without losing delivery logs",
      "DELETE individual messages via API for full removal including metadata",
      "For bulk DSAR: query by phone number, iterate and delete/redact each resource",
      "Configure automatic deletion rules via retention policies in Console",
    ],
    caveats: [
      "CDR metadata may persist up to 13 months even after message body deletion",
      "Carrier-side copies are outside the Twilio control plane",
      "Billing records retained separately per legal requirements",
    ],
    documentationUrl: "https://www.twilio.com/docs/messaging/api/message-resource#delete-a-message-resource",
  },
  {
    productId: "voice",
    productName: "Voice API",
    deletionMethod: "Recording DELETE API + configurable recording storage",
    deletionEndpoint: "DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}",
    retentionDefault: "Indefinite (recordings persist until deleted), 13 months (CDRs)",
    configurableRetention: true,
    redactionCapabilities: [
      "Delete recordings via API (audio file removed permanently)",
      "Transcription resources can be deleted independently",
      "Call metadata (CDRs) cannot be selectively redacted but auto-expire",
    ],
    automatedDeletion: false,
    dsarSupport: "Query Recordings by call SID or date range; delete recordings. Call logs queryable by To/From for DSAR scoping",
    steps: [
      "DELETE recordings immediately after processing if not needed for retention",
      "Set up automated recording deletion via serverless functions on recording-completed webhook",
      "For DSARs: query recordings by participant phone number, delete each",
      "Disable recording storage if real-time streaming (Media Streams) is used instead",
      "Use encryption at rest (enabled by default) for recordings that must be retained",
    ],
    caveats: [
      "Call metadata (CDRs) retained up to 13 months regardless of recording deletion",
      "Transcriptions must be deleted separately from recordings",
      "In-progress recordings cannot be deleted until call completes",
    ],
    documentationUrl: "https://www.twilio.com/docs/voice/api/recording#delete-a-recording-resource",
  },
  {
    productId: "sendgrid",
    productName: "SendGrid Email API",
    deletionMethod: "Contact DELETE API + suppression management + activity retention settings",
    deletionEndpoint: "DELETE /v3/marketing/contacts",
    retentionDefault: "Activity feed: 30 days (free) / 7 days stored",
    configurableRetention: true,
    redactionCapabilities: [
      "Delete contacts and all associated data via Marketing Contacts API",
      "Remove from suppression lists (bounces, blocks, spam reports)",
      "Email activity data auto-expires based on plan tier",
    ],
    automatedDeletion: true,
    dsarSupport: "Search contacts by email, export data for portability requests, then DELETE for erasure requests",
    steps: [
      "DELETE contacts via /v3/marketing/contacts with body containing IDs",
      "Remove from global suppression list if unsubscribe is not sufficient (requires reason)",
      "Use Contact Export API for data portability (GDPR Article 20)",
      "Configure activity retention to minimum needed in Email Activity settings",
      "For bulk DSAR: search by email domain or segment, export then delete",
    ],
    caveats: [
      "Deletion is asynchronous — may take up to 48 hours to fully propagate",
      "Suppression entries should generally be preserved to prevent re-sending (legitimate interest)",
      "Email validation data (if used) stored separately",
    ],
    documentationUrl: "https://www.twilio.com/docs/sendgrid/api-reference/contacts/delete-contacts",
  },
  {
    productId: "verify",
    productName: "Twilio Verify",
    deletionMethod: "Verification auto-expiry + Entity DELETE for Push/TOTP",
    deletionEndpoint: "DELETE /v2/Services/{ServiceSid}/Entities/{Identity}",
    retentionDefault: "Verification attempts: auto-expire after 10 minutes (OTP) / configurable",
    configurableRetention: true,
    redactionCapabilities: [
      "OTP codes auto-expire and are not stored after verification window",
      "Push registration data deletable via Entity DELETE",
      "TOTP factors can be deleted per user via Factor DELETE",
    ],
    automatedDeletion: true,
    dsarSupport: "Delete Entity by identity (phone number/user ID) to remove all factors and registration data",
    steps: [
      "OTPs auto-expire — no action needed for transient verification data",
      "DELETE Entities to remove Push/TOTP registrations for a specific user",
      "DELETE individual Factors if granular control needed",
      "Verification logs auto-purge per retention settings",
      "For DSARs: identify user by phone number, delete associated Entity",
    ],
    caveats: [
      "Verification attempt logs (success/fail) may persist in CDRs",
      "Fraud Guard analytics data retention is separate",
      "Rate limit counters are ephemeral and not personally identifiable",
    ],
    documentationUrl: "https://www.twilio.com/docs/verify/api/entity#delete-an-entity",
  },
  {
    productId: "lookup",
    productName: "Twilio Lookup",
    deletionMethod: "No persistent storage — queries are stateless",
    retentionDefault: "No data stored by default — Lookup is a query service",
    configurableRetention: false,
    redactionCapabilities: [
      "No personal data stored by the Lookup service itself",
      "Query results not persisted on the Twilio side after response",
    ],
    automatedDeletion: true,
    dsarSupport: "No action needed — Lookup does not store personal data. CDRs showing API calls may exist but contain no PII beyond the queried number",
    steps: [
      "No deletion action required — Lookup is stateless",
      "If you cache Lookup results in your application, handle deletion there",
      "API call logs (CDRs) auto-expire per standard retention",
    ],
    caveats: [
      "The phone number queried appears in API usage logs/CDRs",
      "If results are cached client-side, the customer is the controller for that copy",
    ],
    documentationUrl: "https://www.twilio.com/docs/lookup/v2-api",
  },
  {
    productId: "segment-connections",
    productName: "Segment Connections",
    deletionMethod: "User Deletion & Suppression API + Workspace-level data controls",
    deletionEndpoint: "POST /v1beta/workspaces/{workspace}/regulations",
    retentionDefault: "Configurable per workspace (default varies by plan)",
    configurableRetention: true,
    redactionCapabilities: [
      "Suppress user — stops data collection for a user without deleting history",
      "Delete user — removes all data for a userId/anonymousId from Segment and connected destinations",
      "Selective property redaction via Protocols transformations",
    ],
    automatedDeletion: true,
    dsarSupport: "Use Deletion & Suppression API with regulate_type='suppress_and_delete' for full GDPR erasure across all destinations",
    steps: [
      "Use Privacy Portal or API to create a suppression regulation for the user",
      "Create a deletion regulation to remove historical data from Segment and forwarded destinations",
      "Configure source-level data retention policies",
      "Use Protocols to redact sensitive properties before they enter the pipeline",
      "Monitor regulation status via GET /regulations/{regulationId}",
    ],
    caveats: [
      "Deletion propagates to connected destinations but each destination handles it independently",
      "Some destinations may not support deletion — check compatibility",
      "Deletion is asynchronous and may take 24-72 hours to propagate fully",
      "Audit logs of the deletion request itself are retained for compliance",
    ],
    documentationUrl: "https://www.twilio.com/docs/segment/privacy/user-deletion-and-suppression",
  },
  {
    productId: "segment-unify",
    productName: "Segment Unify",
    deletionMethod: "Profile deletion via Deletion & Suppression API",
    deletionEndpoint: "POST /v1beta/workspaces/{workspace}/regulations",
    retentionDefault: "Configurable per workspace",
    configurableRetention: true,
    redactionCapabilities: [
      "Delete unified profile including all merged identities",
      "Suppress future data collection for a given identity",
    ],
    automatedDeletion: true,
    dsarSupport: "Delete the unified profile by any known identifier (userId, email, phone) — cascades across merged identities",
    steps: [
      "Identify the profile by userId, email, or phone number",
      "Create a suppression regulation to prevent re-creation",
      "Create a deletion regulation to remove the unified profile",
      "Verify deletion propagated to Engage audiences and destinations",
    ],
    caveats: [
      "Merged profiles: deleting one identity deletes the entire merged profile",
      "Audiences referencing the deleted profile update asynchronously",
    ],
    documentationUrl: "https://www.twilio.com/docs/segment/privacy/user-deletion-and-suppression",
  },
  {
    productId: "segment-engage",
    productName: "Segment Engage",
    deletionMethod: "Inherited from Segment Connections/Unify deletion",
    retentionDefault: "Inherited from workspace settings",
    configurableRetention: true,
    redactionCapabilities: [
      "User deletion removes them from all audiences",
      "Suppression prevents future audience membership",
      "Campaign history associated with user is deleted",
    ],
    automatedDeletion: true,
    dsarSupport: "Use Segment Deletion & Suppression API — audience membership and campaign history for the user is removed",
    steps: [
      "Follow Segment Connections deletion flow — Engage data is deleted automatically",
      "Verify user removed from active audiences after deletion propagates",
      "Check connected destinations received the deletion signal",
    ],
    caveats: [
      "Active campaigns may still send to user until deletion propagates (design for suppression-first)",
      "Aggregate analytics (audience size counters) not affected by individual deletion",
    ],
    documentationUrl: "https://www.twilio.com/docs/segment/privacy/user-deletion-and-suppression",
  },
  {
    productId: "flex",
    productName: "Twilio Flex",
    deletionMethod: "Channel-level deletion + Flex Insights data controls",
    retentionDefault: "Flex Insights: 18 months (configurable), Channel data: varies by underlying product",
    configurableRetention: true,
    redactionCapabilities: [
      "Delete chat transcripts via Conversations API",
      "Redact task attributes containing PII",
      "Flex Insights data can be excluded or anonymized",
    ],
    automatedDeletion: false,
    dsarSupport: "Multi-step: delete channel messages via Conversations Message API, redact task attributes via TaskRouter Task API, and configure Flex Insights retention in Console",
    steps: [
      "Delete conversation messages via Conversations API (DELETE /v1/Conversations/{ConversationSid}/Messages/{MessageSid})",
      "Use TaskRouter API to update/redact task attributes containing PII (POST /v1/Workspaces/{WorkspaceSid}/Tasks/{TaskSid})",
      "Configure Flex Insights data retention period in Console (Flex > Insights > Settings)",
      "For recordings: DELETE via Voice API (/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid})",
      "For DSAR: aggregate data from all underlying channels (chat, voice, SMS) and delete each",
    ],
    caveats: [
      "Flex is a composite product — deletion must be performed across all underlying services",
      "Flex Insights analytics may retain anonymized aggregate data",
      "Worker (agent) data is separate from customer data",
    ],
    documentationUrl: "https://www.twilio.com/docs/conversations/api/conversation-message-resource#delete-a-conversationmessage-resource",
  },
  {
    productId: "studio",
    productName: "Studio",
    deletionMethod: "Execution logs configurable retention + Flow data management",
    retentionDefault: "Execution logs: 30 days",
    configurableRetention: true,
    redactionCapabilities: [
      "Execution logs auto-expire after retention period",
      "Flow definitions do not contain PII (they are templates)",
      "Variables passed during execution are in logs — covered by log retention",
    ],
    automatedDeletion: true,
    dsarSupport: "Execution logs are transient and auto-expire. No persistent PII storage beyond configured retention.",
    steps: [
      "Configure execution log retention to minimum needed",
      "Avoid storing PII in flow variables that persist beyond execution",
      "For immediate needs: DELETE specific executions via API",
      "Flow definitions are not PII-bearing — no deletion needed",
    ],
    caveats: [
      "If flows write PII to external systems (Functions, APIs), those stores need separate deletion",
      "Execution context variables may briefly contain PII during flow execution",
    ],
    documentationUrl: "https://www.twilio.com/docs/studio/rest-api/v2/execution",
  },
  {
    productId: "event-streams",
    productName: "Event Streams",
    deletionMethod: "Sink-level configuration — Event Streams itself is a transport layer",
    retentionDefault: "Events delivered in real-time — no persistent storage in Event Streams",
    configurableRetention: false,
    redactionCapabilities: [
      "Event Streams is a delivery pipe — no persistent data to redact",
      "Configure sinks to filter out PII-containing event types if needed",
    ],
    automatedDeletion: true,
    dsarSupport: "No action on Event Streams itself — manage deletion in downstream sinks (data warehouse, analytics, etc.)",
    steps: [
      "Event Streams does not persistently store events — they are delivered to your sink",
      "Handle deletion in your downstream data store (S3, BigQuery, etc.)",
      "Use event type filtering to exclude PII-heavy events from specific sinks",
    ],
    caveats: [
      "Once events are delivered to your sink, you are the controller",
      "Failed delivery attempts may be retried (events buffered temporarily)",
    ],
    documentationUrl: "https://www.twilio.com/docs/events",
  },
  {
    productId: "conversation-relay",
    productName: "Conversation Relay",
    deletionMethod: "No separate deletion — relies on underlying Voice/LLM provider deletion",
    retentionDefault: "Audio not stored by Conversation Relay (streamed to speech provider)",
    configurableRetention: false,
    redactionCapabilities: [
      "Audio is streamed, not stored — no persistent audio data in Conversation Relay",
      "Transcripts handled by your LLM provider (you control retention there)",
    ],
    automatedDeletion: true,
    dsarSupport: "Address deletion with your LLM provider and speech vendor. Twilio Voice CDRs follow standard Voice deletion path.",
    steps: [
      "Conversation Relay streams audio — no persistent storage to delete",
      "Delete call recordings (if enabled) via Voice API",
      "Contact your LLM provider for transcript/context deletion",
      "Contact your speech provider (Deepgram, Google, etc.) for any cached audio",
    ],
    caveats: [
      "LLM provider may log conversation context — this is outside the Twilio platform",
      "Speech provider caching policies vary",
      "Voice CDRs still generated and follow standard retention",
    ],
  },
  {
    productId: "conversation-intelligence",
    productName: "Conversation Intelligence",
    deletionMethod: "Delete underlying voice recordings via Voice API — no separate CI deletion endpoint exists",
    retentionDefault: "Configurable (tied to Voice recording retention)",
    configurableRetention: true,
    redactionCapabilities: [
      "PII redaction available in transcript processing pipeline",
      "Delete source recordings to remove transcripts",
    ],
    automatedDeletion: false,
    dsarSupport: "Delete voice recordings by participant identifier via Voice Recording API — transcripts derived from deleted recordings are removed",
    steps: [
      "DELETE underlying voice recordings via Voice API (DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid})",
      "Enable PII redaction in the processing pipeline for new transcripts",
      "No dedicated Conversation Intelligence deletion API exists — deletion flows through Voice",
    ],
    caveats: [
      "No standalone CI deletion endpoint — all deletion is via the Voice Recording API",
      "Analytics derived from transcripts may persist in aggregate form",
      "PII redaction is applied at processing time — retroactive redaction requires reprocessing",
    ],
    documentationUrl: "https://www.twilio.com/docs/voice/api/recording#delete-a-recording-resource",
  },
  {
    productId: "privacy-portal",
    productName: "Privacy Portal",
    deletionMethod: "This IS the deletion tool — orchestrates deletion across the Twilio platform",
    retentionDefault: "N/A — Privacy Portal manages retention for other products",
    configurableRetention: true,
    redactionCapabilities: [
      "Orchestrates deletion requests across Twilio products",
      "Handles DSAR workflows end-to-end",
      "Configures retention policies centrally",
    ],
    automatedDeletion: true,
    dsarSupport: "Privacy Portal is purpose-built for DSAR management — submit requests, track progress, generate compliance reports",
    steps: [
      "Use Privacy Portal to submit deletion requests for data subjects",
      "Configure automated retention policies per product",
      "Track DSAR request status and generate audit reports",
      "Set up automated workflows for recurring DSAR patterns",
    ],
    caveats: [
      "Not all Twilio products fully integrated yet — check coverage",
      "Deletion confirmation depends on downstream product processing",
    ],
    documentationUrl: "https://www.twilio.com/en-us/privacy",
  },
];

export function getDeletionSolutionForProduct(productId: string): DataDeletionSolution | undefined {
  return DATA_DELETION_SOLUTIONS.find(s => s.productId === productId);
}

export function getDeletionSolutionsForProducts(productIds: string[]): DataDeletionSolution[] {
  return DATA_DELETION_SOLUTIONS.filter(s => productIds.includes(s.productId));
}
