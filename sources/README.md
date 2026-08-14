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

## Important notes

- **Do not use "Twilio is GDPR compliant."** Approved framing: "Twilio enables businesses to adhere to GDPR requirements."
- **Do not modify legal instrument names** (DPA, BCR, SCC, DPF) — use exact terminology
- **Data residency is not a value prop** for SMS, Voice, and Email per internal policy — position transfer mechanisms instead
- All content in this directory may be copy-pasted by sales reps into customer-facing emails. Write accordingly.
