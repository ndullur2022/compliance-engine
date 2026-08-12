import { NextRequest, NextResponse } from "next/server";
import { analyzeCompliance, generateLocalizedContent } from "@/lib/claude";
import { getProductById } from "@/lib/products";
import { getRegulationsForProduct, getRegulationsForCountry, EU_REGULATIONS } from "@/lib/regulations";
import { getObjectionsForProduct, EU_RESIDENCY_PRODUCTS } from "@/lib/objections";
import {
  getPersonaById,
  getUseCasesForProduct,
  getRelevantStories,
  getEMEACustomerStories,
  GTM_KPI_METRICS,
  GTM_NORTH_STARS,
} from "@/lib/gtm-data";

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
    const relevantStories = getRelevantStories(product.name, vertical || industry || "");
    const emea_stories = getEMEACustomerStories();

    const storiesForResponse = relevantStories.length > 0
      ? relevantStories.slice(0, 5)
      : emea_stories.slice(0, 3);

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
        customerStories: storiesForResponse.map(s => ({
          customer: s.customer,
          vertical: s.vertical,
          region: s.region,
          link: s.link,
          summary: s.summary[0],
          outcomes: s.business_outcomes,
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
