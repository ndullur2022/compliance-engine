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

## Products NOT in IE1

Flex, Video, Conversation Intelligence, Conversation Relay, Conversation Orchestrator, Conversation Memory — these operate from US infrastructure.

## Billing data

Billing data is stored in Northern Virginia (US). Anonymized after 120 days. This is controller data (not processor data) and has a separate legal basis.

Source: https://www.twilio.com/en-us/legal/data-protection-addendum

## Key positioning rule

**Do not use data residency as a value prop** for SMS, Voice, and Email per internal policy. Instead, position the legal transfer mechanisms (DPF, BCR, SCC) that protect data regardless of location.

## Approved framing for products without IE1

> GDPR does not require data residency — it requires adequate protection for transferred data. The Twilio platform provides this through the EU-US Data Privacy Framework, Binding Corporate Rules (approved by the Dutch DPA), and EU Standard Contractual Clauses.
