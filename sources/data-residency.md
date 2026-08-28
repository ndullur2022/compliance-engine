# Data residency — source claims

## IE1 (Dublin) availability

| Product | IE1 Status | Source |
|---------|-----------|--------|
| Programmable Messaging (SMS) | GA | [Regions docs](https://www.twilio.com/docs/global-infrastructure/messaging-api-with-twilio-regions) |
| Programmable Voice | GA | [Voice docs](https://www.twilio.com/docs/voice) |
| Elastic SIP Trunking | GA | [SIP Trunking docs](https://www.twilio.com/docs/sip-trunking) |
| SendGrid | GA | [SendGrid EU blog](https://www.twilio.com/en-us/blog/send-emails-in-eu) |
| Segment | GA | [Regional Segment guide](https://www.twilio.com/docs/segment/guides/regional-segment) |
| Lookup v2 | GA | [Lookup regions](https://www.twilio.com/docs/lookup/using-lookup-with-twilio-regions) |
| Conversations (Chat) | GA | [Conversations regions](https://www.twilio.com/docs/global-infrastructure/conversations-api-with-twilio-regions) |
| Functions & Assets | GA | [Functions regions](https://www.twilio.com/docs/global-infrastructure/regional-support-functions-assets) |
| Studio | Private Beta | [Studio docs](https://www.twilio.com/docs/studio) |
| TaskRouter | Private Beta | [TaskRouter docs](https://www.twilio.com/docs/taskrouter) |
| Verify Silent Network | GA | [Verify SNA docs](https://www.twilio.com/docs/verify/using-verify-silent-network-auth-with-twilio-regions) |

## Products NOT in IE1

Flex, Video, Conversation Intelligence, Conversation Relay, Conversation Orchestrator, Conversation Memory, WhatsApp — these operate from US infrastructure.

### Video region selection caveat

Video offers region selection (Australia, Brazil, Germany, Ireland, India, Japan, Singapore, US East, US West) but the datasheet explicitly states:

> "Manual region selection is provided solely to optimize network performance and reduce latency; it is not intended to satisfy data residency or sovereignty requirements and should not be relied upon for regulatory compliance purposes."

**Do not position Video region selection as data residency.**

### WhatsApp

Per the July 2026 datasheet: "All processing for outbound messaging is conducted in the US." No EU residency option exists for WhatsApp. This differs from SMS.

## Billing data

Billing data is stored in Northern Virginia (US). Anonymized after 120 days. This is controller data (not processor data) and has a separate legal basis.

Source: https://www.twilio.com/en-us/legal/data-protection-addendum

## Key positioning rule

**Do not use data residency as a value prop** for SMS, Voice, and Email per internal policy. Instead, position the legal transfer mechanisms (DPF, BCR, SCC) that protect data regardless of location.

## Approved framing for products without IE1

> GDPR does not require data residency — it requires adequate protection for transferred data. The Twilio platform provides this through the EU-US Data Privacy Framework, Binding Corporate Rules (approved by the Dutch DPA), and EU Standard Contractual Clauses.
