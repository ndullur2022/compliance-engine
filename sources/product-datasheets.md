# Product datasheets — key claims extracted

Source: [Twilio Trust Center](https://security.twilio.com/?itemName=product_features&source=click) (July 2026, v.1)

All datasheets follow the same structure: Privacy, Security & AI Governance Datasheet.

---

## Messaging (SMS & MMS)

| Field | Value |
|-------|-------|
| EU Data Residency | Available for SMS (Ireland data center) |
| Default residency | US for all other traffic |
| Retention | 400 days by default; configurable down to 7 days |
| International transfers | Multiple legal mechanisms available |
| AI features | No customer-facing predictive or generative AI features currently offered |
| Data roles | Customer Account Data (Independent controller), Customer Content (Independent controller & processor), Communications Usage Data (Independent controller & processor) |

**Key claims:**
- "Option to store and process personal data associated with SMS messages within Ireland data center"
- "Customer Account Data is not subject to residency controls and is processed globally"
- "Certain activities are excluded from our EU Data Residency feature, including Point Delete Service and Address Whitelist mail settings"
- Twilio acts as independent controller for Communications Usage Data due to "dual role as both a software provider and an electronic communications service provider"
- Uses AI/ML for fraud detection: "analyze messaging patterns for 'smishing' (SMS phishing) attacks, detect spikes in traffic indicating account takeovers, or scan messages and media files for malware and prohibited content"
- Research & Innovation: "using anonymized, de-identified or aggregated message content to train models for improved spam detection, language support, and deliverability"

---

## Messaging (WhatsApp)

| Field | Value |
|-------|-------|
| EU Data Residency | **Not available** |
| Retention | 400 days by default; configurable down to 7 days |
| International transfers | Multiple legal mechanisms available |
| AI features | No customer-facing predictive or generative AI features currently offered |
| Data roles | Same as SMS — Independent controller & processor |

**Key claims:**
- "All processing for outbound messaging is conducted in the US" (no EU residency option)
- Data processed includes: "message text body, interactive quick-reply selections, dynamic template variables, rich media attachments (images, audio, video, and PDFs), related transmission logs, WhatsApp profile names, and static, one-time user locations transmitted manually"
- "live location tracking is not supported"
- Meta is referenced as a "platform partner" for interconnection settlement payments

---

## Voice (Programmable Voice)

| Field | Value |
|-------|-------|
| EU Data Residency | Available — EU & Australia |
| Default residency | US |
| Retention | Per data retention schedule (linked) |
| International transfers | Multiple legal mechanisms available |
| AI features | Optional customer-enabled AI features available |
| Data roles | Same structure — Independent controller & processor |

**Key claims:**
- "Option to store and process Customer Content within EU or Australia data centers"
- "Not all APIs or features are supported. For a list of unsupported APIs/features, visit: www.twilio.com/docs/global-infrastructure/regional-product-and-feature-availability"
- "Customer Account Data is not subject to residency controls and is processed globally"
- Voice-specific threats: "toll fraud," "call pumping," "illegal robocalling," "illegal spoofing"
- Twilio manages the "Super Network" — "direct relationships and interconnection payments required to bridge cloud software with global telecommunications carriers"
- Uses AI/ML for fraud detection on "call activity logs, signalling data, audio patterns or interaction metadata"

---

## SendGrid

| Field | Value |
|-------|-------|
| EU Data Residency | Available (Irish data center) |
| Default residency | US |
| Retention | Per data retention schedule (linked) |
| International transfers | Multiple legal mechanisms available |
| AI features | No customer-facing predictive or generative AI features currently offered |
| Data roles | Same structure — Independent controller & processor |

**Key claims:**
- "Option to store and primarily process emails within our Irish data center"
- "Certain activities are excluded from our EU Data Residency feature, including Point Delete Service and Address Whitelist mail settings"
- "Customer Account Data is not subject to residency controls and is processed globally"
- Email-specific fraud: "phishing, spam and system abuse," "snowshoeing" (distributing spam across multiple IPs to evade reputation filters)
- Legal compliance: "adhering to regional anti-spam laws like CAN-SPAM or CASL"
- Uses AI/ML to "detect spikes in traffic indicating account takeovers, or scan messages and media files for malware and prohibited content"

---

## Video

| Field | Value |
|-------|-------|
| EU Data Residency | **Not available** (region selection is for latency, NOT data residency) |
| Available regions | Australia, Brazil, Germany, Ireland, India, Japan, Singapore, US East, US West |
| Retention | Per data retention schedule (linked) |
| International transfers | Multiple legal mechanisms available |
| AI features | Core platform does not use predictive or generative AI. Customer-enabled optional features available |
| Data roles | Same structure — Independent controller & processor |

**Critical claim for sales:**
> "Manual region selection is provided solely to optimize network performance and reduce latency; it is not intended to satisfy data residency or sovereignty requirements and should not be relied upon for regulatory compliance purposes."

**Key claims:**
- Uses "Global Low Latency (GLL) to dynamically select the best Signaling Region for each participant and the closest Media Region"
- Developers can override GLL to manually designate specific regions
- Communications Usage Data includes "room IDs, participant IDs, and network quality metrics"
- Uses AI/ML for "room-flooding resource exhaustion attacks" detection

---

## Common patterns across all datasheets

### Data roles (consistent across products)

Twilio acts as **independent controller** for:
- Account Management & Business Operations (billing, carrier interconnection)
- Platform Security & Fraud Prevention (AI/ML-based detection)
- Legal Compliance (KYC, regulatory mandates)
- Product Support & Improvement (network optimization, routing)
- Research & Innovation (anonymized/de-identified/aggregated data for model training)

Twilio acts as **processor** for:
- Delivering the communications service on behalf of the customer

### Controller justification (quoted from datasheets)

> "Twilio's dual role as both a software provider and an electronic communications service provider"

> "Following European Data Protection Board (EDPB) guidance, Twilio acts as a controller for the operation of its services"

### AI/ML usage for fraud (all products)

All datasheets confirm Twilio uses AI/ML for fraud detection as a controller activity. This is for platform security, NOT customer-facing AI features. The distinction matters for EU AI Act classification.

### EU Data Residency exclusions (SMS and SendGrid)

Both SMS and SendGrid datasheets note: "Certain activities are excluded from our EU Data Residency feature, including Point Delete Service and Address Whitelist mail settings."

---

## Important corrections to existing source files

Based on these datasheets, the following updates to the tool's existing data should be noted:

1. **Processor/controller role is more nuanced than previously stated.** The FAQ currently says "Twilio acts as a data processor for customer communications data." The datasheets clarify Twilio is BOTH independent controller AND processor depending on the data category and processing purpose. Update `gdpr-positioning.md`.

2. **Video region selection is NOT data residency.** The datasheet explicitly states it "should not be relied upon for regulatory compliance purposes." Ensure the tool does not present Video region selection as a residency option.

3. **WhatsApp has NO EU residency option.** All processing is US-based. This differs from SMS which has EU available.

4. **Research & Innovation uses customer data (anonymized).** The datasheets confirm Twilio uses anonymized/de-identified/aggregated content for model training. The FAQ claim "Twilio does not use customer data to train AI/ML models" needs qualification — it applies to identifiable customer data, not anonymized/aggregated data.
