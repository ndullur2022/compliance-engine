import { NextRequest, NextResponse } from "next/server";
import { analyzeCompliance, generateLocalizedContent } from "@/lib/claude";
import { getProductById } from "@/lib/products";
import { getRegulationsForProduct, getRegulationsForCountry, EU_REGULATIONS } from "@/lib/regulations";
import { getObjectionsForProduct, EU_RESIDENCY_PRODUCTS } from "@/lib/objections";

export async function POST(request: NextRequest) {
  try {
    const { productId, country, industry, language } = await request.json();

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

    const analysis = await analyzeCompliance(
      product,
      country,
      industry || "General",
      applicableRegulations
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
    });
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    );
  }
}
