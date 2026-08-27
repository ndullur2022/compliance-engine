"use client";

import { useState, useEffect } from "react";
import { Theme } from "@twilio-paste/core/theme";
import { Box, Card, Heading, Text, Button, Badge, Separator, Stack, Anchor } from "@twilio-paste/core";
import { PasteProvider } from "../components/PasteProvider";
import { USE_CASE_CATEGORIES, USE_CASES, PRODUCTS, COUNTRIES, INDUSTRY_SEGMENTS, BUYER_PERSONAS, NAV_SECTIONS } from "../components/data";
import { AnalysisResult } from "../components/types";
import { ProductCards, RegulationsCard, ResidencyCard, CompetitorsCard, DeletionCard, FAQCard, PersonaCard, ObjectionsCard } from "../components/ResultCards";

export default function Home() {
  const [selectionMode, setSelectionMode] = useState<"useCase" | "products">("useCase");
  const [useCaseCategory, setUseCaseCategory] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [segment, setSegment] = useState("");
  const [persona, setPersona] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, AnalysisResult>>({});
  const [error, setError] = useState("");
  const [askQuestion, setAskQuestion] = useState("");
  const [askLoading, setAskLoading] = useState(false);
  const [askAnswer, setAskAnswer] = useState<any>(null);
  const [askError, setAskError] = useState("");
  const [activeSection, setActiveSection] = useState("products");
  const [flashSection, setFlashSection] = useState<string | null>(null);

  function navigateToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (alreadyInView) {
      setFlashSection(id);
      window.setTimeout(() => setFlashSection((current) => (current === id ? null : current)), 2000);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    NAV_SECTIONS.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [results]);

  const filteredUseCases = useCaseCategory ? USE_CASES.filter(uc => uc.category === useCaseCategory) : USE_CASES;
  const activeUseCase = USE_CASES.find(uc => uc.id === selectedUseCase);
  const selectedCountry = COUNTRIES.find(c => c.code === country);
  const activeProducts = selectionMode === "useCase" ? (activeUseCase?.products || []) : selectedProducts;

  function switchMode(mode: "useCase" | "products") {
    setSelectionMode(mode);
    setResults({});
    if (mode === "useCase") setSelectedProducts([]);
    else { setSelectedUseCase(""); setUseCaseCategory(""); }
  }

  async function runAnalysis() {
    if (!country || activeProducts.length === 0) return;
    if (selectionMode === "useCase" && !selectedUseCase) return;
    setLoading(true); setError(""); setResults({});
    try {
      const analyses = await Promise.all(
        activeProducts.map(async (productId) => {
          const res = await fetch("/api/analyze", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, country, industry: segment || "General", vertical: segment || "", persona, language: selectedCountry?.language !== "en" ? selectedCountry?.language : "en" }),
          });
          if (!res.ok) return null;
          return { productId, data: await res.json() };
        })
      );
      const resultMap: Record<string, AnalysisResult> = {};
      analyses.filter(Boolean).forEach((a: any) => { resultMap[a.productId] = a.data; });
      setResults(resultMap);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setLoading(false); }
  }

  async function submitQuestion() {
    if (!askQuestion.trim() || askLoading) return;
    setAskLoading(true); setAskError(""); setAskAnswer(null);
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: askQuestion.trim() }) });
      if (!res.ok) { setAskError("Failed to get answer"); return; }
      setAskAnswer(await res.json());
    } catch (err: unknown) { setAskError(err instanceof Error ? err.message : "Something went wrong"); }
    finally { setAskLoading(false); }
  }

  const hasResults = Object.keys(results).length > 0;
  const firstResult = hasResults ? Object.values(results)[0] : null;

  return (
    <PasteProvider>
      <Box minHeight="100vh" backgroundColor="colorBackgroundBody">
        {/* Header */}
        <Box backgroundColor="colorBackgroundBodyInverse" paddingY="space50" paddingX="space70">
          <Box maxWidth="1400px" marginX="auto" display="flex" alignItems="center" columnGap="space40">
            <Box backgroundColor="colorBackgroundBrandHighlightWeakest" padding="space30" borderRadius="borderRadius30">
              <Text as="span" fontSize="fontSize40" fontWeight="fontWeightBold" color="colorTextBrandHighlight">⬡</Text>
            </Box>
            <Box>
              <Heading as="h1" variant="heading30" marginBottom="space0">
                <Text as="span" color="colorTextInverse">EMEA Readiness Engine</Text>
              </Heading>
              <Text as="p" fontSize="fontSize20" color="colorTextInverseWeak">Internal reference tool for sales — not a compliance authority</Text>
            </Box>
          </Box>
        </Box>

        {/* Main content */}
        <Box maxWidth="1400px" marginX="auto" paddingX="space70" paddingY="space60">
          {/* Disclaimer */}
          <Box backgroundColor="colorBackgroundWarningWeakest" borderStyle="solid" borderWidth="borderWidth10" borderColor="colorBorderWarningWeak" borderRadius="borderRadius30" padding="space40" marginBottom="space60">
            <Text as="p" fontSize="fontSize20" color="colorTextWarningStrong">
              <strong>FYI reference only.</strong> This tool provides informational guidance for sales conversations. It is not legal advice and does not constitute a compliance certification. Always verify claims with legal before sharing with customers.
            </Text>
          </Box>

          {/* Selection form */}
          <Box marginBottom="space60">
          <Card padding="space60">
            {/* Mode toggle */}
            <Box display="flex" alignItems="center" columnGap="space30" marginBottom="space50">
              <Text as="span" fontSize="fontSize20" fontWeight="fontWeightSemibold" color="colorTextWeak">Select by:</Text>
              <Button variant={selectionMode === "useCase" ? "primary" : "secondary"} size="small" onClick={() => switchMode("useCase")}>Use case</Button>
              <Button variant={selectionMode === "products" ? "primary" : "secondary"} size="small" onClick={() => switchMode("products")}>Products</Button>
            </Box>
            <Separator orientation="horizontal" />

            <Box marginTop="space50" className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto] gap-5 items-end">
              {/* Selection */}
              {selectionMode === "useCase" ? (
                <Box className="grid grid-cols-2 gap-4">
                  <Box>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Buying center</label>
                    <select value={useCaseCategory} onChange={(e) => { setUseCaseCategory(e.target.value); setSelectedUseCase(""); }} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">All buying centers</option>
                      {USE_CASE_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </Box>
                  <Box>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Use case</label>
                    <select value={selectedUseCase} onChange={(e) => setSelectedUseCase(e.target.value)} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Select use case...</option>
                      {filteredUseCases.map(uc => <option key={uc.id} value={uc.id}>{uc.name}</option>)}
                    </select>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Select product</label>
                  <select value={selectedProducts[0] || ""} onChange={(e) => setSelectedProducts(e.target.value ? [e.target.value] : [])} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select product...</option>
                    {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </Box>
              )}

              {/* Context */}
              <Box className="grid grid-cols-3 gap-4">
                <Box>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Country</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select...</option>
                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
                  </select>
                </Box>
                <Box>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Industry</label>
                  <select value={segment} onChange={(e) => setSegment(e.target.value)} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Any</option>
                    {INDUSTRY_SEGMENTS.map(s => <option key={s.segment} value={s.segment}>{s.segment}</option>)}
                  </select>
                </Box>
                <Box>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Persona</label>
                  <select value={persona} onChange={(e) => setPersona(e.target.value)} className="w-full rounded-lg border-gray-300 border px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {BUYER_PERSONAS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                  </select>
                </Box>
              </Box>

              {/* Analyze button */}
              <Button variant="primary" onClick={runAnalysis} disabled={!country || activeProducts.length === 0 || (selectionMode === "useCase" && !selectedUseCase) || loading} loading={loading}>
                Analyze
              </Button>
            </Box>

            {/* Auto-selected products */}
            {selectionMode === "useCase" && activeUseCase && (
              <Box marginTop="space40" paddingTop="space40" borderTopStyle="solid" borderTopWidth="borderWidth10" borderTopColor="colorBorderWeaker" display="flex" alignItems="center" columnGap="space20" flexWrap="wrap">
                <Text as="span" fontSize="fontSize20" color="colorTextWeak">Products needed:</Text>
                {activeProducts.map(pid => {
                  const p = PRODUCTS.find(x => x.id === pid);
                  return p ? <Badge key={pid} as="span" variant="neutral">{p.name}</Badge> : null;
                })}
                <Text as="span" fontSize="fontSize20" color="colorTextWeak" fontStyle="italic" marginLeft="auto">{activeUseCase.description}</Text>
              </Box>
            )}
          </Card>
          </Box>

          {error && (
            <Box backgroundColor="colorBackgroundDestructiveWeakest" borderStyle="solid" borderWidth="borderWidth10" borderColor="colorBorderDestructiveWeak" borderRadius="borderRadius30" padding="space40" marginBottom="space60">
              <Text as="p" fontSize="fontSize20" color="colorTextError">{error}</Text>
            </Box>
          )}

          {/* Results */}
          {hasResults && firstResult && (
            <Box>
              {/* Sticky horizontal nav */}
              <Box position="sticky" top="0px" zIndex="zIndex10" backgroundColor="colorBackgroundBody" paddingY="space30" marginBottom="space50" borderBottomStyle="solid" borderBottomWidth="borderWidth10" borderBottomColor="colorBorderWeaker">
                <Box display="flex" alignItems="center" columnGap="space20" flexWrap="wrap">
                  {NAV_SECTIONS.map(({ id, label }) => (
                    <Box key={id} as="a" href={`#${id}`} onClick={(e: any) => { e.preventDefault(); navigateToSection(id); }}
                      paddingX="space30" paddingY="space20" borderRadius="borderRadius20" cursor="pointer"
                      backgroundColor={activeSection === id ? "colorBackgroundPrimaryWeakest" : undefined}
                      className="transition-all hover:bg-gray-100"
                    >
                      <Text as="span" fontSize="fontSize20" color={activeSection === id ? "colorTextLink" : "colorTextWeak"} fontWeight={activeSection === id ? "fontWeightSemibold" : "fontWeightNormal"}>{label}</Text>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Full-width vertical sections */}
              <Stack orientation="vertical" spacing="space70">
                <ProductCards results={results} flashSection={flashSection} />

                <Box className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <RegulationsCard result={firstResult} flashSection={flashSection} />
                  <ResidencyCard results={results} flashSection={flashSection} />
                </Box>

                <Box className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <ObjectionsCard result={firstResult} flashSection={flashSection} />
                  <FAQCard result={firstResult} flashSection={flashSection} askQuestion={askQuestion} setAskQuestion={setAskQuestion} submitQuestion={submitQuestion} askLoading={askLoading} askAnswer={askAnswer} askError={askError} />
                </Box>

                <CompetitorsCard result={firstResult} flashSection={flashSection} />
                <DeletionCard results={results} flashSection={flashSection} />
                <PersonaCard result={firstResult} flashSection={flashSection} />
              </Stack>
            </Box>
          )}

          {/* Empty state */}
          {!hasResults && !loading && !error && (
            <Box textAlign="center" paddingY="space130">
              <Text as="p" fontSize="fontSize60" color="colorTextWeaker" marginBottom="space40">⬡</Text>
              <Heading as="h3" variant="heading30" marginBottom="space0">Choose a use case or products, then select a country</Heading>
              <Text as="p" fontSize="fontSize30" color="colorTextWeak" marginTop="space30">Start with a use case (auto-selects products) or pick individual products. This tool checks EMEA regulatory compliance for each and generates localized sales content.</Text>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box backgroundColor="colorBackgroundBodyInverse" paddingY="space40" paddingX="space70" marginTop="space90">
          <Text as="p" fontSize="fontSize20" color="colorTextInverseWeak" textAlign="center">
            EMEA Readiness Engine — Internal sales reference tool — Content is AI-generated from approved source documents — Not legal advice — Always verify with legal before sharing externally
          </Text>
        </Box>
      </Box>
    </PasteProvider>
  );
}
