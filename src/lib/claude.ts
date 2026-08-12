import AnthropicBedrock from "@anthropic-ai/bedrock-sdk";
import { TwilioProduct, ComplianceEntry } from "./products";
import { Regulation } from "./regulations";

const anthropic = new AnthropicBedrock({
  awsRegion: process.env.AWS_REGION || "us-east-1",
});

export interface ComplianceAnalysis {
  overallStatus: "compliant" | "partial" | "requires-config";
  summary: string;
  regulatoryFit: {
    regulationId: string;
    regulationName: string;
    status: string;
    explanation: string;
    risks: string[];
    mitigations: string[];
  }[];
  localizedPositioning: {
    headline: string;
    valueProposition: string;
    complianceStatement: string;
    customerBenefits: string[];
    talkTrackBullets: string[];
  };
  marketEntryReadiness: {
    score: number;
    blockers: string[];
    accelerators: string[];
    timeToMarket: string;
  };
}

export async function analyzeCompliance(
  product: TwilioProduct,
  targetCountry: string,
  targetIndustry: string,
  regulations: Regulation[]
): Promise<ComplianceAnalysis> {
  const regulationContext = regulations.map(r => `
Regulation: ${r.name} (${r.fullName})
Region: ${r.region}${r.country ? ` / ${r.country}` : ""}
Category: ${r.category}
Enforcement: ${r.enforcementBody}
Max Penalty: ${r.maxPenalty}
Key Requirements: ${r.keyRequirements.join("; ")}
  `).join("\n");

  const productComplianceContext = Object.entries(product.complianceStatus)
    .map(([regId, entry]) => `
${regId}: Status=${entry.status}, Details=${entry.details}
Customer Actions: ${entry.customerActions?.join("; ") || "None specified"}
    `).join("\n");

  const residencyContext = !product.euDataResidency ? `
IMPORTANT CONTEXT — NO EU DATA RESIDENCY:
This product is NOT available in the IE1 (EU) Region. However, this does NOT mean it cannot be used by EU customers. GDPR does not require data residency — it requires adequate protection for transferred data. The Twilio platform provides this through:
- EU-US Data Privacy Framework
- Binding Corporate Rules (BCRs) approved by EU data protection authorities
- EU Standard Contractual Clauses (SCCs)
- ISO 27001, SOC 2, BSI C5 certifications
- Encryption in transit and at rest

When discussing compliance for this product, acknowledge the lack of EU residency but explain the legal transfer mechanisms that make it compliant for EU customers. Do NOT present lack of residency as a blocker unless the customer is in a regulated sector with specific in-region requirements.
` : "";

  const prompt = `You are an EU regulatory compliance analyst. You explain things clearly in plain language. Analyze whether a Twilio product can be used by EU customers in a specific market.

PRODUCT: ${product.name}
DESCRIPTION: ${product.description}
DATA PROCESSED: ${product.dataProcessed.join(", ")}
CERTIFICATIONS: ${product.complianceCertifications.join(", ")}
EU DATA RESIDENCY: ${product.euDataResidency ? "Available in IE1 (Dublin)" : "Not available in EU"} — ${product.euDataResidencyDetails}
${residencyContext}
TARGET MARKET: ${targetCountry}
TARGET INDUSTRY: ${targetIndustry}

APPLICABLE REGULATIONS:
${regulationContext}

CURRENT COMPLIANCE STATUS:
${productComplianceContext}

Based on this information, provide a compliance analysis. Return your response as valid JSON matching this structure exactly:
{
  "overallStatus": "compliant" | "partial" | "requires-config",
  "summary": "2-3 sentences explaining if this product is ready for this market. Use plain language a non-technical sales rep can understand.",
  "regulatoryFit": [
    {
      "regulationId": "regulation id",
      "regulationName": "regulation name",
      "status": "compliant/partial/requires-config/not-applicable",
      "explanation": "Plain-language explanation of what this means for the customer. Avoid legal jargon.",
      "risks": ["specific risk in plain language"],
      "mitigations": ["what to do about it, in plain language"]
    }
  ],
  "localizedPositioning": {
    "headline": "One short sentence a sales rep can use to open a conversation about compliance",
    "valueProposition": "2-3 plain sentences on why this product fits this regulated market",
    "complianceStatement": "A factual statement about compliance status, written for a customer-facing slide",
    "customerBenefits": ["benefit in plain language", "benefit 2", "benefit 3"],
    "talkTrackBullets": ["what to say in a sales call — conversational, not formal", "point 2", "point 3", "point 4"]
  },
  "marketEntryReadiness": {
    "score": 85,
    "blockers": ["what is stopping market entry, in plain language"],
    "accelerators": ["what makes entry faster, in plain language"],
    "timeToMarket": "How long it takes, e.g. '2-4 weeks' or '1-2 months'"
  }
}

WRITING STYLE — FOLLOW STRICTLY:
- Write at a 7th grade reading level. Use short sentences. Avoid jargon.
- If you must use a technical term (like "GDPR" or "DPA"), explain what it means in parentheses.
- Never use "simple," "easy," "just," or "simply." Never use possessive "Twilio's."
- Do not use words like "comprehensive," "robust," "leverage," "utilize," "facilitate," or "holistic."
- Write like you are explaining to a smart colleague who is new to EU regulations.
- Be specific and factual. Do not speculate beyond what the data shows.
- For talk track bullets, write how a person would actually speak in a meeting — conversational, direct.
- For the localized positioning, adapt tone for ${targetCountry} buyers (e.g., German buyers want proof and certifications; French buyers care about innovation and data sovereignty).
- Be clear about what the Twilio platform handles vs. what the customer needs to set up themselves.`;

  const response = await anthropic.messages.create({
    model: process.env.BEDROCK_MODEL_ID || "us.anthropic.claude-sonnet-4-20250514-v1:0",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse compliance analysis response");
  }

  return JSON.parse(jsonMatch[0]) as ComplianceAnalysis;
}

export async function generateLocalizedContent(
  product: TwilioProduct,
  targetCountry: string,
  targetLanguage: string,
  analysis: ComplianceAnalysis
): Promise<{ localizedContent: string; culturalNotes: string[] }> {
  const prompt = `You help translate and adapt product compliance content for European markets. Write clearly and keep it short.

PRODUCT: ${product.name}
TARGET COUNTRY: ${targetCountry}
TARGET LANGUAGE: ${targetLanguage}
WHAT THIS PRODUCT DOES FOR COMPLIANCE: ${analysis.summary}
WHY IT FITS THIS MARKET: ${analysis.localizedPositioning.valueProposition}

Write the following in ${targetLanguage}. Use short, clear sentences. Avoid long or complex words.

1. A short paragraph (3-4 sentences) explaining what this product does and how it helps with compliance in ${targetCountry}
2. Three bullet points — the top reasons a buyer in ${targetCountry} should trust this product
3. Two sentences on why the Twilio platform works well for ${targetCountry}

IMPORTANT: Return "localizedContent" as ONE SINGLE STRING containing all the content above (paragraph + bullets + closing statement), not as an object. Use line breaks to separate sections within the string.

Also provide 2-3 short notes (in English) explaining what you changed for the local market.

Return as JSON:
{
  "localizedContent": "All content in ${targetLanguage} as a single string with line breaks between sections",
  "culturalNotes": ["short note 1", "short note 2"]
}

Rules:
- Translate the meaning, not word-for-word
- Use local terms for regulations (e.g., "Datenschutz" in German, not "Data Protection")
- Match how business people actually write in ${targetCountry} (formal in Germany, slightly less formal in Netherlands)
- Name local regulators (BfDI, CNIL, ICO, etc.) instead of generic "authorities"
- Never use "Twilio's" — always "the Twilio [noun]"
- Keep sentences short. A 7th grader should be able to follow the logic.`;

  const response = await anthropic.messages.create({
    model: process.env.BEDROCK_MODEL_ID || "us.anthropic.claude-sonnet-4-20250514-v1:0",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse localization response");
  }

  return JSON.parse(jsonMatch[0]);
}
