/**
 * Suburb-level area page data — one entry per suburb served.
 * Each area gets unique landmarks, transport, neighbourhood angle, and FAQs.
 */

import { OLIVE_SERVICE_SUBURBS } from "@/lib/seo/local-business";

export type AreaFaq = { question: string; answer: string };

export type AreaContent = {
  slug: string;
  name: string;
  postcode: string;
  /** SERP title — BEST + Marketing Agency + Suburb + Olive Marketing + Services + Near Me */
  metaTitle: string;
  metaDescription: string;
  /** H1 = Marketing Agency + Suburb */
  h1: string;
  intro: string;
  /** What makes this suburb unique — used in body copy */
  angle: string;
  landmarks: string[];
  transport: string;
  /** Common pain points for businesses in this suburb */
  painPoints: string[];
  /** Industries strongly represented locally — used for "we work with" copy */
  industries: string[];
  faqs: AreaFaq[];
};

const COMMON_FAQS = (suburb: string): AreaFaq[] => [
  {
    question: `Are you actually based near ${suburb}?`,
    answer:
      "We're a Melbourne service-area business, headquartered in the CBD and serving the whole metro area. We meet clients on-site in your suburb, at our studio, or over video — whichever you prefer.",
  },
  {
    question: `How quickly can we start a project in ${suburb}?`,
    answer:
      "We typically have first-call availability within the same week. Project kickoffs depend on scope — local SEO setups can start within 7 days of agreement, while branded web builds take 2–3 weeks of pre-production.",
  },
];

