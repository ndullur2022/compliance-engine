export interface Objection {
  id: string;
  customerSays: string;
  reality: string;
  whatToSay: string;
  supportingLinks: { label: string; url: string }[];
  applicableWhen: "no-residency" | "always" | "regulated-sector";
}

export const DATA_RESIDENCY_OBJECTIONS: Objection[] = [
  {
    id: "gdpr-requires-residency",
    customerSays: "GDPR requires us to keep data in the EU.",
    reality: "GDPR does not require data residency. Personal data can be transferred outside the EU as long as the recipient provides the same level of data protection. Twilio meets this through approved legal transfer mechanisms.",
    whatToSay: "GDPR allows data transfers outside the EU when proper safeguards are in place. The Twilio platform uses three approved mechanisms to protect EU data: the EU-US Data Privacy Framework, Binding Corporate Rules (BCRs), and EU Standard Contractual Clauses. These are the same mechanisms used by major banks and healthcare providers across Europe.",
    supportingLinks: [
      { label: "Data Protection Addendum (DPA)", url: "https://www.twilio.com/en-us/legal/data-protection-addendum" },
      { label: "Binding Corporate Rules (BCRs)", url: "https://www.twilio.com/en-us/legal/bcr" },
      { label: "Sub-processors list", url: "https://www.twilio.com/en-us/legal/sub-processors" },
    ],
    applicableWhen: "no-residency",
  },
  {
    id: "data-must-stay-in-country",
    customerSays: "Our data cannot leave the country/region.",
    reality: "Most privacy laws do not require data to stay in-country. What they require is that transferred data gets the same level of protection it would have received locally. Customers often confuse data residency with data sovereignty or misinterpret regulatory guidance.",
    whatToSay: "I understand that concern. Let me clarify what the law actually requires vs. what many people assume. Privacy laws like GDPR require that data receives the same protection when transferred — not that it stays in one place. The Twilio platform provides that protection through certified transfer mechanisms. That said, if your industry regulator specifically requires in-region processing, let's talk about which products do offer EU residency and how we can architect a solution.",
    supportingLinks: [
      { label: "Binding Corporate Rules (BCRs)", url: "https://www.twilio.com/en-us/legal/bcr" },
      { label: "Security overview", url: "https://www.twilio.com/en-us/security" },
      { label: "Trust Center", url: "https://www.twilio.com/en-us/trust-center" },
    ],
    applicableWhen: "no-residency",
  },
  {
    id: "us-government-access",
    customerSays: "We are concerned about US government access to our data.",
    reality: "This is a common concern driven by geopolitical tensions. Twilio addresses this through BCRs (approved by EU data protection authorities), encryption, and access controls. The EU-US Data Privacy Framework specifically addresses government access concerns.",
    whatToSay: "That's a valid concern and one we hear often. The Twilio platform addresses this in three ways: First, our Binding Corporate Rules are approved by EU authorities and include strict limits on government access. Second, data is encrypted in transit and at rest. Third, the EU-US Data Privacy Framework includes specific safeguards against disproportionate government surveillance. We can walk through the specific protections in our DPA.",
    supportingLinks: [
      { label: "Binding Corporate Rules (BCRs)", url: "https://www.twilio.com/en-us/legal/bcr" },
      { label: "Security overview", url: "https://www.twilio.com/en-us/security" },
      { label: "Data Protection Addendum (DPA)", url: "https://www.twilio.com/en-us/legal/data-protection-addendum" },
    ],
    applicableWhen: "no-residency",
  },
  {
    id: "regulated-sector-requirement",
    customerSays: "Our industry regulator requires data residency.",
    reality: "Some sector-specific laws (financial services, healthcare, public sector) may require or strongly encourage data residency. This is different from GDPR. The key is understanding exactly what the regulation says — some require storage in-region but allow remote access for support.",
    whatToSay: "Let's dig into what your regulator specifically requires. In our experience, sector requirements vary a lot — some need data stored in-region but allow remote access for support. Others need all processing in-region. Can you share which regulation applies? That helps us find the right architecture. For products that do offer EU residency (like Messaging, Voice, Segment, and SendGrid), we can keep everything in Dublin. For others, we have safeguards that satisfy most regulatory requirements.",
    supportingLinks: [
      { label: "Regional product availability", url: "https://www.twilio.com/docs/global-infrastructure/regional-product-and-feature-availability" },
      { label: "Trust Center", url: "https://www.twilio.com/en-us/trust-center" },
      { label: "Data Protection Addendum (DPA)", url: "https://www.twilio.com/en-us/legal/data-protection-addendum" },
    ],
    applicableWhen: "regulated-sector",
  },
  {
    id: "support-not-in-eu",
    customerSays: "Your support team is not in the EU — that's a problem.",
    reality: "Having support teams outside the EU is acceptable under GDPR as long as you are transparent about it. Remote access to data for support purposes is a data transfer, but it is covered by the legal transfer mechanisms in place (BCRs, SCCs, DPF).",
    whatToSay: "Good question. Our support may access data remotely, and that counts as a transfer under GDPR. But it's fully covered by our legal transfer mechanisms — BCRs and Standard Contractual Clauses. We're transparent about this in our DPA so your legal team can see exactly what happens. Many of our EU financial services customers are comfortable with this setup because the safeguards are documented and auditable.",
    supportingLinks: [
      { label: "Data Protection Addendum (DPA)", url: "https://www.twilio.com/en-us/legal/data-protection-addendum" },
      { label: "Sub-processors list", url: "https://www.twilio.com/en-us/legal/sub-processors" },
      { label: "Binding Corporate Rules (BCRs)", url: "https://www.twilio.com/en-us/legal/bcr" },
    ],
    applicableWhen: "no-residency",
  },
  {
    id: "competitor-offers-residency",
    customerSays: "Your competitor offers full EU data residency for this product.",
    reality: "Data residency is one factor in a compliance decision, but it is not the only one. Platform breadth, reliability, certifications, and legal transfer mechanisms all contribute to a compliant deployment. Choosing a product only for residency while sacrificing other capabilities may not reduce overall risk.",
    whatToSay: "Data residency is one piece of the compliance puzzle, but not the whole picture. The Twilio platform brings ISO 27001, SOC 2, BSI C5 certifications, plus approved BCRs and 99.95%+ SLAs. Some of our products do offer EU residency — Messaging, Voice, Segment, SendGrid — and for products that don't yet, our legal transfer mechanisms provide the same level of protection GDPR requires. Let me show you how the full platform compares on security, compliance, and scale.",
    supportingLinks: [
      { label: "Security certifications", url: "https://www.twilio.com/en-us/security" },
      { label: "Regional product availability", url: "https://www.twilio.com/docs/global-infrastructure/regional-product-and-feature-availability" },
      { label: "Binding Corporate Rules (BCRs)", url: "https://www.twilio.com/en-us/legal/bcr" },
    ],
    applicableWhen: "no-residency",
  },
  {
    id: "all-processing-in-region",
    customerSays: "We need ALL processing to happen in-region, not just storage.",
    reality: "This is the strictest interpretation of data residency. Most customers' actual requirements are less strict once you unpack what the law says vs. what they assume. The key is transparency about what data may be transferred and how. It is up to the customer to decide what they are comfortable with.",
    whatToSay: "Let's break this down. 'All processing' covers a lot — collection, storage, access, support, analytics. Most regulations don't require all of these to happen in-region. What they require is protection and transparency. Can we map out your specific workflows? For the products with EU residency, data stays in Dublin. For others, we can document exactly what transfers happen and why — so your compliance team can make an informed decision based on facts, not assumptions.",
    supportingLinks: [
      { label: "Regional product availability", url: "https://www.twilio.com/docs/global-infrastructure/regional-product-and-feature-availability" },
      { label: "Data Protection Addendum (DPA)", url: "https://www.twilio.com/en-us/legal/data-protection-addendum" },
      { label: "Sub-processors list", url: "https://www.twilio.com/en-us/legal/sub-processors" },
    ],
    applicableWhen: "no-residency",
  },
];

