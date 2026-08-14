# GDPR positioning — approved language

## Approved framing

> Twilio enables businesses to adhere to GDPR requirements.

> The Twilio platform supports customers' GDPR obligations through documented technical and organizational measures.

## DO NOT USE

- ~~"Twilio is GDPR compliant"~~
- ~~"Twilio's GDPR compliance"~~
- ~~"GDPR-certified"~~
- ~~"fully compliant with GDPR"~~
- ~~Any phrasing that implies Twilio certifies compliance on behalf of customers~~

## Processor/controller roles

Per the July 2026 product datasheets, Twilio's role is determined by data category and processing purpose:

| Role | Context | Source |
|------|---------|--------|
| Independent controller | Customer Account Data (billing, provisioning, subscriber records) | [Product datasheets](https://security.twilio.com/?itemName=product_features&source=click) |
| Independent controller & processor | Customer Content (message bodies, recordings, media) | [Product datasheets](https://security.twilio.com/?itemName=product_features&source=click) |
| Independent controller & processor | Communications Usage Data (metadata, device data) | [Product datasheets](https://security.twilio.com/?itemName=product_features&source=click) |

**Why independent controller?** Quoted from datasheets:
> "Twilio's dual role as both a software provider and an electronic communications service provider"

Controller activities include:
- Account Management & Business Operations (billing, carrier interconnection)
- Platform Security & Fraud Prevention (AI/ML-based detection)
- Legal Compliance (KYC, regulatory mandates, law enforcement cooperation)
- Product Support & Improvement (network optimization)
- Research & Innovation (anonymized/de-identified/aggregated data for model training)

**Important for sales:** Do not oversimplify to "Twilio is a processor." The relationship is more nuanced. Customers should review the product-specific datasheet for their use case.

## Transfer mechanisms (use exact names)

| Mechanism | Status | Source |
|-----------|--------|--------|
| EU-US Data Privacy Framework (DPF) | Active | [DPA](https://www.twilio.com/en-us/legal/data-protection-addendum) |
| Binding Corporate Rules (BCRs) | Approved by Dutch DPA (Autoriteit Persoonsgegevens) | [BCR page](https://www.twilio.com/en-us/legal/bcr) |
| EU Standard Contractual Clauses (SCCs) | Incorporated into DPA | [DPA](https://www.twilio.com/en-us/legal/data-protection-addendum) |

**Do not call these "special agreements" or paraphrase the names.**

## DPA availability

The Twilio DPA is available for execution and covers GDPR processor obligations, Standard Contractual Clauses, and sub-processor management.

Source: https://www.twilio.com/en-us/legal/data-protection-addendum

## Customer responsibilities

Twilio provides the platform and documented safeguards. The customer is responsible for:
- Establishing lawful basis for processing
- Managing data subject rights (access, erasure, portability)
- Conducting Data Protection Impact Assessments (DPIAs)
- Implementing consent collection and management
- Configuring retention and deletion policies per their requirements