export const MELBOURNE_AREAS: AreaContent[] = [
  {
    slug: "melbourne-cbd",
    name: "Melbourne CBD",
    postcode: "3000",
    metaTitle:
      "Best Marketing Agency Melbourne CBD | Olive Marketing — Web Design, SEO, Branding & Lead Generation Near Me (3000)",
    metaDescription:
      "Marketing agency serving Melbourne CBD (3000) — luxury website design, SEO, branding, Google Ads and lead generation for businesses around Collins, Bourke, Spencer, and Flinders streets.",
    h1: "Marketing Agency Melbourne CBD",
    intro:
      "We work with Melbourne CBD businesses — law firms, financial advisers, restaurants, hospitality groups, retail flagships, and creative studios — whose customers expect a brand experience as polished as the address.",
    angle:
      "CBD foot traffic is high but attention is low. The brands that win Collins Street, Bourke Street Mall, and Flinders Lane are the ones whose digital presence matches the in-person experience — not the ones with the loudest ads.",
    landmarks: [
      "Collins Street",
      "Bourke Street Mall",
      "Flinders Street Station",
      "Federation Square",
      "Queen Victoria Market",
      "Southern Cross Station",
      "RMIT campus",
    ],
    transport:
      "Direct access via every Metro line into Flinders Street and Southern Cross, every CBD tram route, and the Free Tram Zone covering most of the city grid.",
    painPoints: [
      "Generic agencies don't understand the difference between a Collins Street legal practice and a Flinders Lane restaurant",
      "Lookalike branding from template shops",
      "Local SEO competing with national chains",
    ],
    industries: ["Hospitality", "Professional services", "Retail", "Property", "Legal", "Finance"],
    faqs: COMMON_FAQS("Melbourne CBD"),
  },
  {
    slug: "preston",
    name: "Preston",
    postcode: "3072",
    metaTitle:
      "Best Marketing Agency Preston | Olive Marketing — Web Design, SEO, Branding & Lead Generation in Preston VIC 3072 Near Me",
    metaDescription:
      "Marketing agency for Preston (3072) businesses — local SEO, web design, branding and lead generation for trades, retail, hospitality and clinics around High Street, Preston Market, and Bell Street.",
    h1: "Marketing Agency Preston",
    intro:
      "We help Preston businesses — independent retailers, family-owned restaurants, trades, dental and medical clinics, and growing service businesses — show up properly on Google when their next customer searches.",
    angle:
      "Preston is one of Melbourne's fastest-changing inner-north suburbs. Local SEO done well lets you capture both long-time locals and the wave of new residents moving in along the High Street and Plenty Road corridors.",
    landmarks: [
      "Preston Market",
      "High Street Preston",
      "Northland Shopping Centre",
      "Bell Street",
      "Preston Library",
      "Northcote Plaza border",
    ],
    transport:
      "Mernda line stops at Preston, Bell, and Regent stations. Tram route 11 runs along High Street to the CBD. Easy off-street parking near Preston Market.",
    painPoints: [
      "Northland Shopping Centre dominates broader retail searches",
      "Preston Market traders struggle to reach customers outside of farmers-market segments",
      "Trades compete with larger Northcote and Brunswick brands for the same queries",
    ],
    industries: ["Trades", "Retail", "Hospitality", "Health & dental", "Beauty & wellness"],
    faqs: COMMON_FAQS("Preston"),
  },
  {
    slug: "richmond",
    name: "Richmond",
    postcode: "3121",
    metaTitle:
      "Best Marketing Agency Richmond | Olive Marketing — Web Design, SEO, Branding & Lead Generation in Richmond VIC 3121 Near Me",
    metaDescription:
      "Marketing agency for Richmond (3121) businesses — Bridge Road, Swan Street, and Church Street. Local SEO, premium web design, branding, and lead generation for hospitality, retail and creative agencies.",
    h1: "Marketing Agency Richmond",
    intro:
      "Richmond is one of Melbourne's densest commercial inner suburbs — restaurants, design agencies, retail, gyms, and tech offices. We help local Richmond brands punch above their weight in search.",
    angle:
      "Bridge Road, Swan Street and Church Street each behave like their own micro-economy. We tune local SEO, ads, and content to whichever street your customers actually walk down.",
    landmarks: [
      "Bridge Road",
      "Swan Street",
      "Church Street",
      "MCG (across the river)",
      "Richmond Station",
      "Victoria Gardens Shopping Centre",
      "Burnley Park",
    ],
    transport:
      "Three Metro lines (Lilydale, Belgrave, Alamein, Glen Waverley) all stop at Richmond Station. Trams 70, 75, 78, and 109 connect every commercial strip.",
    painPoints: [
      "Restaurant rent pressure — fewer paid ads, more on organic discovery",
      "Bridge Road's retail rebound is uneven — you're either visible or invisible on Google",
      "MCG/Sports precinct event traffic doesn't always convert without a clear local hook",
    ],
    industries: ["Hospitality", "Retail", "Creative agencies", "Fitness & wellness", "Tech & software"],
    faqs: COMMON_FAQS("Richmond"),
  },
  {
    slug: "north-richmond",
    name: "North Richmond",
    postcode: "3121",
    metaTitle:
      "Best Marketing Agency North Richmond | Olive Marketing — Web Design, SEO, Branding & Lead Generation in North Richmond VIC 3121 Near Me",
    metaDescription:
      "Marketing agency for North Richmond (3121) — Victoria Street, Lennox Street, and Abbotsford border. Local SEO, web design, branding and lead generation for hospitality, retail, clinics and trades.",
    h1: "Marketing Agency North Richmond",
    intro:
      "North Richmond's Victoria Street precinct, the lanes off Lennox Street, and the Abbotsford border are all distinct micro-markets. We help local businesses there compete without getting absorbed into Greater Richmond search results.",
    angle:
      "Victoria Street's Vietnamese hospitality scene, Lennox Street's residential mix, and the Abbotsford convent precinct each draw different customers. Targeted local SEO matters more here than in any other 3121 corner.",
    landmarks: [
      "Victoria Street precinct",
      "Lennox Street",
      "Abbotsford Convent",
      "Yarra River corridor",
      "North Richmond Station",
      "Citizens Park",
    ],
    transport:
      "North Richmond Station on the Mernda/Hurstbridge lines. Tram route 12 along Victoria Street into the CBD. Walking access along the Yarra Trail.",
    painPoints: [
      "Searches collapse North Richmond into Richmond — strong area pages and reviews are how you separate",
      "Hospitality on Victoria Street is hyper-competitive for terms like 'pho near me'",
      "Service businesses fight for visibility across both Richmond and Abbotsford queries",
    ],
    industries: ["Hospitality", "Retail", "Health & wellness", "Trades", "Creative"],
    faqs: COMMON_FAQS("North Richmond"),
  },
  {
    slug: "bundoora",
    name: "Bundoora",
    postcode: "3083",
    metaTitle:
      "Best Marketing Agency Bundoora | Olive Marketing — Web Design, SEO, Branding & Lead Generation in Bundoora VIC 3083 Near Me",
    metaDescription:
      "Marketing agency for Bundoora (3083) — La Trobe University precinct, Plenty Road, and University Hill. Local SEO, web design, branding and lead generation for healthcare, education, trades and student-services businesses.",
    h1: "Marketing Agency Bundoora",
    intro:
      "Bundoora is dominated by La Trobe University, the Northern Hospital satellite services, University Hill shopping precinct, and a steady stream of family-suburb residents. We help local Bundoora businesses win attention from each of those audiences.",
    angle:
      "La Trobe drives a huge student and staff population — local SEO has to handle term-time spikes and quiet summer months. Healthcare clinics need different messaging than student-targeted cafés and gyms.",
    landmarks: [
      "La Trobe University",
      "University Hill",
      "Plenty Road",
      "Bundoora Park",
      "Northern Hospital outreach clinics",
      "RMIT Bundoora campus",
    ],
    transport:
      "Tram route 86 along Plenty Road into the CBD. Bus services connect Bundoora with Reservoir, Heidelberg and Greensborough. Easy car parking at University Hill.",
    painPoints: [
      "Term-time vs holiday traffic patterns require ad budget pacing",
      "Healthcare clinics fight Northern Hospital and big-chain brand strength",
      "Trades compete across Heidelberg, Reservoir and Mill Park for the same searches",
    ],
    industries: ["Education-adjacent services", "Healthcare", "Trades", "Hospitality", "Childcare"],
    faqs: COMMON_FAQS("Bundoora"),
  },
  {
    slug: "northcote",
    name: "Northcote",
    postcode: "3070",
    metaTitle:
      "Best Marketing Agency Northcote | Olive Marketing — Web Design, SEO, Branding & Lead Generation in Northcote VIC 3070 Near Me",
    metaDescription:
      "Marketing agency for Northcote (3070) — High Street, Westgarth, and Northcote Plaza. Local SEO, premium web design, branding and lead generation for hospitality, retail, creative studios and clinics.",
    h1: "Marketing Agency Northcote",
    intro:
      "Northcote's High Street and Westgarth precinct host some of Melbourne's strongest indie retail, hospitality, and creative businesses. We help local brands keep their digital presence as considered as their shopfront.",
    angle:
      "Northcote customers research before they walk in — they read reviews, browse menus, and check Instagram. A polished, fast website plus active local SEO converts that pre-visit research into actual foot traffic.",
    landmarks: [
      "High Street Northcote",
      "Northcote Plaza",
      "Westgarth Cinema",
      "All Nations Park",
      "Northcote Town Hall",
      "Merri Creek",
    ],
    transport:
      "Tram route 86 runs the length of High Street into the CBD. Mernda line via Northcote and Croxton stations. Westgarth has dedicated parking and easy bike paths.",
    painPoints: [
      "High-quality competition means SERP rank one is hard to defend",
      "Saturday/Sunday foot traffic doesn't show up on Google searches",
      "Independent retail must compete with Northcote Plaza brand-name shops",
    ],
    industries: ["Hospitality", "Retail", "Creative agencies", "Health & wellness", "Beauty"],
    faqs: COMMON_FAQS("Northcote"),
  },
  {
    slug: "reservoir",
    name: "Reservoir",
    postcode: "3073",
    metaTitle:
      "Best Marketing Agency Reservoir | Olive Marketing — Web Design, SEO, Branding & Lead Generation in Reservoir VIC 3073 Near Me",
    metaDescription:
      "Marketing agency for Reservoir (3073) — Broadway, Edwardes Lake Park and Reservoir East. Local SEO, web design, branding and lead generation for trades, retail, healthcare and family services.",
    h1: "Marketing Agency Reservoir",
    intro:
      "Reservoir's resurgence has brought a wave of new restaurants, cafés, clinics and family services to Broadway and the surrounding streets. We help local Reservoir businesses claim the searches before national chains do.",
    angle:
      "Reservoir is gentrifying fast but still has the affordability that protects independent operators. Get your local SEO and Google Business Profile right early and you build defensible visibility before competition arrives.",
    landmarks: [
      "Broadway",
      "Edwardes Lake Park",
      "Reservoir Station",
      "Reservoir East",
      "Plenty Road",
      "Summerhill Park",
    ],
    transport:
      "Mernda line stops at Reservoir, Ruthven, and Keon Park. Bus connections to Northland, Bundoora, and Heidelberg. Plenty Road tram terminates nearby.",
    painPoints: [
      "Competing with Preston and Northcote for north-side searches",
      "New residents don't yet know the local business landscape — search is your introduction",
      "Trades have to compete with cheaper out-of-area providers on price-led searches",
    ],
    industries: ["Trades", "Hospitality", "Retail", "Healthcare", "Family services"],
    faqs: COMMON_FAQS("Reservoir"),
  },
  {
    slug: "brunswick",
    name: "Brunswick",
    postcode: "3056",
    metaTitle:
      "Best Marketing Agency Brunswick | Olive Marketing — Web Design, SEO, Branding & Lead Generation in Brunswick VIC 3056 Near Me",
    metaDescription:
      "Marketing agency for Brunswick (3056) — Sydney Road, Lygon Street and the Brunswick East creative precinct. Local SEO, premium web design, branding and lead generation for hospitality, fashion, music venues and creative studios.",
    h1: "Marketing Agency Brunswick",
    intro:
      "Brunswick is Melbourne's creative engine — fashion, music, food, and design. We work with Brunswick businesses that want digital marketing as distinctive as the suburb itself.",
    angle:
      "Generic agency work dies in Brunswick. Customers here can spot a template shop from the storefront. Your website, branding and ads need to feel like they were made by someone who actually drinks coffee on Sydney Road.",
    landmarks: [
      "Sydney Road",
      "Lygon Street Brunswick East",
      "Mechanics Institute Performing Arts Centre",
      "Wilson Avenue",
      "CERES Community Environment Park",
      "Jewell Station",
    ],
    transport:
      "Tram route 19 along Sydney Road, route 1/6 along Lygon Street, Upfield line via Jewell, Brunswick and Anstey stations. Strong cycling routes via the Upfield Bike Path.",
    painPoints: [
      "Hyper-saturation means SEO competition is fierce — schema, content depth and reviews all matter",
      "Hospitality margins are thin; ad budgets are small; organic and content lead the way",
      "Strong local-loyalty culture means newcomers must build trust before search visibility translates to revenue",
    ],
    industries: ["Hospitality", "Fashion & retail", "Creative", "Music & arts", "Health & wellness"],
    faqs: COMMON_FAQS("Brunswick"),
  },
  {
    slug: "pascoe-vale",
    name: "Pascoe Vale",
    postcode: "3044",
    metaTitle:
      "Best Marketing Agency Pascoe Vale | Olive Marketing — Web Design, SEO, Branding & Lead Generation in Pascoe Vale VIC 3044 Near Me",
    metaDescription:
      "Marketing agency for Pascoe Vale (3044) — Bell Street, Cumberland Road and Pascoe Vale South. Local SEO, web design, branding and lead generation for trades, family services, healthcare and hospitality.",
    h1: "Marketing Agency Pascoe Vale",
    intro:
      "Pascoe Vale and Pascoe Vale South are family-suburb businesses' bread-and-butter market. We help local trades, clinics, and shops win the suburb-level searches that drive most of their pipeline.",
    angle:
      "Most Pascoe Vale customers search by suburb name plus service ('plumber Pascoe Vale', 'physio Pascoe Vale South'). Suburb pages and Google Business Profile categories matter more here than fancy paid creative.",
    landmarks: [
      "Bell Street corridor",
      "Cumberland Road",
      "Pascoe Vale Station",
      "Coonans Hill Park",
      "Anderson Park",
      "Pascoe Vale Library",
    ],
    transport:
      "Craigieburn line via Pascoe Vale Station. Bus routes link with Coburg, Brunswick, and Glenroy. Bell Street provides east-west arterial access.",
    painPoints: [
      "Smaller search volume per category means every map pack ranking matters more",
      "Trades compete with bigger Coburg and Brunswick brands for cross-suburb searches",
      "Family-segment customers expect responsive websites and clear service info",
    ],
    industries: ["Trades", "Healthcare", "Family services", "Childcare", "Retail"],
    faqs: COMMON_FAQS("Pascoe Vale"),
  },
  {
    slug: "heidelberg",
    name: "Heidelberg",
    postcode: "3084",
    metaTitle:
      "Best Marketing Agency Heidelberg | Olive Marketing — Web Design, SEO, Branding & Lead Generation in Heidelberg VIC 3084 Near Me",
    metaDescription:
      "Marketing agency for Heidelberg (3084) — Burgundy Street, Austin Hospital precinct and Heidelberg West. Local SEO, web design, branding and lead generation for healthcare, allied health, professional services and retail.",
    h1: "Marketing Agency Heidelberg",
    intro:
      "Heidelberg is built around the Austin Hospital and Mercy Health precinct, with a strong allied-health community, professional services, and a thriving Burgundy Street retail strip. We help local Heidelberg businesses win in those highly-specific search categories.",
    angle:
      "Healthcare and allied-health businesses in Heidelberg face strict marketing rules and high competition. We build compliant, conversion-focused campaigns that respect AHPRA guidelines without being boring.",
    landmarks: [
      "Burgundy Street",
      "Austin Hospital",
      "Mercy Hospital for Women",
      "Heidelberg Station",
      "Warringal Park",
      "Heidelberg Town Hall",
    ],
    transport:
      "Hurstbridge line via Heidelberg Station. Bus connections to Bundoora, Ivanhoe, and Greensborough. Bell Street and Banksia Street arterial roads.",
    painPoints: [
      "Healthcare marketing must comply with AHPRA — most agencies don't know how",
      "Burgundy Street retail competes with online and Northland for non-essential spend",
      "Professional services need credibility-led marketing, not aggressive lead-gen",
    ],
    industries: ["Healthcare", "Allied health", "Professional services", "Retail", "Hospitality"],
    faqs: COMMON_FAQS("Heidelberg"),
  },
  {
    slug: "south-yarra",
    name: "South Yarra",
    postcode: "3141",
    metaTitle:
      "Best Marketing Agency South Yarra | Olive Marketing — Luxury Web Design, SEO, Branding & Lead Generation in South Yarra VIC 3141 Near Me",
    metaDescription:
      "Premium marketing agency for South Yarra (3141) — Chapel Street, Toorak Road and Forrest Hill. Luxury website design, SEO, branding and lead generation for fashion, hospitality, beauty, property and high-end services.",
    h1: "Marketing Agency South Yarra",
    intro:
      "South Yarra brands hold themselves to a higher visual standard. Chapel Street, Toorak Road and Forrest Hill are some of Melbourne's most discerning retail and hospitality strips — your digital presence has to match.",
    angle:
      "South Yarra customers expect editorial design, premium photography, and a brand voice that doesn't try too hard. We build websites and campaigns that look like they belong on Toorak Road, not on a generic agency template.",
    landmarks: [
      "Chapel Street",
      "Toorak Road",
      "Forrest Hill",
      "South Yarra Station",
      "Como Centre",
      "Royal Botanic Gardens (across the river)",
      "Fawkner Park",
    ],
    transport:
      "South Yarra Station serves four Metro lines (Sandringham, Frankston, Cranbourne, Pakenham). Trams 8, 78 along Toorak Road; 78 down Chapel Street. Easy CBD access.",
    painPoints: [
      "Premium price points need premium presentation — generic websites lose the customer in the first scroll",
      "Hospitality and beauty competition on Chapel Street is national-grade",
      "Property and finance professional services need understated, credibility-led marketing",
    ],
    industries: ["Fashion & retail", "Hospitality", "Beauty & wellness", "Property", "Professional services"],
    faqs: COMMON_FAQS("South Yarra"),
  },
  {
    slug: "carlton",
    name: "Carlton",
    postcode: "3053",
    metaTitle:
      "Best Marketing Agency Carlton | Olive Marketing — Web Design, SEO, Branding & Lead Generation in Carlton VIC 3053 Near Me",
    metaDescription:
      "Marketing agency for Carlton (3053) — Lygon Street, University of Melbourne precinct and Carlton Gardens. Local SEO, premium web design, branding and lead generation for hospitality, healthcare, professional services and retail.",
    h1: "Marketing Agency Carlton",
    intro:
      "Carlton sits between the CBD and the University of Melbourne, with Lygon Street's hospitality strip, Carlton Gardens, and a deep base of professional services and healthcare practices. We help Carlton businesses win the searches that matter.",
    angle:
      "Carlton customers are a mix of CBD office workers, university staff and students, locals, and tourists. Each group searches differently — we tune campaigns and content to the segment that actually pays for what you sell.",
    landmarks: [
      "Lygon Street",
      "Carlton Gardens",
      "University of Melbourne",
      "Royal Exhibition Building",
      "Melbourne Museum",
      "Queen Victoria Market (CBD border)",
    ],
    transport:
      "Tram routes 1, 6, 8, 35, 96 cover every Carlton corner. Walking distance to Melbourne Central, Parliament, and Flagstaff stations. Easy bike access via Royal Parade.",
    painPoints: [
      "University-driven seasonality requires ad pacing and content timing",
      "Lygon Street hospitality saturation makes organic discovery tough — reviews and visual content lead the way",
      "Healthcare and professional services compete with CBD-based national brands",
    ],
    industries: ["Hospitality", "Healthcare", "Professional services", "Education-adjacent", "Retail"],
    faqs: COMMON_FAQS("Carlton"),
  },
];

export function getMelbourneAreaBySlug(slug: string): AreaContent | undefined {
  return MELBOURNE_AREAS.find((a) => a.slug === slug);
}

export function getMelbourneAreaSlugs(): string[] {
  return MELBOURNE_AREAS.map((a) => a.slug);
}

/** Sanity check: every suburb in OLIVE_SERVICE_SUBURBS has a content entry. */
export function validateAreaCoverage(): string[] {
  const contentSlugs = new Set(MELBOURNE_AREAS.map((a) => a.slug));
  return OLIVE_SERVICE_SUBURBS.map((s) => s.slug).filter((slug) => !contentSlugs.has(slug));
}
