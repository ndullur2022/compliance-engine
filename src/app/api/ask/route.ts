import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { EMEA_FAQ_CATEGORIES } from "@/lib/emea-faq";
import { DATA_RESIDENCY_OBJECTIONS } from "@/lib/objections";
import { EU_REGULATIONS } from "@/lib/regulations";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildSourceContext(): string {
  const faqContext = EMEA_FAQ_CATEGORIES.map(cat =>
    cat.questions.map(q => `Q: ${q.question}\nA: ${q.answer}\nSources: ${q.sources?.join(", ") || "None"}`).join("\n\n")
  ).join("\n\n");

  const objectionContext = DATA_RESIDENCY_OBJECTIONS.map(obj =>
    `Objection: "${obj.customerSays}"\nReality: ${obj.reality}\nApproved response: ${obj.whatToSay}\nSources: ${obj.supportingLinks.map(l => l.url).join(", ")}`
  ).join("\n\n");

  const regulationContext = EU_REGULATIONS.slice(0, 8).map(r =>
    `${r.name} (${r.fullName}): ${r.description} | Enforcement: ${r.enforcementBody} | Max penalty: ${r.maxPenalty} | Source: ${r.sourceUrl}`
  ).join("\n");

  return `
--- EMEA FAQ KNOWLEDGE BASE ---
${faqContext}

--- OBJECTION HANDLING ---
${objectionContext}

--- REGULATIONS ---
${regulationContext}
`;
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string" || question.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a question (at least 5 characters)" },
        { status: 400 }
      );
    }

    const sourceContext = buildSourceContext();

    const prompt = `You are an internal compliance reference assistant for Twilio sales teams in EMEA. Answer the question below using ONLY the source material provided. Do not invent facts or make claims not supported by the sources.

CRITICAL RULES:
1. NEVER say "Twilio is GDPR compliant." The correct framing is: "Twilio enables businesses to adhere to GDPR requirements."
2. NEVER paraphrase legal instrument names (DPA, BCR, SCC, DPF) — use exact terminology.
3. NEVER generate novel compliance claims beyond what the source material states.
4. If the source material does not contain enough information to answer, say so clearly.
5. Always specify what Twilio provides vs. what the customer must configure.
6. Quote directly from sources when possible. Indicate which source you are drawing from by naming the source type and document (e.g., "According to Trust Center > ISO 27001 Certificate of Compliance..." or "Per Legal > Data Processing Addendum...").

SOURCE MATERIAL:
${sourceContext}

QUESTION: ${question}

Respond in this JSON format:
{
  "answer": "Your answer in plain language. Quote source material where possible. Be specific about what Twilio provides vs. customer responsibility.",
  "sources": ["url1", "url2"],
  "confidence": "high" | "medium" | "low",
  "caveat": "Any important qualification or limitation, or null if none"
}

If the question cannot be answered from the source material, return:
{
  "answer": "This question is not covered by the approved source material. Please consult the privacy team (Elizabeth Holiday) or legal for guidance.",
  "sources": [],
  "confidence": "low",
  "caveat": "Answer not available from pre-approved sources"
}`;

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to generate answer" },
        { status: 500 }
      );
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Ask error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process question" },
      { status: 500 }
    );
  }
}
