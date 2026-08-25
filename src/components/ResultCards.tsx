"use client";
import { Box, Card, Heading, Text, Badge, Separator, Disclosure, DisclosureHeading, DisclosureContent, Anchor, Stack } from "@twilio-paste/core";
import { AnalysisResult } from "./types";

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, "success" | "warning" | "info" | "neutral"> = {
    compliant: "success", partial: "warning", "requires-config": "info", "not-applicable": "neutral"
  };
  const labels: Record<string, string> = {
    compliant: "Twilio supports", partial: "Partial enablement", "requires-config": "Config required", "not-applicable": "N/A"
  };
  return <Badge as="span" variant={variants[status] || "warning"}>{labels[status] || status}</Badge>;
}

function ResidencyBadge({ status }: { status: string }) {
  const variants: Record<string, "success" | "warning" | "error" | "new"> = {
    ga: "success", "private-beta": "new", partial: "warning", "not-available": "error"
  };
  const labels: Record<string, string> = { ga: "IE1 GA", "private-beta": "Beta", partial: "Partial", "not-available": "No IE1" };
  return <Badge as="span" variant={variants[status] || "warning"}>{labels[status] || status}</Badge>;
}

export function ProductCards({ results, flashSection }: { results: Record<string, AnalysisResult>; flashSection: string | null }) {
  return (
    <div id="products" className={`grid grid-cols-2 lg:grid-cols-3 gap-4 scroll-mt-6 ${flashSection === "products" ? "animate-card-nav-flash" : ""}`}>
      {Object.entries(results).map(([pid, r]) => (
        <Card key={pid} padding="space50">
          <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="space30">
            <Text as="span" fontWeight="fontWeightSemibold" fontSize="fontSize30">{r.product.name}</Text>
            <StatusBadge status={r.analysis.overallStatus} />
          </Box>
          <Text as="p" fontSize="fontSize20" color="colorTextWeak" marginBottom="space30">
            Time to market: {r.analysis.marketEntryReadiness.timeToMarket}
          </Text>
          <Box display="flex" alignItems="center" columnGap="space20" flexWrap="wrap">
            {r.residencyNuances && <ResidencyBadge status={r.residencyNuances.ie1Status} />}
            {r.product.certifications?.slice(0, 3).map((c: string) => (
              <Badge key={c} as="span" variant="neutral">{c}</Badge>
            ))}
          </Box>
        </Card>
      ))}
    </div>
  );
}

