import { NextRequest, NextResponse } from "next/server";
import { analyzeCompliance, generateLocalizedContent } from "@/lib/claude";
import { getProductById } from "@/lib/products";
import { getRegulationsForProduct, getRegulationsForCountry } from "@/lib/regulations";
import { getObjectionsForProduct, EU_RESIDENCY_PRODUCTS } from "@/lib/objections";
import { getPersonaById, getUseCasesForProduct, GTM_KPI_METRICS, GTM_NORTH_STARS } from "@/lib/gtm-data";
import { getStoriesForContext } from "@/lib/emea-customer-stories";
import { getResidencyForProduct, BILLING_DATA_NOTE } from "@/lib/data-residency-nuances";
import { getFAQForProduct } from "@/lib/emea-faq";

export async function POST(request: NextRequest) {
  try {
    const { productId, country, industry, language, persona, vertical } = await request.json();

    if (!productId || !country) {
      return NextResponse.json(
        { error: "Product and country are required" },
        { status: 400 }
      );
    }

    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const productRegulations = getRegulationsForProduct(productId);
    const countryRegulations = getRegulationsForCountry(country);
    const applicableRegulations = productRegulations.filter(r =>
      countryRegulations.some(cr => cr.id === r.id)
    );

    const selectedPersona = persona ? getPersonaById(persona) : null;
    const personaContext = selectedPersona ? {
      title: selectedPersona.title,
      careabouts: selectedPersona.major_careabouts,
      challenges: selectedPersona.technology_challenges,
      metrics: selectedPersona.key_metrics,
    } : null;

    const analysis = await analyzeCompliance(
      product,
      country,
      industry || "General",
      applicableRegulations,
      personaContext
    );

    let localization = null;
    if (language && language !== "en") {
      localization = await generateLocalizedContent(
        product,
        country,
        language,
        analysis
      );
    }

    const objections = getObjectionsForProduct(product.euDataResidency, industry || "General");
    const relevantUseCases = getUseCasesForProduct(product.name);
    const customerStories = getStoriesForContext(country, product.name, vertical || industry || "");
    const residencyNuances = getResidencyForProduct(productId);
    const relevantFAQ = getFAQForProduct(productId);

    return NextResponse.json({
      product: {
        id: product.id,
        name: product.name,
        category: product.category,
        certifications: product.complianceCertifications,
        euDataResidency: product.euDataResidency,
        euDataResidencyDetails: product.euDataResidencyDetails,
        complianceLinks: product.complianceLinks,
      },
      applicableRegulations: applicableRegulations.map(r => ({
        id: r.id,
        name: r.name,
        fullName: r.fullName,
        category: r.category,
        enforcementBody: r.enforcementBody,
        maxPenalty: r.maxPenalty,
        sourceUrl: r.sourceUrl,
      })),
      analysis,
      localization,
      objections,
      alternativeProducts: !product.euDataResidency ? EU_RESIDENCY_PRODUCTS : [],
      residencyNuances: residencyNuances ? {
        ie1Status: residencyNuances.ie1Status,
        ie1StatusLabel: residencyNuances.ie1StatusLabel,
        channels: residencyNuances.channels || null,
        speechProviders: residencyNuances.speechProviders || null,
        excludedFeatures: residencyNuances.excludedFeatures,
        notes: residencyNuances.notes,
        roadmap: residencyNuances.roadmap || null,
        billingNote: BILLING_DATA_NOTE,
      } : null,
      emea_faq: relevantFAQ.map(cat => ({
        id: cat.id,
        title: cat.title,
        questions: cat.questions
          .filter(q => !q.relatedProducts || q.relatedProducts.includes(productId))
          .map(q => ({ question: q.question, answer: q.answer, sources: q.sources })),
      })).filter(cat => cat.questions.length > 0),
      gtmContext: {
        persona: selectedPersona ? {
          id: selectedPersona.persona_id,
          title: selectedPersona.title,
          tier: selectedPersona.tier,
          careabouts: selectedPersona.major_careabouts,
          challenges: selectedPersona.technology_challenges,
          metrics: selectedPersona.key_metrics,
        } : null,
        useCases: relevantUseCases.slice(0, 8).map(uc => ({
          name: uc.name,
          description: uc.description,
          valuePool: uc.valuePool,
          businessGoal: uc.businessGoal,
          kpis: uc.kpis,
        })),
        customerStories: customerStories.map(s => ({
          company: s.company,
          country: s.country,
          vertical: s.vertical,
          url: s.url,
          summary: s.summary,
          products_used: s.products_used,
        })),
        kpiDirections: GTM_KPI_METRICS,
        northStars: GTM_NORTH_STARS,
      },
    });
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    );
  }
}
