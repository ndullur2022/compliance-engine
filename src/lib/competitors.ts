// Competitor data-residency / regulatory-gap objections.
//
// Scope: this file intentionally covers ONLY cases where a named competitor is
// credited (in Twilio's own internal Crayon battlecards) with a data residency,
// regulatory, or compliance-certification advantage over a Twilio product. It
// does NOT cover general win/loss, pricing, or feature-comparison content.
//
// INTERNAL USE ONLY: content here is derived from internal battlecards marked
// "Confidential & Proprietary — Internal Use Only." Do not copy-paste into
// customer-facing communications. See sources/competitive-positioning.md for
// the full legal-reviewable source document (this file mirrors that source).
export interface CompetitorGap {
  competitor: string;
  productIds: string[];
  gapClaim: string; // what the competitor claims/offers that Twilio's product doesn't
  whatToSay: string; // approved internal talk track / response
  sources: { label: string; url: string }[];
}

export const COMPETITOR_GAPS: CompetitorGap[] = [
  {
    competitor: "Vonage",
    productIds: ["messaging", "voice", "elastic-sip-trunking"],
    gapClaim:
      "Vonage operates dedicated data centers in both Frankfurt (Germany) and Dublin, offering DACH customers an in-country storage option. Twilio's IE1 EU region for Messaging and Voice is Dublin-based only — there is no Germany-specific (Frankfurt) region.",
    whatToSay:
      "Twilio Messaging and Voice already store and process EU customer data within the EU (Dublin/IE1) — do not concede this as a meaningful gap. Per internal policy, data residency is not a value prop to lead with for Messaging/Voice/Email; if a customer specifically insists on in-country (not just in-EU) storage, clarify that this is a narrower requirement than GDPR itself imposes, and pivot to the legal transfer mechanisms (Binding Corporate Rules, EU Standard Contractual Clauses, EU-US Data Privacy Framework) that satisfy in-country requirements where the customer's actual regulatory obligation allows for it. Escalate to legal/deal desk if the customer's requirement is contractually or regulator-mandated to be strictly in-country.",
    sources: [
      {
        label: "Internal competitive positioning source (legal-reviewable)",
        url: "https://app.crayon.co/act/twilio/battlecard/35906/?tileID=242670&utm_medium=api",
      },
    ],
  },
];

export function getCompetitorGapsForProduct(productId: string): CompetitorGap[] {
  return COMPETITOR_GAPS.filter((g) => g.productIds.includes(productId));
}
