# Source documents for legal review

This directory contains the static source material that powers the EMEA Readiness Engine. Every claim, objection response, and FAQ answer in the tool traces back to a document listed here.

## How to review

1. Each file in this directory covers one topic area
2. Every claim includes a `Source:` link to the authoritative Twilio document
3. Changes to these files are tracked via git history — use `git log sources/` to see what changed and when
4. The tool renders content from these files verbatim — the LLM does not modify source text for FAQ and objection handling sections

## Review workflow

1. Open a PR against this directory when source content needs updating
2. Legal reviews the diff (additions, modifications, removals)
3. Once approved and merged, the tool picks up the changes on next deploy

## File index

| File | Content area | Last verified |
|------|-------------|---------------|
| [data-residency.md](data-residency.md) | EU data residency claims, IE1 availability, transfer mechanisms | 2026-08-14 |
| [gdpr-positioning.md](gdpr-positioning.md) | GDPR compliance framing, DPA, processor/controller roles | 2026-08-14 |
| [objection-responses.md](objection-responses.md) | Sales objection handling — approved responses to customer pushback | 2026-08-14 |
| [certifications.md](certifications.md) | Security certifications and attestations claimed | 2026-08-14 |
| [regulations.md](regulations.md) | Regulatory frameworks referenced (GDPR, DORA, NIS2, ePrivacy, etc.) | 2026-08-14 |
| [ai-and-llm.md](ai-and-llm.md) | AI/LLM data handling claims, EU AI Act positioning | 2026-08-14 |
| [product-datasheets.md](product-datasheets.md) | Key claims from official Privacy, Security & AI Governance Datasheets (July 2026) | 2026-08-14 |

## External source URLs

| URL | Content | Used for |
|-----|---------|----------|
| [Trust Center — Product Features](https://security.twilio.com/?itemName=product_features&source=click) | Product datasheets, pen test reports, SOC 2 | Data roles, residency, AI claims |
| [Trust Center — Legal](https://security.twilio.com/?itemName=legal&source=click) | DPA, sub-processors list, customer audit rights, acceptable use policy | Transfer mechanisms, processor obligations, sub-processor transparency |
| [Trust Center — ESG](https://security.twilio.com/?itemName=environment_social_governance&source=click) | Certifications, compliance docs | Certification claims |

## Important notes

- **Do not use "Twilio is GDPR compliant."** Approved framing: "Twilio enables businesses to adhere to GDPR requirements."
- **Do not modify legal instrument names** (DPA, BCR, SCC, DPF) — use exact terminology
- **Data residency is not a value prop** for SMS, Voice, and Email per internal policy — position transfer mechanisms instead
- All content in this directory may be copy-pasted by sales reps into customer-facing emails. Write accordingly.
