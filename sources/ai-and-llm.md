# AI and LLM — approved claims

## Customer data and model training

**Nuanced claim — do not oversimplify:**

> Twilio does not use identifiable customer data to train customer-facing AI/ML models. Customer data processed through AI features (ConversationRelay, Conversation Intelligence, Agent Copilot) is used only to deliver the service.

However, per the product datasheets (July 2026):

> Twilio acts as a controller when using anonymized, de-identified or aggregated data to train models for improved spam detection, fraud prevention, and deliverability optimization.

This is a **platform security activity** (controller), not a customer-facing AI feature. It applies to all products (Messaging, Voice, SendGrid, Video).

Sources:
- [DPA](https://www.twilio.com/en-us/legal/data-protection-addendum)
- [Product datasheets](https://security.twilio.com/?itemName=product_features&source=click)

## Do not claim

- ~~"Twilio never uses customer data for AI"~~ (anonymized/aggregated data IS used for platform security models)
- ~~"Twilio is purely a processor"~~ (controller for fraud/security/billing activities)

## EU AI Act positioning

Approved framing:

> AI features in the Twilio platform are designed to support EU AI Act compliance. Customers are responsible for classifying their specific use cases by risk level.

Twilio provides:
- Transparency documentation
- Human oversight capabilities
- Disclosure mechanisms (e.g., caller notification for AI agents)

**Customer responsibility:** High-risk deployments (healthcare, finance, legal) require additional customer-side measures.

Source: [Security page](https://www.twilio.com/en-us/security)

## Speech processing location

| Provider | EU processing | Status |
|----------|--------------|--------|
| Amazon (speech) | EU endpoints available | Confirmed |
| Google (speech) | EU endpoints available | Confirmed |
| Deepgram | EU routing | Unconfirmed |
| ElevenLabs | No confirmed EU processing | Unconfirmed |

**Important:** If a customer requires full EU path for Voice AI, they must use Amazon or Google speech AND an EU-hosted LLM endpoint. This requires careful configuration.

## Do not claim

- ~~"AI processing stays in the EU"~~ (depends on provider selection)
- ~~"EU AI Act compliant"~~ (customers must classify their own use cases)
- ~~"No data leaves the EU for AI features"~~ (depends on configuration)