export const EU_RESIDENCY_PRODUCTS = [
  { name: "Programmable Messaging (SMS)", url: "https://www.twilio.com/docs/global-infrastructure/messaging-api-with-twilio-regions" },
  { name: "Programmable Voice", url: "https://www.twilio.com/docs/voice" },
  { name: "Elastic SIP Trunking", url: "https://www.twilio.com/docs/sip-trunking" },
  { name: "SendGrid", url: "https://www.twilio.com/en-us/blog/send-emails-in-eu" },
  { name: "Segment", url: "https://www.twilio.com/docs/segment/guides/regional-segment" },
  { name: "Lookup v2", url: "https://www.twilio.com/docs/lookup/using-lookup-with-twilio-regions" },
  { name: "Conversations (Chat)", url: "https://www.twilio.com/docs/global-infrastructure/conversations-api-with-twilio-regions" },
  { name: "Functions & Assets", url: "https://www.twilio.com/docs/global-infrastructure/regional-support-functions-assets" },
  { name: "Studio (Private Beta)", url: "https://www.twilio.com/docs/studio" },
  { name: "TaskRouter (Private Beta)", url: "https://www.twilio.com/docs/taskrouter" },
];

export function getObjectionsForProduct(hasEuResidency: boolean, industry: string): Objection[] {
  const objections: Objection[] = [];

  if (!hasEuResidency) {
    objections.push(...DATA_RESIDENCY_OBJECTIONS.filter(o => o.applicableWhen === "no-residency"));
  }

  const regulatedSectors = ["Financial Services", "Healthcare", "Government & Public Sector", "Insurance", "Telecommunications"];
  if (regulatedSectors.includes(industry)) {
    objections.push(...DATA_RESIDENCY_OBJECTIONS.filter(o => o.applicableWhen === "regulated-sector"));
  }

  return objections;
}
