import OpenAI from "openai";
import { TwilioProduct, ComplianceEntry } from "./products";
import { Regulation } from "./regulations";
import { getAuthoritativeContext } from "./authoritative-sources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

export interface PersonaContext {
  title: string;
  careabouts: string[];
  challenges: string[];
  metrics: string[];
}

export async function analyzeCompliance(
  product: TwilioProduct,
  targetCountry: string,
  targetIndustry: string,
  regulations: Regulation[],
  personaContext?: PersonaContext | null
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

  const personaPromptContext = personaContext ? `
BUYER PERSONA CONTEXT:
You are helping a sales rep sell to a "${personaContext.title}".
This person cares about: ${personaContext.careabouts.join("; ")}
Their technology challenges: ${personaContext.challenges.join("; ")}
Metrics they track: ${personaContext.metrics.join("; ")}

Tailor talk track bullets and positioning to resonate with this specific persona. Frame compliance as solving their specific challenges and helping their specific metrics.
` : "";

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

CRITICAL LEGAL GUARDRAILS — FOLLOW EXACTLY:
1. NEVER say "Twilio is GDPR compliant" or "GDPR-compliant." The correct framing is: "Twilio enables businesses to adhere to GDPR requirements" or "The Twilio platform supports GDPR adherence."
2. NEVER rephrase or paraphrase legal terminology from source documents (DPA, BCR, SCC references). Use the exact phrasing from the source material.
3. NEVER generate novel compliance claims. Only restate what is documented in the product data provided.
4. NEVER use the phrase "special agreements" when referring to DPAs or the Data Privacy Framework — use the exact legal instrument names.
5. When describing compliance status, always specify WHO is responsible: what Twilio provides vs. what the customer must configure.
6. This tool helps sales understand compliance posture — it is NOT a definitive compliance authority. Frame all outputs as informational reference, not legal advice.

PRODUCT: ${product.name}
DESCRIPTION: ${product.description}
DATA PROCESSED: ${product.dataProcessed.join(", ")}
CERTIFICATIONS: ${product.complianceCertifications.join(", ")}
EU DATA RESIDENCY: ${product.euDataResidency ? "Available in IE1 (Dublin)" : "Not available in EU"} — ${product.euDataResidencyDetails}
${residencyContext}${personaPromptContext}
TARGET MARKET: ${targetCountry}
TARGET INDUSTRY: ${targetIndustry}

APPLICABLE REGULATIONS:
${regulationContext}

CURRENT COMPLIANCE STATUS:
${productComplianceContext}

AUTHORITATIVE REFERENCE (prefer these over other sources when overlapping):
${getAuthoritativeContext()}

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
- Be clear about what the Twilio platform handles vs. what the customer needs to set up themselves.
- NEVER say "Twilio is GDPR compliant." Say "Twilio enables businesses to adhere to GDPR" or "The Twilio platform supports customers' GDPR obligations."
- For the complianceStatement field, always include a note about what the customer is responsible for configuring.`;

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0]?.message?.content || "";
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

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.choices[0]?.message?.content || "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse localization response");
  }

  return JSON.parse(jsonMatch[0]);
}