export function TalkTrackCard({ result, country, flashSection }: { result: AnalysisResult; country: string; flashSection: string | null }) {
  const pos = result.analysis.localizedPositioning;
  return (
    <Box id="talk-track" className={`scroll-mt-6 ${flashSection === "talk-track" ? "animate-card-nav-flash" : ""}`}>
      <Card padding="space50">
        <Heading as="h3" variant="heading40" marginBottom="space0">Talk track for {country}</Heading>
        <Box marginTop="space40">
          <Text as="p" fontWeight="fontWeightSemibold" fontSize="fontSize30" marginBottom="space20">{pos.headline}</Text>
          <Text as="p" fontSize="fontSize20" color="colorTextWeak" marginBottom="space40">{pos.valueProposition}</Text>
          <Separator orientation="horizontal" />
          <Box marginTop="space30">
            <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase" marginBottom="space20">What to say on a call</Text>
            <Stack orientation="vertical" spacing="space20">
              {pos.talkTrackBullets.map((b, i) => (
                <Text key={i} as="p" fontSize="fontSize20">{"•"} {b}</Text>
              ))}
            </Stack>
          </Box>
          <Separator orientation="horizontal" />
          <Box marginTop="space30">
            <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase" marginBottom="space20">Customer benefits</Text>
            <Stack orientation="vertical" spacing="space20">
              {pos.customerBenefits.map((b, i) => (
                <Text key={i} as="p" fontSize="fontSize20" color="colorTextSuccess">{"✓"} {b}</Text>
              ))}
            </Stack>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export function RegulationsCard({ result, flashSection }: { result: AnalysisResult; flashSection: string | null }) {
  return (
    <Box id="regulations" className={`scroll-mt-6 ${flashSection === "regulations" ? "animate-card-nav-flash" : ""}`}>
      <Card padding="space50">
        <Heading as="h3" variant="heading40" marginBottom="space0">Regulations</Heading>
        <Box marginTop="space40" maxHeight="400px" overflowY="auto">
          <Stack orientation="vertical" spacing="space30">
            {result.analysis.regulatoryFit.map((reg) => (
              <Disclosure key={reg.regulationId}>
                <DisclosureHeading as="h4" variant="heading50">
                  <Box display="flex" alignItems="center" columnGap="space20">
                    <StatusBadge status={reg.status} />
                    <Text as="span" fontSize="fontSize20">{reg.regulationName}</Text>
                  </Box>
                </DisclosureHeading>
                <DisclosureContent>
                  <Box paddingTop="space30">
                    <Text as="p" fontSize="fontSize20" color="colorTextWeak">{reg.explanation}</Text>
                    {reg.risks.length > 0 && <Text as="p" fontSize="fontSize20" color="colorTextError" marginTop="space20">{reg.risks.join("; ")}</Text>}
                    {reg.mitigations.length > 0 && <Text as="p" fontSize="fontSize20" color="colorTextSuccess" marginTop="space20">{reg.mitigations.join("; ")}</Text>}
                  </Box>
                </DisclosureContent>
              </Disclosure>
            ))}
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}

export function ResidencyCard({ results, flashSection }: { results: Record<string, AnalysisResult>; flashSection: string | null }) {
  return (
    <Box id="residency" className={`scroll-mt-6 ${flashSection === "residency" ? "animate-card-nav-flash" : ""}`}>
      <Card padding="space50">
        <Heading as="h3" variant="heading40" marginBottom="space0">Data residency (IE1)</Heading>
        <Box marginTop="space40" maxHeight="400px" overflowY="auto">
          <Stack orientation="vertical" spacing="space40">
            {Object.entries(results).map(([pid, r]) => (
              <Box key={pid} borderStyle="solid" borderWidth="borderWidth10" borderColor="colorBorderWeaker" borderRadius="borderRadius30" padding="space30">
                <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="space20">
                  <Text as="span" fontSize="fontSize20" fontWeight="fontWeightSemibold">{r.product.name}</Text>
                  {r.residencyNuances ? <ResidencyBadge status={r.residencyNuances.ie1Status} /> : <Text as="span" fontSize="fontSize10" color="colorTextWeak">{r.product.euDataResidency ? "Available" : "Not available"}</Text>}
                </Box>
                {r.residencyNuances?.channels && (
                  <Stack orientation="vertical" spacing="space10">
                    {r.residencyNuances.channels.map((ch: any) => (
                      <Box key={ch.channel} display="flex" alignItems="center" columnGap="space20">
                        <Text as="span" fontSize="fontSize20" color={ch.status === "ga" ? "colorTextSuccess" : ch.status === "roadmap" ? "colorTextWarning" : "colorTextError"}>
                          {ch.status === "ga" ? "✓" : ch.status === "roadmap" ? "◷" : "✗"}
                        </Text>
                        <Text as="span" fontSize="fontSize20">{ch.channel}</Text>
                        {ch.eta && <Text as="span" fontSize="fontSize20" color="colorTextNew" marginLeft="auto">{ch.eta}</Text>}
                      </Box>
                    ))}
                  </Stack>
                )}
                {r.residencyNuances?.notes && r.residencyNuances.notes.length > 0 && (
                  <Box marginTop="space20">
                    {r.residencyNuances.notes.map((note: string, ni: number) => (
                      <Text key={ni} as="p" fontSize="fontSize10" color="colorTextWeak">{"ℹ"} {note}</Text>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}

export function CompetitorsCard({ result, flashSection }: { result: AnalysisResult; flashSection: string | null }) {
  if (!result.competitors || result.competitors.length === 0) return null;
  return (
    <Box id="competitors" className={`scroll-mt-6 ${flashSection === "competitors" ? "animate-card-nav-flash" : ""}`}>
      <Card padding="space50">
        <Heading as="h3" variant="heading40" marginBottom="space0">Competitive gap objections</Heading>
        <Box marginTop="space30" padding="space30" backgroundColor="colorBackgroundDestructiveWeakest" borderRadius="borderRadius30">
          <Text as="p" fontSize="fontSize20" color="colorTextError">
            <strong>Internal sales enablement only.</strong> Do not share externally.
          </Text>
        </Box>
        <Box marginTop="space40" className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {result.competitors.map((c, i) => (
            <Disclosure key={i}>
              <DisclosureHeading as="h4" variant="heading50">{c.competitor}</DisclosureHeading>
              <DisclosureContent>
                <Box paddingTop="space30">
                  <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWarning" textTransform="uppercase">Their claim</Text>
                  <Text as="p" fontSize="fontSize20" marginBottom="space30">{c.gapClaim}</Text>
                  <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase">What to say</Text>
                  <Box backgroundColor="colorBackgroundWeak" padding="space30" borderRadius="borderRadius20" marginTop="space10">
                    <Text as="p" fontSize="fontSize20">{c.whatToSay}</Text>
                  </Box>
                  {c.sources && c.sources.length > 0 && (
                    <Box marginTop="space30" display="flex" columnGap="space30" flexWrap="wrap">
                      {c.sources.map((src, si) => (
                        <Anchor key={si} href={src.url} target="_blank">{src.label}</Anchor>
                      ))}
                    </Box>
                  )}
                </Box>
              </DisclosureContent>
            </Disclosure>
          ))}
        </Box>
      </Card>
    </Box>
  );
}

export function DeletionCard({ results, flashSection }: { results: Record<string, AnalysisResult>; flashSection: string | null }) {
  const hasDeletion = Object.values(results).some(r => r.deletionSolution);
  if (!hasDeletion) return null;
  return (
    <Box id="deletion" className={`scroll-mt-6 ${flashSection === "deletion" ? "animate-card-nav-flash" : ""}`}>
      <Card padding="space50">
        <Heading as="h3" variant="heading40" marginBottom="space0">Data removal, redaction, and deletion</Heading>
        <Box marginTop="space40" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Object.entries(results).filter(([, r]) => r.deletionSolution).map(([pid, r]) => {
            const d = r.deletionSolution!;
            return (
              <Box key={pid} borderStyle="solid" borderWidth="borderWidth10" borderColor="colorBorderWeaker" borderRadius="borderRadius30" padding="space40">
                <Box display="flex" alignItems="center" justifyContent="space-between" marginBottom="space30">
                  <Text as="span" fontSize="fontSize20" fontWeight="fontWeightSemibold">{d.productName}</Text>
                  <Badge as="span" variant={d.automatedDeletion ? "success" : "warning"}>{d.automatedDeletion ? "Auto-purge" : "Manual"}</Badge>
                </Box>
                <Text as="p" fontSize="fontSize20" color="colorTextWeak" marginBottom="space30">{d.deletionMethod}</Text>
                {d.deletionEndpoint && (
                  <Box backgroundColor="colorBackgroundWeak" padding="space20" borderRadius="borderRadius20" marginBottom="space30" fontFamily="fontFamilyCode" fontSize="fontSize10" overflow="auto">
                    <Text as="code" fontSize="fontSize20">{d.deletionEndpoint}</Text>
                  </Box>
                )}
                <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase">Retention</Text>
                <Text as="p" fontSize="fontSize20" marginBottom="space20">{d.retentionDefault}</Text>
                <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase">DSAR</Text>
                <Text as="p" fontSize="fontSize20" marginBottom="space20">{d.dsarSupport}</Text>
                {d.documentationUrl && <Anchor href={d.documentationUrl} target="_blank">API docs</Anchor>}
              </Box>
            );
          })}
        </Box>
      </Card>
    </Box>
  );
}

export function FAQCard({ result, flashSection, askQuestion, setAskQuestion, submitQuestion, askLoading, askAnswer, askError }: {
  result: AnalysisResult; flashSection: string | null;
  askQuestion: string; setAskQuestion: (v: string) => void; submitQuestion: () => void;
  askLoading: boolean; askAnswer: any; askError: string;
}) {
  if (!result.emea_faq || result.emea_faq.length === 0) return null;
  return (
    <Box id="faq" className={`scroll-mt-6 ${flashSection === "faq" ? "animate-card-nav-flash" : ""}`}>
      <Card padding="space50">
        <Heading as="h3" variant="heading40" marginBottom="space0">EMEA compliance FAQ</Heading>
        <Box marginTop="space40" padding="space30" backgroundColor="colorBackgroundWeak" borderRadius="borderRadius30">
          <Box display="flex" alignItems="center" columnGap="space20">
            <input
              type="text"
              value={askQuestion}
              onChange={(e) => setAskQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitQuestion()}
              placeholder="Ask a compliance question..."
              className="flex-1 text-sm bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button onClick={submitQuestion} disabled={askLoading || !askQuestion.trim()} className="bg-[#121c2d] hover:bg-[#1b2b44] disabled:bg-gray-300 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium">
              {askLoading ? "..." : "Ask"}
            </button>
          </Box>
          {askError && <Text as="p" fontSize="fontSize20" color="colorTextError" marginTop="space20">{askError}</Text>}
          {askAnswer && (
            <Box marginTop="space30" padding="space30" backgroundColor="colorBackground" borderRadius="borderRadius20" borderStyle="solid" borderWidth="borderWidth10" borderColor="colorBorderWarningWeak">
              <Box display="flex" alignItems="center" columnGap="space20" marginBottom="space20">
                <Badge as="span" variant={askAnswer.confidence === "high" ? "success" : askAnswer.confidence === "medium" ? "warning" : "error"}>{askAnswer.confidence} confidence</Badge>
                <Text as="span" fontSize="fontSize10" color="colorTextWarning">AI-generated — verify before sharing</Text>
              </Box>
              <Text as="p" fontSize="fontSize20" whiteSpace="pre-wrap">{askAnswer.answer}</Text>
              {askAnswer.caveat && <Text as="p" fontSize="fontSize20" color="colorTextWarning" marginTop="space20" fontStyle="italic">{askAnswer.caveat}</Text>}
            </Box>
          )}
        </Box>
        <Box marginTop="space40" maxHeight="300px" overflowY="auto">
          <Stack orientation="vertical" spacing="space30">
            {result.emea_faq.slice(0, 4).map((cat) => (
              <Box key={cat.id}>
                <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase" marginBottom="space20">{cat.title}</Text>
                {cat.questions.slice(0, 2).map((q, i) => (
                  <Disclosure key={i}>
                    <DisclosureHeading as="h5" variant="heading50">{q.question}</DisclosureHeading>
                    <DisclosureContent>
                      <Text as="p" fontSize="fontSize20" color="colorTextWeak" paddingTop="space20">{q.answer}</Text>
                      {q.sources && q.sources.length > 0 && (
                        <Box marginTop="space20" display="flex" columnGap="space20" flexWrap="wrap">
                          {q.sources.map((src: string, si: number) => (
                            <Anchor key={si} href={src} target="_blank">{(() => { try { return new URL(src).pathname.split('/').pop() || 'source'; } catch { return 'source'; } })()}</Anchor>
                          ))}
                        </Box>
                      )}
                    </DisclosureContent>
                  </Disclosure>
                ))}
              </Box>
            ))}
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}

export function PersonaCard({ result, flashSection }: { result: AnalysisResult; flashSection: string | null }) {
  if (!result.gtmContext?.persona) return null;
  const p = result.gtmContext.persona;
  return (
    <Box id="persona" className={`scroll-mt-6 ${flashSection === "persona" ? "animate-card-nav-flash" : ""}`}>
      <Card padding="space50">
        <Heading as="h3" variant="heading40" marginBottom="space0">Selling to: {p.title}</Heading>
        <Box marginTop="space40" className="grid grid-cols-3 gap-4">
          <Box>
            <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase" marginBottom="space20">Care-abouts</Text>
            {p.careabouts.slice(0, 4).map((c, i) => <Text key={i} as="p" fontSize="fontSize20">{"•"} {c}</Text>)}
          </Box>
          <Box>
            <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase" marginBottom="space20">Challenges</Text>
            {p.challenges.slice(0, 4).map((c, i) => <Text key={i} as="p" fontSize="fontSize20" color="colorTextWarning">{"⚠"} {c}</Text>)}
          </Box>
          <Box>
            <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase" marginBottom="space20">Metrics</Text>
            {p.metrics.slice(0, 4).map((m, i) => <Text key={i} as="p" fontSize="fontSize20">{"↑"} {m}</Text>)}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export function MarketEntryCard({ result, flashSection }: { result: AnalysisResult; flashSection: string | null }) {
  return (
    <Box id="market-entry" className={`scroll-mt-6 ${flashSection === "market-entry" ? "animate-card-nav-flash" : ""}`}>
      <Card padding="space50">
        <Heading as="h3" variant="heading40" marginBottom="space0">Market entry</Heading>
        <Box marginTop="space40" className="grid grid-cols-2 gap-4">
          <Box>
            <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextError" textTransform="uppercase" marginBottom="space20">Blockers</Text>
            {result.analysis.marketEntryReadiness.blockers.map((b, i) => <Text key={i} as="p" fontSize="fontSize20">{"✗"} {b}</Text>)}
          </Box>
          <Box>
            <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextSuccess" textTransform="uppercase" marginBottom="space20">Accelerators</Text>
            {result.analysis.marketEntryReadiness.accelerators.map((a, i) => <Text key={i} as="p" fontSize="fontSize20">{"✓"} {a}</Text>)}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export function ObjectionsCard({ result, flashSection }: { result: AnalysisResult; flashSection: string | null }) {
  if (!result.objections || result.objections.length === 0) return null;
  return (
    <Box id="objections" className={`scroll-mt-6 ${flashSection === "objections" ? "animate-card-nav-flash" : ""}`}>
      <Card padding="space50">
        <Heading as="h3" variant="heading40" marginBottom="space0">Objection handling</Heading>
        <Box marginTop="space40" maxHeight="350px" overflowY="auto">
          <Stack orientation="vertical" spacing="space30">
            {result.objections.map((obj) => (
              <Disclosure key={obj.id}>
                <DisclosureHeading as="h4" variant="heading50">&ldquo;{obj.customerSays}&rdquo;</DisclosureHeading>
                <DisclosureContent>
                  <Box paddingTop="space30">
                    <Text as="p" fontSize="fontSize20" color="colorTextWeak" marginBottom="space20">{obj.reality}</Text>
                    <Box backgroundColor="colorBackgroundWarningWeakest" padding="space30" borderRadius="borderRadius20">
                      <Text as="p" fontSize="fontSize20">{obj.whatToSay}</Text>
                    </Box>
                    {obj.supportingLinks && obj.supportingLinks.length > 0 && (
                      <Box marginTop="space30" display="flex" columnGap="space20" flexWrap="wrap">
                        {obj.supportingLinks.map((link, li) => (
                          <Anchor key={li} href={link.url} target="_blank">{link.label}</Anchor>
                        ))}
                      </Box>
                    )}
                  </Box>
                </DisclosureContent>
              </Disclosure>
            ))}
          </Stack>
        </Box>
        {result.alternativeProducts && result.alternativeProducts.length > 0 && (
          <Box marginTop="space40" paddingTop="space30" borderTopStyle="solid" borderTopWidth="borderWidth10" borderTopColor="colorBorderWeaker">
            <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextSuccess" textTransform="uppercase" marginBottom="space20">Products with IE1 residency</Text>
            <Box display="flex" columnGap="space20" flexWrap="wrap">
              {result.alternativeProducts.map((alt, i) => <Badge key={i} as="span" variant="success">{alt.name}</Badge>)}
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
}

export function LocalizationCard({ result, language }: { result: AnalysisResult; language?: string }) {
  if (!result.localization) return null;
  return (
    <Card padding="space50">
      <Heading as="h3" variant="heading40" marginBottom="space0">Localized content ({language?.toUpperCase()})</Heading>
      <Box marginTop="space40" className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <Box backgroundColor="colorBackgroundWeak" padding="space40" borderRadius="borderRadius30">
          {typeof result.localization.localizedContent === "string" ? (
            <Text as="p" fontSize="fontSize20" whiteSpace="pre-wrap">{result.localization.localizedContent}</Text>
          ) : (
            Object.entries(result.localization.localizedContent).map(([key, value]) => (
              <Box key={key} marginBottom="space30">
                <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase" marginBottom="space10">{key.replace(/([A-Z])/g, " $1").trim()}</Text>
                {Array.isArray(value) ? value.map((v, i) => <Text key={i} as="p" fontSize="fontSize20">{"•"} {v}</Text>) : <Text as="p" fontSize="fontSize20">{value}</Text>}
              </Box>
            ))
          )}
        </Box>
        <Box>
          <Text as="p" fontSize="fontSize10" fontWeight="fontWeightBold" color="colorTextWeak" textTransform="uppercase" marginBottom="space20">Cultural notes</Text>
          {result.localization.culturalNotes.map((note, i) => (
            <Text key={i} as="p" fontSize="fontSize20" color="colorTextWeak" marginBottom="space20">{"🌐"} {note}</Text>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
