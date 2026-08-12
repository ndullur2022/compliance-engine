export interface EMEACustomerStory {
  company: string;
  country: string;
  vertical: string;
  url: string;
  summary: string;
  products_used: string[];
  publishDate: string;
}

export const EMEA_CUSTOMER_STORIES: EMEACustomerStory[] = [
  // Italy
  { company: "LUISAVIAROMA", publishDate: "2026-05-15", country: "Italy", vertical: "Retail", url: "https://customers.twilio.com/en-us/luisaviaroma", summary: "Luxury fashion retailer using Twilio for personalized customer engagement across channels", products_used: ["Segment", "Messaging"] },
  { company: "Arduino", publishDate: "2025-08-20", country: "Italy", vertical: "Technology", url: "https://customers.twilio.com/en-us/arduino", summary: "Open-source electronics platform using Twilio for developer community communications", products_used: ["Messaging", "Verify"] },
  { company: "Nomasei", publishDate: "2025-04-10", country: "Italy", vertical: "Retail", url: "https://customers.twilio.com/en-us/nomasei", summary: "Luxury footwear brand using Twilio for direct-to-consumer engagement", products_used: ["Messaging"] },

  // Germany
  { company: "audibene", publishDate: "2026-03-12", country: "Germany", vertical: "Healthcare", url: "https://customers.twilio.com/en-us/audibene", summary: "Hearing care platform connecting customers with audiologists through personalized communications", products_used: ["Voice", "Messaging", "Flex"] },
  { company: "heycar", publishDate: "2025-11-05", country: "Germany", vertical: "Retail", url: "https://customers.twilio.com/en-us/heycar", summary: "Online used car marketplace using Twilio for buyer-seller communication", products_used: ["Messaging", "Voice"] },
  { company: "ChartMogul", publishDate: "2025-09-18", country: "Germany", vertical: "Technology", url: "https://customers.twilio.com/en-us/chartmogul", summary: "Subscription analytics platform using Twilio for customer notifications", products_used: ["Messaging", "SendGrid"] },
  { company: "AMBOSS", publishDate: "2025-07-22", country: "Germany", vertical: "Healthcare", url: "https://customers.twilio.com/en-us/amboss", summary: "Medical education platform using Twilio for user verification and engagement", products_used: ["Verify", "Messaging"] },
  { publishDate: "2025-06-01", company: "Taxfix", country: "Germany", vertical: "Financial Services", url: "https://customers.twilio.com/en-us/taxfix", summary: "Tax filing app using Twilio for secure user authentication and notifications", products_used: ["Verify", "Messaging"] },
  { publishDate: "2025-06-01", company: "DriveNow", country: "Germany", vertical: "Transportation", url: "https://customers.twilio.com/en-us/drivenow", summary: "Car-sharing service using Twilio for real-time driver communications", products_used: ["Messaging", "Verify"] },
  { publishDate: "2026-05-28", company: "Interhyp Group", country: "Germany", vertical: "Financial Services", url: "https://customers.twilio.com/en-us/interhyp", summary: "Mortgage broker using Twilio for advisor-client communications", products_used: ["Voice", "Messaging", "Flex"] },
  { publishDate: "2025-06-01", company: "Neticon", country: "Germany", vertical: "Technology", url: "https://customers.twilio.com/en-us/neticon", summary: "Performance marketing agency using Twilio for campaign communications", products_used: ["Messaging", "SendGrid"] },

  // United Kingdom
  { publishDate: "2026-06-20", company: "Sage", country: "United Kingdom", vertical: "Technology", url: "https://customers.twilio.com/en-us/sage-cuts-cost-per-conversion-by-over-30--with-twilio-segment", summary: "Accounting software company that cut cost per conversion by over 30% with Segment", products_used: ["Segment"] },
  { publishDate: "2026-04-08", company: "Fresha", country: "United Kingdom", vertical: "Retail", url: "https://customers.twilio.com/en-us/fresha", summary: "Beauty and wellness booking platform using Twilio for appointment communications", products_used: ["Messaging", "Voice"] },
  { publishDate: "2025-06-01", company: "Sykes Cottages", country: "United Kingdom", vertical: "Travel & Hospitality", url: "https://customers.twilio.com/en-us/sykes-cottages", summary: "Holiday rental platform using Twilio for guest and owner communications", products_used: ["Voice", "Messaging", "Flex"] },
  { publishDate: "2025-06-01", company: "Cazoo", country: "United Kingdom", vertical: "Retail", url: "https://customers.twilio.com/en-us/cazoo", summary: "Online car retailer using Twilio for customer journey communications", products_used: ["Messaging", "Voice"] },
  { publishDate: "2026-01-08", company: "ClearScore", country: "United Kingdom", vertical: "Financial Services", url: "https://customers.twilio.com/en-us/clearscore", summary: "Credit score platform using Twilio for secure identity verification", products_used: ["Verify", "Messaging"] },
  { publishDate: "2026-07-22", company: "PolyAI", country: "United Kingdom", vertical: "Technology", url: "https://customers.twilio.com/en-us/polyai", summary: "Voice AI company building conversational assistants on the Twilio platform", products_used: ["Voice", "Conversation Relay"] },
  { publishDate: "2026-06-05", company: "Octopus Energy Group", country: "United Kingdom", vertical: "Energy", url: "https://customers.twilio.com/en-us/octopus-energy-group", summary: "Energy supplier using Twilio for customer service and engagement at scale", products_used: ["Flex", "Voice", "Messaging"] },
  { publishDate: "2025-06-01", company: "cloudThing", country: "United Kingdom", vertical: "Technology", url: "https://customers.twilio.com/en-us/cloudthing", summary: "IoT platform using Twilio for device communications and alerts", products_used: ["Messaging", "Voice"] },
  { publishDate: "2025-06-01", company: "Artlogic", country: "United Kingdom", vertical: "Technology", url: "https://customers.twilio.com/en-us/artlogic", summary: "Art gallery software platform using Twilio for gallery-collector communications", products_used: ["Messaging", "SendGrid"] },
  { publishDate: "2025-06-01", company: "University of Warwick", country: "United Kingdom", vertical: "Education", url: "https://customers.twilio.com/en-us/university-of-warwick", summary: "University using Twilio for student engagement and emergency communications", products_used: ["Messaging", "Voice"] },
  { publishDate: "2025-06-01", company: "Oxfam", country: "United Kingdom", vertical: "Nonprofit", url: "https://customers.twilio.com/en-us/oxfam", summary: "International charity using Twilio for donor engagement and crisis communications", products_used: ["Messaging", "Voice"] },
  { publishDate: "2025-06-01", company: "You Can Book Me", country: "United Kingdom", vertical: "Technology", url: "https://customers.twilio.com/en-us/youcanbook-me", summary: "Scheduling platform using Twilio for booking confirmations and reminders", products_used: ["Messaging", "SendGrid"] },
  { publishDate: "2025-06-01", company: "Relay Technologies", country: "United Kingdom", vertical: "Technology", url: "https://customers.twilio.com/en-us/relay-technologies", summary: "On-demand logistics platform using Twilio for driver-customer communications", products_used: ["Messaging", "Voice"] },

  // France
  { publishDate: "2025-06-01", company: "Agorapulse", country: "France", vertical: "Technology", url: "https://customers.twilio.com/en-us/agorapulse", summary: "Social media management platform using Twilio for user notifications", products_used: ["Messaging", "SendGrid"] },
  { publishDate: "2025-06-01", company: "Cyclofix", country: "France", vertical: "On-Demand Services", url: "https://customers.twilio.com/en-us/cyclofix", summary: "On-demand bike repair service using Twilio for technician-customer coordination", products_used: ["Messaging", "Voice"] },
  { publishDate: "2026-02-14", company: "Sanofi", country: "France", vertical: "Healthcare", url: "https://customers.twilio.com/en-us/sanofi", summary: "Global pharmaceutical company using Twilio for patient engagement and HCP communications", products_used: ["Messaging", "Voice", "Segment"] },
  { publishDate: "2025-06-01", company: "MorningCroissant", country: "France", vertical: "Real Estate", url: "https://customers.twilio.com/en-us/morning-croissant", summary: "Furnished rental marketplace using Twilio for tenant-landlord communications", products_used: ["Messaging", "Voice"] },
  { publishDate: "2025-06-01", company: "GetQuanty", country: "France", vertical: "Technology", url: "https://customers.twilio.com/en-us/getquanty", summary: "B2B intent data platform using Twilio for lead engagement communications", products_used: ["Messaging", "SendGrid"] },
  { publishDate: "2025-06-01", company: "Multimedium", country: "France", vertical: "Technology", url: "https://customers.twilio.com/en-us/multimedium", summary: "Digital agency using Twilio to build communication solutions for clients", products_used: ["Messaging", "Voice"] },

  // Netherlands
  { publishDate: "2025-06-01", company: "PharmaPets", country: "Netherlands", vertical: "Healthcare", url: "https://customers.twilio.com/en-us/pharmapets", summary: "Online pet pharmacy using Twilio for order notifications and customer support", products_used: ["Messaging"] },
  { publishDate: "2025-06-01", company: "Vista", country: "Netherlands", vertical: "Technology", url: "https://customers.twilio.com/en-us/vista", summary: "Design and marketing platform using Twilio for customer communications at scale", products_used: ["Messaging", "SendGrid", "Segment"] },
  { publishDate: "2025-12-10", company: "Funda", country: "Netherlands", vertical: "Real Estate", url: "https://customers.twilio.com/en-us/funda", summary: "Leading real estate platform using Twilio for property alerts and agent communications", products_used: ["Messaging", "SendGrid"] },
  { publishDate: "2025-06-01", company: "LensOnline", country: "Netherlands", vertical: "Retail", url: "https://customers.twilio.com/en-us/lens-online", summary: "Online eyewear retailer using Twilio for order and appointment communications", products_used: ["Messaging"] },
  { publishDate: "2025-06-01", company: "510 Netherlands Red Cross", country: "Netherlands", vertical: "Nonprofit", url: "https://customers.twilio.com/en-us/netherlands-red-cross", summary: "Red Cross data team using Twilio for disaster response communications", products_used: ["Messaging", "Voice"] },

  // Denmark
  { publishDate: "2026-02-28", company: "Veo Technologies", country: "Denmark", vertical: "Technology", url: "https://customers.twilio.com/en-us/veo", summary: "AI sports camera company using Twilio for user engagement and notifications", products_used: ["Messaging", "SendGrid"] },
  { publishDate: "2026-04-02", company: "Danske Spil", country: "Denmark", vertical: "Gaming", url: "https://customers.twilio.com/en-us/danske-spil", summary: "National lottery operator using Twilio for secure player verification", products_used: ["Verify", "Messaging"] },
  { publishDate: "2025-11-22", company: "Trustpilot", country: "Denmark", vertical: "Technology", url: "https://customers.twilio.com/en-us/trustpilot", summary: "Review platform using Twilio for business verification and notifications", products_used: ["Verify", "SendGrid"] },

  // Norway
  { publishDate: "2026-01-20", company: "Yara International", country: "Norway", vertical: "Agriculture", url: "https://customers.twilio.com/en-us/yara-international", summary: "Fertilizer and crop nutrition company using Twilio for farmer engagement", products_used: ["Messaging", "SendGrid"] },
  { publishDate: "2025-06-01", company: "Adevinta", country: "Norway", vertical: "Technology", url: "https://customers.twilio.com/en-us/adevinta", summary: "Online classifieds group using Twilio for marketplace communications", products_used: ["Messaging", "Verify"] },

  // Sweden
  { publishDate: "2026-03-18", company: "Skilling", country: "Sweden", vertical: "Financial Services", url: "https://customers.twilio.com/en-us/skilling", summary: "Trading platform using Twilio for secure authentication and account notifications", products_used: ["Verify", "Messaging"] },
  { publishDate: "2025-06-01", company: "FundedByMe", country: "Sweden", vertical: "Financial Services", url: "https://customers.twilio.com/en-us/fundedbyme", summary: "Crowdfunding platform using Twilio for investor communications", products_used: ["Messaging", "SendGrid"] },
  { publishDate: "2025-06-01", company: "DigiExam", country: "Sweden", vertical: "Education", url: "https://customers.twilio.com/en-us/digiexam", summary: "Digital exam platform using Twilio for student notifications and authentication", products_used: ["Messaging", "Verify"] },
  { publishDate: "2026-05-10", company: "Northmill", country: "Sweden", vertical: "Financial Services", url: "https://customers.twilio.com/en-us/northmill", summary: "Digital bank using Twilio for secure customer communications and authentication", products_used: ["Verify", "Messaging", "Voice"] },

  // Belgium
  { publishDate: "2025-06-01", company: "Jaimy", country: "Belgium", vertical: "On-Demand Services", url: "https://customers.twilio.com/en-us/jaimy", summary: "Home services marketplace using Twilio for professional-customer coordination", products_used: ["Messaging", "Voice"] },
  { publishDate: "2026-04-25", company: "AB InBev", country: "Belgium", vertical: "CPG", url: "https://customers.twilio.com/en-us/ab-inbev", summary: "Global beverage company using Twilio for direct-to-consumer engagement", products_used: ["Messaging", "Segment"] },

  // Ireland
  { publishDate: "2025-06-01", company: "The Vintage Bar", country: "Ireland", vertical: "Retail", url: "https://customers.twilio.com/en-us/the-vintage-bar", summary: "Luxury resale marketplace using Twilio for buyer-seller communications", products_used: ["Messaging"] },

  // Spain
  { publishDate: "2025-09-05", company: "Typeform", country: "Spain", vertical: "Technology", url: "https://customers.twilio.com/en-us/typeform", summary: "Forms and surveys platform using Twilio for respondent notifications", products_used: ["Messaging", "SendGrid"] },

  // Poland
  { publishDate: "2026-07-15", company: "Docplanner", country: "Poland", vertical: "Healthcare", url: "https://customers.twilio.com/en-us/docplanner0", summary: "Healthcare booking platform using Twilio for patient-doctor communications across 13 countries", products_used: ["Voice", "Messaging", "Flex", "Conversation Relay"] },

  // Switzerland
  { publishDate: "2025-06-01", company: "Volleyball World", country: "Switzerland", vertical: "Media", url: "https://customers.twilio.com/en-us/volleyball-world", summary: "International sports organization using Twilio for fan engagement", products_used: ["Messaging", "Segment"] },

  // Austria
  { publishDate: "2025-06-01", company: "myWorld", country: "Austria", vertical: "Retail", url: "https://customers.twilio.com/en-us/myWorld", summary: "Shopping and cashback platform using Twilio for member communications", products_used: ["Messaging", "SendGrid"] },

  // Czech Republic
  { publishDate: "2025-10-15", company: "Deepnote", country: "Czech Republic", vertical: "Technology", url: "https://customers.twilio.com/en-us/deepnote", summary: "Data science platform using Twilio for user onboarding and collaboration notifications", products_used: ["SendGrid", "Verify"] },

  // Israel
  { publishDate: "2025-06-01", company: "Papaya Gaming", country: "Israel", vertical: "Gaming", url: "https://customers.twilio.com/en-us/papaya-gaming", summary: "Mobile gaming company using Twilio for player verification and engagement", products_used: ["Verify", "Messaging"] },
];

