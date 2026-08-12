import productCatalog from "@/data/product_catalog.json";
import industryMap from "@/data/industry_map.json";
import buyerPersonas from "@/data/buyer_personas.json";
import useCases from "@/data/use_cases.json";
import valuePools from "@/data/value_pools.json";
// Customer stories now sourced from emea-customer-stories.ts (twilio.com/customers EMEA)
import kpiMetrics from "@/data/kpi_metrics.json";
import northStars from "@/data/north_stars.json";

export interface ProductCatalogEntry {
  category: string;
  description: string;
  subcategories: {
    subcategory: string;
    description: string;
    products: {
      product: string;
      description: string;
      capabilities: string[];
      channels: string[];
    }[];
  }[];
}

export interface IndustrySegment {
  segment: string;
  code: string;
  notes?: string;
  verticals: {
    name: string;
    subverticals: string[];
  }[];
  story_examples: string[];
}

export interface BuyerPersona {
  persona_id: string;
  title: string;
  tier: "c-suite" | "lob" | "practitioners";
  color: string;
  description: string;
  major_careabouts: string[];
  core_responsibilities: string[];
  emerging_responsibilities: string[];
  key_metrics: string[];
  macro_challenges: string[];
  technology_challenges: string[];
  strategic_considerations: string[];
}

export interface UseCase {
  valuePool: string;
  businessGoal: string;
  category: string[];
  name: string;
  originalName: string;
  description: string;
  rationale: string;
  products: string[];
  kpis: string[];
}

export interface ValuePool {
  id: string;
  icon: string;
  desc: string;
}

export interface CustomerStory {
  story_id: string;
  customer: string;
  vertical: string;
  subvertical: string;
  region: string;
  link: string;
  KPIs: Record<string, string>;
  business_outcomes: string[];
  summary: string[];
  challenge: { title: string; description: string };
  solution: { title: string; description: string };
  outcome: { title: string; description: string };
  products_used: string[];
  use_cases: string[];
}

export const GTM_PRODUCT_CATALOG = productCatalog as ProductCatalogEntry[];
export const GTM_INDUSTRY_MAP = industryMap as { meta: any; segments: IndustrySegment[] };
export const GTM_BUYER_PERSONAS = (buyerPersonas as any).buyer_personas as BuyerPersona[];
export const GTM_USE_CASES = useCases as UseCase[];
export const GTM_VALUE_POOLS = valuePools as ValuePool[];
export const GTM_CUSTOMER_STORIES = [] as CustomerStory[];
export const GTM_KPI_METRICS = (kpiMetrics as any).metrics as Record<string, "up" | "down">;
export const GTM_NORTH_STARS = (northStars as any).northStars as Record<string, { metric: string; dir: string }>;

export function getIndustryVerticals(): { segment: string; code: string; verticals: string[] }[] {
  return GTM_INDUSTRY_MAP.segments.map(s => ({
    segment: s.segment,
    code: s.code,
    verticals: s.verticals.map(v => v.name),
  }));
}

export function getSubverticals(segment: string, vertical: string): string[] {
  const seg = GTM_INDUSTRY_MAP.segments.find(s => s.segment === segment);
  if (!seg) return [];
  const vert = seg.verticals.find(v => v.name === vertical);
  return vert?.subverticals || [];
}

export function getPersonasByTier(tier?: string): BuyerPersona[] {
  if (!tier) return GTM_BUYER_PERSONAS;
  return GTM_BUYER_PERSONAS.filter(p => p.tier === tier);
}

export function getPersonaById(id: string): BuyerPersona | undefined {
  return GTM_BUYER_PERSONAS.find(p => p.persona_id === id);
}

export function getUseCasesForProduct(productName: string): UseCase[] {
  const normalized = productName.toLowerCase();
  return GTM_USE_CASES.filter(uc =>
    uc.products.some(p => p.toLowerCase().includes(normalized) || normalized.includes(p.toLowerCase()))
  );
}

export function getUseCasesForValuePool(poolId: string): UseCase[] {
  return GTM_USE_CASES.filter(uc => uc.valuePool === poolId);
}

export function getCustomerStoriesForVertical(vertical: string): CustomerStory[] {
  return GTM_CUSTOMER_STORIES.filter(s =>
    s.vertical.toLowerCase() === vertical.toLowerCase() ||
    s.subvertical.toLowerCase() === vertical.toLowerCase()
  );
}

export function getCustomerStoriesForProduct(productName: string): CustomerStory[] {
  const normalized = productName.toLowerCase();
  return GTM_CUSTOMER_STORIES.filter(s =>
    s.products_used.some(p => p.toLowerCase().includes(normalized) || normalized.includes(p.toLowerCase()))
  );
}

export function getEMEACustomerStories(): CustomerStory[] {
  return GTM_CUSTOMER_STORIES.filter(s => s.region === "EMEA");
}

export function getRelevantStories(productName: string, vertical: string): CustomerStory[] {
  const byProduct = getCustomerStoriesForProduct(productName);
  const byVertical = getCustomerStoriesForVertical(vertical);

  const combined = new Map<string, CustomerStory>();
  [...byProduct, ...byVertical].forEach(s => combined.set(s.story_id, s));
  return Array.from(combined.values());
}
