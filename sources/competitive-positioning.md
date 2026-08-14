# Competitive positioning — data residency & regulatory gaps

**Internal sales enablement only. Do NOT copy-paste this content into customer-facing emails, decks, or share externally.** Unlike the other files in this directory, this content is sourced from internal Crayon competitive battlecards, which are themselves marked "Confidential & Proprietary — Internal Use Only." It is intended to prepare reps for objections raised by prospects, not to be forwarded or quoted directly to customers.

## Scope and methodology

This file is scoped narrowly and intentionally: it documents ONLY cases where a named competitor is credited (in Twilio's own internal battlecards) with a data residency, regulatory, or compliance-certification advantage over a Twilio product. It does **not** cover general win/loss content, pricing, network/deliverability, or feature comparisons — those are out of scope per current prioritization.

Reviewed: 16 Crayon battlecards spanning Messaging, Voice, Flex, Email API, User AuthID (Verify/Lookup), and ConversationRelay against Vonage, Sinch, Bird (MessageBird), Infobip, Genesys, NICE, Five9, Amazon Connect, Prove, TeleSign, Mailchimp, and LiveKit (battlecard URLs: see individual entries below).

**Finding: only one substantive, EMEA-relevant gap was found.** In every other reviewed battlecard, compliance/GDPR/certification content is presented as a Twilio strength, not a weakness (e.g., the Bird/MessageBird battlecard explicitly states Twilio is "highly attuned to EU/UK regulations," while Bird's own compliance approach is described as "less granular"). Infobip's battlecard credits it with Canada data residency, which is out of scope for this EMEA-focused tool and is excluded here.

**Cross-reference requirement:** Before using any entry below, verify the underlying product's current residency status in [data-residency.md](data-residency.md) / `src/lib/products.ts`, since battlecard content may be dated. Do not surface an objection response for a gap that no longer exists.

## Approved framing (unchanged from data-residency.md)

Per existing internal policy: **data residency is not a value prop for SMS, Voice, and Email.** When a competitor claims a residency advantage, the approved response is to pivot to Twilio's legal transfer mechanisms, not to compete claim-for-claim on physical data center location:

> GDPR does not require data residency — it requires adequate protection for transferred data. The Twilio platform provides this through the EU-US Data Privacy Framework, Binding Corporate Rules (approved by the Dutch DPA), and EU Standard Contractual Clauses.

## Entries

### Vonage — Frankfurt data center (Messaging, Voice)

**Competitor claim:** Vonage's internal battlecards for both Messaging and Voice note that Vonage operates dedicated data centers in **both Frankfurt and Dublin**, giving German/DACH customers an in-country storage option. Twilio's IE1 EU region for Messaging and Voice is Dublin-based only — there is no Frankfurt/Germany-specific region.

**Status check:** Twilio Messaging and Voice already have IE1 (Dublin) GA today (see [data-residency.md](data-residency.md)), so the broader "Vonage has EU residency and Twilio doesn't" framing from the original battlecard is outdated. The narrower, still-current gap is specifically: **no Germany-in-country (Frankfurt) option**, only EU-wide (Dublin) residency.

**Approved response (do not lead with data residency):** Per the approved framing above — do not concede this as a meaningful gap in customer conversations. Twilio Messaging and Voice already store and process EU customer data within the EU (Dublin/IE1). Where a customer specifically insists on in-country (not just in-EU) storage, acknowledge that this is a narrower requirement than GDPR itself imposes, and pivot to the legal transfer mechanisms (BCRs, SCCs, DPF) that satisfy in-country requirements when the customer's actual regulatory obligation allows for it. Escalate to legal/deal desk if a customer's requirement is contractually or regulator-mandated to be strictly in-country.

**Source:** [Messaging - Vonage battlecard, "Objection Handling" tile](https://app.crayon.co/act/twilio/battlecard/35906/?tileID=242670&utm_medium=api) (Crayon, internal)

**Applies to:** `messaging`, `voice`, `elastic-sip-trunking`

---

## Explicitly out of scope / not included

- **Infobip — Canada data residency.** Infobip's Messaging battlecard credits it with enabling data residency in Canada. Not included here because this tool is EMEA-focused (see `COUNTRIES` list in `src/app/page.tsx`) and Canada is not a supported market.
- **Vonage — Voice STIR/SHAKEN non-compliance.** Vonage's Voice battlecard notes an FCC finding of Vonage non-compliance with STIR/SHAKEN deadlines. This is a competitor weakness, not a Twilio gap, so it does not belong in this file (it could inform a separate "why we win" resource if one is created).
- **All other reviewed battlecards** (Sinch Messaging/Voice, Bird Messaging, Infobip Voice, Genesys, NICE, Five9, Amazon Connect, Prove, TeleSign, Mailchimp, LiveKit) — reviewed and found to contain no Twilio-side data residency/regulatory/certification gap. Compliance content in these battlecards consistently favors Twilio.