export function getStoriesByCountry(country: string): EMEACustomerStory[] {
  return EMEA_CUSTOMER_STORIES
    .filter(s => s.country === country)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export function getStoriesByVertical(vertical: string): EMEACustomerStory[] {
  const normalized = vertical.toLowerCase();
  return EMEA_CUSTOMER_STORIES.filter(s => s.vertical.toLowerCase().includes(normalized));
}

export function getStoriesByProduct(productName: string): EMEACustomerStory[] {
  const normalized = productName.toLowerCase();
  return EMEA_CUSTOMER_STORIES.filter(s =>
    s.products_used.some(p => p.toLowerCase().includes(normalized) || normalized.includes(p.toLowerCase()))
  );
}

export function getStoriesForContext(country: string, productName: string, vertical?: string): EMEACustomerStory[] {
  const byCountry = getStoriesByCountry(country);
  if (byCountry.length >= 2) return byCountry;

  const byProduct = getStoriesByProduct(productName);
  const combined = new Map<string, EMEACustomerStory>();
  [...byCountry, ...byProduct].forEach(s => combined.set(s.company, s));

  if (vertical) {
    getStoriesByVertical(vertical).forEach(s => combined.set(s.company, s));
  }

  return Array.from(combined.values())
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate))
    .slice(0, 5);
}
