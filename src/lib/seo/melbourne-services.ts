/**
 * Melbourne service-page registry — drives /services and /services/[slug].
 * Each entry targets a unique keyword cluster + commercial intent variation.
 */

export type MelbourneServiceFaq = { question: string; answer: string };
export type MelbourneServiceSection = { heading: string; paragraphs: string[] };

export type MelbourneService = {
  slug: string;
  /** Primary keyword as the user would search it */
  keyword: string;
  /** SERP title — long-form, BEST + category + city + brand + services + Near Me */
  metaTitle: string;
  metaDescription: string;
  /** H1 = primary category + city */
  h1: string;
  intro: string;
  /** H2 sections — secondary keywords + supporting services */
  sections: MelbourneServiceSection[];
  faqs: MelbourneServiceFaq[];
  /** Commercial / informational / navigational */
  intent: "commercial" | "transactional" | "informational";
  semanticKeywords: string[];
  /** Slugs of related services for internal linking */
  related: string[];
  /** Suggested word count target — kept for reporting/QA, not rendered */
  wordCountTarget: number;
};

export const MELBOURNE_SERVICES: MelbourneService[] = [
  {
    slug: "luxury-website-design-melbourne",
    keyword: "Luxury Website Design Melbourne",
    metaTitle:
      "Best Luxury Website Design Melbourne | Olive Marketing — Premium Web Design, Branding & Editorial UX Near Me",
    metaDescription:
      "Luxury website design in Melbourne for hospitality, fashion, beauty, property and high-end service brands. Editorial layouts, motion design, conversion-focused UX. Servicing Melbourne CBD, South Yarra, Carlton and Greater Melbourne.",
    h1: "Luxury Website Design Melbourne",
    intro:
      "We design premium websites for Melbourne brands that need to look and feel as considered as the experience their clients pay for. Hospitality, fashion, property, beauty, wellness, and professional services — sites that move and convert.",
    sections: [
      {
        heading: "What luxury web design means in Melbourne",
        paragraphs: [
          "A luxury website is not a templated theme with a bigger budget. It is editorial typography, deliberate motion, hand-tuned imagery, and a navigation pattern that respects the way Melbourne customers buy — they research, they compare, they expect a response.",
          "We design every page around the moment a buyer decides to enquire. Hero, story, proof, services, contact — each one earns the next scroll. No filler, no parallax for parallax's sake.",
        ],
      },
      {
        heading: "Editorial design systems for Melbourne brands",
        paragraphs: [
          "Each project ships with a Figma library of typography, colour, motion and imagery rules that your team can extend. We test on real Melbourne devices — iPhone in low light at South Yarra cafés, MacBook on the train into Flinders Street, an iPad at a Carlton clinic.",
          "Our build stack is Next.js + Vercel for fast deploys and per-suburb performance. Lighthouse scores above 95 on mobile are the floor, not the ceiling.",
        ],
      },
      {
        heading: "Conversion-driven luxury, not just pretty",
        paragraphs: [
          "Most premium sites lose money because the team treated design as decoration. We instrument every CTA, scroll depth, and form abandonment, then iterate weekly for the first 90 days post-launch.",
          "If you sell consultations, treatments, suites, or signed proposals, we tune the funnel so the brand experience leads cleanly into a booked call.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a luxury website cost in Melbourne?",
        answer:
          "Most luxury Melbourne projects we build sit between AUD 12k and AUD 45k depending on scope, copywriting, photography direction and motion design. We send a fixed proposal after a free 30-minute scope call.",
      },
      {
        question: "Do you only work with Melbourne CBD businesses?",
        answer:
          "No — we ship for clients across Preston, Richmond, Northcote, Brunswick, South Yarra, Carlton, Bundoora, Heidelberg and the wider Melbourne metro area. We are a service-area business based in Melbourne.",
      },
      {
        question: "How long does a luxury website take to build?",
        answer:
          "Six to ten weeks is typical end-to-end: discovery and content (week 1–2), design (week 3–5), build and integration (week 6–8), QA and launch (week 9–10).",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "premium web design Melbourne",
      "high-end website designer Melbourne",
      "boutique web design agency",
      "editorial website design",
      "Melbourne luxury brand designer",
    ],
    related: ["web-design-melbourne", "branding-agency-melbourne", "ecommerce-website-design-melbourne"],
    wordCountTarget: 1800,
  },
  {
    slug: "web-design-melbourne",
    keyword: "Web Design Melbourne",
    metaTitle:
      "Best Web Design Melbourne | Olive Marketing — Custom Websites, SEO-Ready Builds & Conversion Design Near Me",
    metaDescription:
      "Custom web design Melbourne — fast, SEO-ready, conversion-focused websites for small businesses, professional services, and local brands. Servicing Preston, Richmond, Brunswick, Northcote, South Yarra, Carlton & Greater Melbourne.",
    h1: "Web Design Melbourne",
    intro:
      "Most Melbourne small businesses lose customers to a slow, generic website. We design and build fast, on-brand, SEO-ready sites that turn local search traffic into booked enquiries.",
    sections: [
      {
        heading: "Custom websites built around your Melbourne customers",
        paragraphs: [
          "We start with the search intent your customers actually use — \"plumber near Brunswick\", \"physio Richmond\", \"florist South Yarra\" — and design every page to answer that intent in the first scroll.",
          "Every site ships with location pages, service pages, and a clear Google Business Profile-ready footer NAP so your local presence is consistent end-to-end.",
        ],
      },
      {
        heading: "Performance and Core Web Vitals",
        paragraphs: [
          "We build on Next.js with image optimisation, edge caching, and lazy-loaded components. Real Melbourne users on mobile see Largest Contentful Paint under 2 seconds and a near-instant interaction time.",
          "Why it matters: Google's local rankings reward fast pages, and your bounce rate drops measurably when a site loads in under two seconds.",
        ],
      },
      {
        heading: "SEO foundations baked into the build",
        paragraphs: [
          "Schema markup, an XML sitemap, semantic HTML, mobile-first responsive layouts, and proper heading hierarchy are not add-ons — they are how we structure every project.",
          "We also wire in Google Search Console, Tag Manager and analytics so you can see exactly which Melbourne suburbs your traffic is coming from.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does a small-business website cost in Melbourne?",
        answer:
          "Typical small-business websites sit between AUD 4,500 and AUD 14,000 depending on page count, integrations, and copywriting needs. Most clients pick a fixed-scope package after a free 30-minute call.",
      },
      {
        question: "Do you offer ongoing website maintenance?",
        answer:
          "Yes — we offer monthly care plans covering hosting, security updates, backups, content edits, and uptime monitoring. Plans start at AUD 180/month.",
      },
      {
        question: "Will my Melbourne business rank on Google?",
        answer:
          "Web design alone is the foundation. To rank in the Melbourne local pack you also need an optimised Google Business Profile, citations, reviews, and ongoing content. We handle this as part of our Local SEO Melbourne package.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "Melbourne website designer",
      "small business website Melbourne",
      "web designer near me Melbourne",
      "Melbourne web development",
      "responsive website design Melbourne",
    ],
    related: ["luxury-website-design-melbourne", "seo-melbourne", "small-business-marketing-melbourne"],
    wordCountTarget: 1600,
  },
  {
    slug: "seo-melbourne",
    keyword: "SEO Melbourne",
    metaTitle:
      "Best SEO Agency Melbourne | Olive Marketing — Local SEO, Technical SEO & Content Strategy That Ranks Near Me",
    metaDescription:
      "Melbourne SEO agency — technical SEO, on-page optimisation, content strategy, and link building for local businesses. Rank in the Melbourne 3-pack and across Preston, Richmond, Northcote, Brunswick, South Yarra and Carlton.",
    h1: "SEO Melbourne",
    intro:
      "We get Melbourne businesses to the top of Google for the searches that drive revenue. Local pack, organic, and the long tail — all with reporting tied to leads, not vanity metrics.",
    sections: [
      {
        heading: "Technical SEO audit first, content second",
        paragraphs: [
          "Most Melbourne businesses we audit have crawl errors, duplicate metadata, broken hreflang, and missing schema. We fix the foundations before we write a single piece of content.",
          "Audits cover Core Web Vitals, mobile usability, internal linking, schema, indexability, and SERP competition for your specific Melbourne keywords.",
        ],
      },
      {
        heading: "Local SEO that wins the Melbourne map pack",
        paragraphs: [
          "Map pack rankings come from three signals: relevance (categories + service pages), distance (suburb-level pages), and prominence (reviews, citations, links). We build all three.",
          "We also align your Google Business Profile with your website content so service names, hours, and area-served data are consistent — Google rewards that.",
        ],
      },
      {
        heading: "Content and link strategy",
        paragraphs: [
          "Topical authority comes from publishing depth. We map every search a Melbourne customer might run and produce content that answers it better than the current top-three.",
          "On the link side, we earn coverage from local Melbourne directories, industry sites, and partner mentions — never PBNs or paid placements.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does SEO take to work in Melbourne?",
        answer:
          "Local pack movements can show in 4–8 weeks for new service-area pages with proper schema. Competitive organic terms typically take 4–6 months. We share monthly progress reports so you see velocity, not just rankings.",
      },
      {
        question: "What does Melbourne SEO cost?",
        answer:
          "Retainers start at AUD 1,500/month for local SEO and AUD 3,500/month for full-service campaigns. Pricing scales with the number of suburbs targeted and competitive density.",
      },
      {
        question: "Do you guarantee #1 rankings?",
        answer:
          "No reputable agency will. We guarantee the work — audits, schema, content, technical fixes, and reporting — and we share the metrics that move first (impressions, click-through rate) before rankings consolidate.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "SEO agency Melbourne",
      "search engine optimisation Melbourne",
      "Melbourne SEO consultant",
      "SEO services Melbourne",
      "best SEO Melbourne",
    ],
    related: ["local-seo-melbourne", "web-design-melbourne", "google-ads-management-melbourne"],
    wordCountTarget: 1800,
  },
  {
    slug: "local-seo-melbourne",
    keyword: "Local SEO Melbourne",
    metaTitle:
      "Best Local SEO Melbourne | Olive Marketing — Google Map Pack, GBP Optimisation & Suburb-Level Rankings Near Me",
    metaDescription:
      "Local SEO Melbourne specialists. Rank in the Google 3-pack across Preston, Richmond, Northcote, Brunswick, South Yarra, Carlton and Greater Melbourne. Google Business Profile optimisation, citations, reviews, and on-site local schema.",
    h1: "Local SEO Melbourne",
    intro:
      "Local SEO is what gets your Melbourne business into the Google map pack — the three results that capture most of the calls and direction requests in your suburb. We do the unglamorous work that wins those spots.",
    sections: [
      {
        heading: "Google Business Profile optimisation",
        paragraphs: [
          "We rebuild your GBP from the ground up: correct categories, services, products, attributes, photos, posts, FAQ, and review responses. Every field is a ranking signal.",
          "We also align your business name, address, and phone (NAP) across every directory we can find — Yelp, True Local, Yellow Pages, industry-specific listings — so Google sees consistent data.",
        ],
      },
      {
        heading: "Suburb-level service pages",
        paragraphs: [
          "Generic 'we serve Melbourne' copy does not rank for suburb-level searches. We build dedicated, unique pages for each area you serve — landmarks, transport, neighbourhood-specific pain points, and local FAQs.",
          "These pages also feed Google's understanding of your service area, which directly improves map pack rankings for nearby searches.",
        ],
      },
      {
        heading: "Reviews and reputation",
        paragraphs: [
          "Volume, recency, and review keyword content all affect map pack rankings. We build review request flows into your booking confirmations and respond on your behalf so the conversation stays active.",
          "We also clean up old listings and resolve spam reviews via the Google Business escalation process where appropriate.",
        ],
      },
    ],
    faqs: [
      {
        question: "How is local SEO different from regular SEO?",
        answer:
          "Regular SEO targets organic blue-link rankings. Local SEO targets the map pack — the three Google Business results that show with a map at the top of suburb-level searches. Different signals, different work.",
      },
      {
        question: "Will I rank in every Melbourne suburb?",
        answer:
          "Map pack visibility is proximity-weighted, so distance from the searcher matters. We build targeted area pages and citation strategies for each suburb you actually serve — and we set realistic expectations based on competition.",
      },
      {
        question: "What if I don't have a public address?",
        answer:
          "You can still rank as a service-area business. We configure your GBP and on-site schema as a service-area model so Google knows where you serve without exposing a home address.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "Google map pack Melbourne",
      "GMB optimisation Melbourne",
      "local search Melbourne",
      "Google Business Profile Melbourne",
      "near me SEO Melbourne",
    ],
    related: ["seo-melbourne", "small-business-marketing-melbourne", "google-ads-management-melbourne"],
    wordCountTarget: 1700,
  },
  {
    slug: "branding-agency-melbourne",
    keyword: "Branding Agency Melbourne",
    metaTitle:
      "Best Branding Agency Melbourne | Olive Marketing — Brand Strategy, Identity Design & Visual Systems Near Me",
    metaDescription:
      "Melbourne branding agency for ambitious local businesses — brand strategy, identity design, naming, voice, and full visual systems. Servicing Preston, Richmond, Northcote, Brunswick, South Yarra, Carlton and Melbourne CBD.",
    h1: "Branding Agency Melbourne",
    intro:
      "We build brands for Melbourne businesses that want to grow past the lookalike phase — beyond the same olive-and-cream Instagram template every café, clinic, and salon is using.",
    sections: [
      {
        heading: "Strategy first, identity second",
        paragraphs: [
          "Logos do not move revenue. Positioning does. We start with a positioning workshop — who you are for, what you stand for, and what nobody else in your Melbourne market is willing to say.",
          "From there we build a strategy doc your whole team can use: voice, vocabulary, visual principles, and the proof points that make every piece of marketing land.",
        ],
      },
      {
        heading: "Identity systems that scale",
        paragraphs: [
          "We design wordmarks, monograms, colour, type, motion, photography direction, and imagery rules. Everything is delivered in a Figma library + a brand book your team can hand to any future designer.",
          "Each system is tested across business cards, signage, social, packaging and digital — because a brand that only looks great on a Behance shot does not survive a real Saturday on Brunswick Street.",
        ],
      },
      {
        heading: "Brand voice and naming",
        paragraphs: [
          "Naming is where most Melbourne agencies tap out. We name new businesses, new lines, new offers — we screen IP availability, .com.au domains, and trademark conflicts before we present.",
          "Voice work covers tone, vocabulary, do-not-use lists, signature phrases, and team prompts for AI tools so your output stays consistent.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does branding cost in Melbourne?",
        answer:
          "Branding projects sit between AUD 8,500 (identity refresh) and AUD 45,000 (full strategy + identity + naming + brand book + rollout). We send fixed-scope proposals after a 45-minute discovery.",
      },
      {
        question: "Do you do logo-only projects?",
        answer:
          "No. A logo without strategy and a system is decoration. The smallest engagement we run is a positioning sprint + identity, which typically takes 4 weeks.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "brand strategy Melbourne",
      "logo design Melbourne",
      "brand identity designer Melbourne",
      "naming agency Melbourne",
      "rebranding Melbourne",
    ],
    related: ["luxury-website-design-melbourne", "small-business-marketing-melbourne", "marketing-strategy-melbourne"],
    wordCountTarget: 1700,
  },
  {
    slug: "lead-generation-melbourne",
    keyword: "Lead Generation Melbourne",
    metaTitle:
      "Best Lead Generation Melbourne | Olive Marketing — B2B & Local Lead Funnels, Paid Ads & High-Converting Pages Near Me",
    metaDescription:
      "Lead generation for Melbourne businesses — paid ads, landing pages, CRM integration, and follow-up automation. Predictable pipeline for trades, professional services, agencies and local consumer brands across Greater Melbourne.",
    h1: "Lead Generation Melbourne",
    intro:
      "We design and run lead generation systems for Melbourne businesses that need predictable booked calls and quotes — not just traffic.",
    sections: [
      {
        heading: "The lead generation system, end to end",
        paragraphs: [
          "Every campaign we run has the same five pieces: offer, audience, ad creative, landing page, and follow-up. We build all five — most agencies only run one or two.",
          "We start with offer design because a great ad on a weak offer still loses money. Then we build the landing page, then we run paid social and Google Ads, then we wire up follow-up SMS and email.",
        ],
      },
      {
        heading: "Channels we run for Melbourne clients",
        paragraphs: [
          "Meta (Facebook + Instagram) and Google Search drive most of our lead volume. TikTok works for younger consumer brands. LinkedIn for B2B. We pick the channel where your buyers actually convert — and never run on autopilot.",
          "We integrate with your CRM (HubSpot, Pipedrive, GoHighLevel, GlossGenius, Square) so leads flow straight into the pipeline you already use.",
        ],
      },
      {
        heading: "Reporting tied to revenue, not clicks",
        paragraphs: [
          "Every Monday you get a report showing cost per lead, lead-to-quote rate, and quote-to-close rate by source. We tune the campaign to whichever channel is producing booked revenue, not whichever has the cheapest clicks.",
        ],
      },
    ],
    faqs: [
      {
        question: "What's a typical cost per lead in Melbourne?",
        answer:
          "Highly variable — Melbourne tradies see AUD 25–80 per qualified lead, professional services AUD 60–250, B2B AUD 120–500. We share benchmarks for your specific category before you commit.",
      },
      {
        question: "Do you guarantee a number of leads?",
        answer:
          "We guarantee process and reporting, not lead volume — anyone who promises specific numbers is gambling with your budget. What we do offer is a 90-day performance review with the option to walk if KPIs are not on track.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "lead generation agency Melbourne",
      "Melbourne lead gen",
      "B2B lead generation Melbourne",
      "appointment booking funnel Melbourne",
      "paid lead generation Melbourne",
    ],
    related: ["google-ads-management-melbourne", "high-converting-landing-pages", "conversion-rate-optimization-melbourne"],
    wordCountTarget: 1800,
  },
  {
    slug: "conversion-rate-optimization-melbourne",
    keyword: "Conversion Rate Optimization Melbourne",
    metaTitle:
      "Best Conversion Rate Optimization Melbourne | Olive Marketing — CRO, A/B Testing & Funnel Analytics Near Me",
    metaDescription:
      "CRO and conversion rate optimisation for Melbourne websites — heatmaps, A/B testing, funnel analytics, and landing page rebuilds. Turn the traffic you already have into more booked enquiries and online sales.",
    h1: "Conversion Rate Optimization Melbourne",
    intro:
      "CRO is how you make the traffic you already have worth more. For most Melbourne businesses, doubling conversion rate doubles revenue without spending another dollar on ads.",
    sections: [
      {
        heading: "Diagnose the leaks",
        paragraphs: [
          "We install heatmaps, session recordings, and funnel analytics to see where your visitors drop off. Then we run user testing with five real Melbourne customers to hear, in their own words, why they hesitated.",
          "The output is a prioritised list of friction points — not opinions, evidence.",
        ],
      },
      {
        heading: "A/B testing program",
        paragraphs: [
          "We run rolling experiments: hero copy, CTA placement, form length, social proof, pricing presentation. Each test runs for two weeks minimum and graduates only when it hits statistical significance.",
          "Tests are sequenced so they compound — every winner becomes the new baseline for the next test.",
        ],
      },
      {
        heading: "Landing page rebuilds",
        paragraphs: [
          "When a page is too broken to test incrementally, we rebuild from scratch with the offer, proof, and CTA architecture that has worked for similar Melbourne businesses.",
          "Average lift across our rebuilds is 38% on form submissions and 22% on booked calls, measured 60 days post-launch.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much traffic do I need before CRO is worth it?",
        answer:
          "Roughly 1,500 unique visitors per month per page is the floor for statistically significant testing. Below that we focus on qualitative research, persuasive copywriting, and funnel-architecture rebuilds rather than A/B tests.",
      },
      {
        question: "How long do CRO programs take?",
        answer:
          "Initial diagnostic + rebuild takes 4–6 weeks. Ongoing testing programs are monthly retainers. Most clients see meaningful conversion lift within 60 days.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "CRO agency Melbourne",
      "A/B testing Melbourne",
      "landing page optimisation Melbourne",
      "user research Melbourne",
      "funnel analytics Melbourne",
    ],
    related: ["high-converting-landing-pages", "lead-generation-melbourne", "web-design-melbourne"],
    wordCountTarget: 1500,
  },
  {
    slug: "google-ads-management-melbourne",
    keyword: "Google Ads Management Melbourne",
    metaTitle:
      "Best Google Ads Management Melbourne | Olive Marketing — Search, Performance Max & Local Ads Specialists Near Me",
    metaDescription:
      "Google Ads management for Melbourne businesses — Search, Performance Max, Local Service Ads, and YouTube. Daily optimisation, transparent reporting, and conversion-tracked campaigns across Greater Melbourne.",
    h1: "Google Ads Management Melbourne",
    intro:
      "Most Google Ads accounts we audit waste 30–60% of spend on broad keywords, irrelevant placements, and the wrong campaign type. We rebuild them so every dollar is tracked back to a quote or booking.",
    sections: [
      {
        heading: "Account audit and rebuild",
        paragraphs: [
          "Step one is a deep audit: search terms, negative keywords, conversion tracking, asset coverage, audience signals, geo targeting. We rebuild whatever is broken before we touch the budget.",
          "We also fix conversion tracking — the single most common reason Melbourne accounts underperform is that the conversion event is wrong, missing, or counting the same lead twice.",
        ],
      },
      {
        heading: "Campaign structure for Melbourne intent",
        paragraphs: [
          "We structure campaigns by intent: high-intent search, branded search, retargeting, awareness, and Performance Max as a controlled feed-driven layer. Each campaign has its own goals and budget caps.",
          "Geo-bidding is set per suburb so you do not waste budget on Sydney or Adelaide impressions, and so cost-per-click in priority suburbs reflects actual lead value.",
        ],
      },
      {
        heading: "Reporting and weekly optimisation",
        paragraphs: [
          "Weekly we tune negatives, bids, creative rotations, and audience signals. Monthly you get a written report with the wins, losses, and the next month's plan — no marketing jargon.",
        ],
      },
    ],
    faqs: [
      {
        question: "What's the minimum Google Ads budget worth running in Melbourne?",
        answer:
          "AUD 1,500/month media is the floor for meaningful Search results. Below that, you cannot test enough variations or capture enough conversion data to optimise. Performance Max needs at least AUD 3,000/month to learn properly.",
      },
      {
        question: "What's your management fee?",
        answer:
          "Tiered: AUD 850/month for accounts under AUD 5k spend, AUD 1,650/month for AUD 5k–15k, custom above that. No setup fees, no lock-in.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "Google Ads agency Melbourne",
      "PPC Melbourne",
      "AdWords Melbourne",
      "Performance Max Melbourne",
      "Google Search Ads Melbourne",
    ],
    related: ["lead-generation-melbourne", "local-seo-melbourne", "conversion-rate-optimization-melbourne"],
    wordCountTarget: 1700,
  },
  {
    slug: "social-media-marketing-melbourne",
    keyword: "Social Media Marketing Melbourne",
    metaTitle:
      "Best Social Media Marketing Melbourne | Olive Marketing — Instagram, TikTok, Meta Ads & Content Strategy Near Me",
    metaDescription:
      "Social media marketing Melbourne — Instagram, TikTok, Meta Ads, and content strategy for local businesses. Organic content systems plus paid social for predictable reach and bookings across Greater Melbourne.",
    h1: "Social Media Marketing Melbourne",
    intro:
      "We run social media for Melbourne businesses that need bookings, not likes. Organic content systems plus paid social, measured against revenue.",
    sections: [
      {
        heading: "Organic content systems",
        paragraphs: [
          "We build a content engine: monthly shoot day, captions written for SEO discovery, scheduled posting, and a comment-management workflow. Your team is involved twice a month, not daily.",
          "Reels, carousels, and short-form video are the core formats — they earn reach without paid amplification when the hook works.",
        ],
      },
      {
        heading: "Paid social — Meta, TikTok and beyond",
        paragraphs: [
          "Paid runs in parallel: lead-gen campaigns, retargeting, look-alike audiences, and creative testing. We rotate ad sets weekly and refresh creative every two weeks to keep CPM stable.",
          "Every campaign has a destination — landing page, booking flow, DM funnel — that closes the loop into your CRM.",
        ],
      },
      {
        heading: "Influencer and creator partnerships",
        paragraphs: [
          "When it suits the brand, we run paid partnerships with Melbourne micro-creators who genuinely use your product or service. Higher trust, lower CPM, longer-tail reach.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does social media marketing cost in Melbourne?",
        answer:
          "Organic-only retainers start at AUD 1,800/month. Combined organic + paid (with AUD 2,500+ media) starts at AUD 3,500/month. We tailor the split to your category.",
      },
      {
        question: "Do you create the content too?",
        answer:
          "Yes — we run quarterly content shoots in Melbourne with our photographer + videographer team. Or we can direct your in-house team if you prefer to keep production internal.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "Instagram marketing Melbourne",
      "TikTok marketing Melbourne",
      "Facebook ads Melbourne",
      "Meta ads agency Melbourne",
      "content creator Melbourne",
    ],
    related: ["google-ads-management-melbourne", "branding-agency-melbourne", "lead-generation-melbourne"],
    wordCountTarget: 1600,
  },
  {
    slug: "marketing-strategy-melbourne",
    keyword: "Marketing Strategy Melbourne",
    metaTitle:
      "Best Marketing Strategy Melbourne | Olive Marketing — Strategic Planning, Positioning & Channel Mix Near Me",
    metaDescription:
      "Marketing strategy consulting for Melbourne businesses — positioning, channel mix, growth modelling, and 12-month roadmaps. For founders and marketing leaders ready to stop guessing.",
    h1: "Marketing Strategy Melbourne",
    intro:
      "Strategy work for Melbourne businesses past the founder-tactics phase — when you need a real plan, not another set of campaigns.",
    sections: [
      {
        heading: "Positioning workshop",
        paragraphs: [
          "We start with two days of positioning work — interviews with your team and customers, competitive teardown, and a written positioning statement that survives marketing-team turnover.",
        ],
      },
      {
        heading: "Channel mix and growth modelling",
        paragraphs: [
          "We model your CAC and LTV by channel, then design a channel mix that hits your 12-month revenue target without overspending on any single channel.",
          "Outputs include a channel-by-channel budget, a quarterly campaign calendar, and the operational structure (in-house, agency, contractors) you'll need.",
        ],
      },
      {
        heading: "12-month roadmap and KPIs",
        paragraphs: [
          "Every strategy ends with a 12-month roadmap: what to build, what to test, what to retire. Plus the KPIs that matter and the cadence to review them.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who is this for?",
        answer:
          "Founders and marketing leaders at Melbourne businesses doing AUD 1M–20M revenue who need a plan they can execute against. Not for pre-revenue startups — those need positioning and a first channel, not a full strategy.",
      },
      {
        question: "How long is the engagement?",
        answer:
          "Strategy sprints run 4 weeks. Strategy + ongoing fractional CMO retainers run 6–12 months.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "marketing consultant Melbourne",
      "fractional CMO Melbourne",
      "marketing planning Melbourne",
      "go to market Melbourne",
      "marketing roadmap Melbourne",
    ],
    related: ["branding-agency-melbourne", "lead-generation-melbourne", "small-business-marketing-melbourne"],
    wordCountTarget: 1500,
  },
  {
    slug: "ai-automation-for-businesses",
    keyword: "AI Automation for Businesses",
    metaTitle:
      "Best AI Automation for Melbourne Businesses | Olive Marketing — AI Workflows, Chatbots & Lead Qualification Near Me",
    metaDescription:
      "AI automation for Melbourne businesses — automated lead qualification, customer support chatbots, content generation, and operations workflows. Practical AI integrations that save 10+ hours a week.",
    h1: "AI Automation for Melbourne Businesses",
    intro:
      "Most AI hype is noise. We build the small, boring AI workflows that actually save Melbourne businesses time — lead qualification, customer support triage, content generation, and operational glue.",
    sections: [
      {
        heading: "Lead qualification and routing",
        paragraphs: [
          "We build AI agents that read inbound enquiries, qualify them against your ideal-customer profile, write a tailored first response, and route the lead to the right team member with full context.",
          "The result: faster response times, fewer junk consultations, and your senior staff only seeing leads worth their time.",
        ],
      },
      {
        heading: "Content generation and editorial workflows",
        paragraphs: [
          "We build content pipelines that draft blog posts, social captions, product copy, and email sequences in your brand voice — with humans editing for nuance, not generating from scratch.",
        ],
      },
      {
        heading: "Operations and integrations",
        paragraphs: [
          "We connect your stack — CRM, calendar, billing, email, Slack, project management — with AI agents that do the repetitive tasks your team already hates. Quote drafting, invoice chasing, project status updates, customer-success check-ins.",
        ],
      },
    ],
    faqs: [
      {
        question: "What tools do you build with?",
        answer:
          "n8n, Make.com, Zapier, custom Python/Node scripts on Vercel, and Anthropic Claude or OpenAI for the LLM layer. Stack depends on the workflow's reliability and budget needs.",
      },
      {
        question: "How much does AI automation cost?",
        answer:
          "Discrete workflows are AUD 1,500–6,000 each (one-off build). Ongoing automation programs that build 4–8 workflows are AUD 4,500/month retainers.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "AI consultant Melbourne",
      "business automation Melbourne",
      "chatbot Melbourne",
      "n8n consultant Melbourne",
      "GPT integration Melbourne",
    ],
    related: ["lead-generation-melbourne", "marketing-strategy-melbourne", "small-business-marketing-melbourne"],
    wordCountTarget: 1500,
  },
  {
    slug: "high-converting-landing-pages",
    keyword: "High-Converting Landing Pages",
    metaTitle:
      "Best Landing Page Design Melbourne | Olive Marketing — High-Converting Landing Pages for Ads & Lead Gen Near Me",
    metaDescription:
      "High-converting landing page design for Melbourne ad campaigns — Meta, Google, TikTok, LinkedIn. Built on Next.js with full conversion tracking, A/B testing infrastructure, and CRM integration.",
    h1: "High-Converting Landing Pages — Melbourne",
    intro:
      "If you're paying for traffic, your landing page is the difference between profit and waste. We build landing pages on Next.js that load fast, look premium, and convert.",
    sections: [
      {
        heading: "Conversion-focused architecture",
        paragraphs: [
          "Every landing page follows the same proven structure: above-the-fold offer + visual proof, problem and stakes, our solution, social proof, mechanism, FAQ, final CTA. We adapt the copy and creative — not the structure.",
          "Pages are mobile-first because 70%+ of Melbourne ad traffic is on phone.",
        ],
      },
      {
        heading: "Built on Next.js and Vercel",
        paragraphs: [
          "We don't build on bloated drag-and-drop builders. Each landing page ships as production Next.js code with sub-second LCP, full conversion tracking, A/B test scaffolding, and CRM webhooks.",
        ],
      },
      {
        heading: "Tracking, attribution, and iteration",
        paragraphs: [
          "Every page ships with Google Tag Manager, Meta CAPI, and your CRM event triggers wired up correctly. We monitor performance for 30 days post-launch and ship the first three optimisation rounds at no extra cost.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does a landing page cost?",
        answer:
          "Single landing page builds are AUD 2,800–6,500 depending on copywriting and design depth. Bundles of 3+ pages get a discount and shared design system.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "landing page designer Melbourne",
      "Unbounce alternative Melbourne",
      "PPC landing page Melbourne",
      "Meta ads landing page Melbourne",
      "Next.js landing page Melbourne",
    ],
    related: ["lead-generation-melbourne", "google-ads-management-melbourne", "conversion-rate-optimization-melbourne"],
    wordCountTarget: 1300,
  },
  {
    slug: "ecommerce-website-design-melbourne",
    keyword: "E-commerce Website Design Melbourne",
    metaTitle:
      "Best E-commerce Website Design Melbourne | Olive Marketing — Shopify, Custom Storefronts & DTC Builds Near Me",
    metaDescription:
      "E-commerce website design Melbourne — Shopify, custom Next.js storefronts, and DTC builds for fashion, beauty, food, and lifestyle brands. Full conversion architecture, abandoned-cart automation, and analytics.",
    h1: "E-commerce Website Design Melbourne",
    intro:
      "We design and build online stores for Melbourne brands serious about DTC — fast, on-brand, and built to scale past the AUD 1M revenue line where most off-the-shelf themes break.",
    sections: [
      {
        heading: "Platforms and stack",
        paragraphs: [
          "Shopify for most brands under AUD 5M revenue. Custom Next.js + Shopify Hydrogen or Sanity + Stripe for premium brands that need editorial freedom.",
          "We pick the stack based on your team's operational reality, not the trendiest platform.",
        ],
      },
      {
        heading: "Conversion architecture for product pages",
        paragraphs: [
          "Product page conversion is where most Melbourne e-commerce stores leak money: above-the-fold image quality, variant selectors, social proof, shipping clarity, and the trust block above checkout.",
          "We rebuild every PDP based on what's working in your category, then test variations against the baseline.",
        ],
      },
      {
        heading: "Email, SMS, and abandoned cart automation",
        paragraphs: [
          "We wire Klaviyo or Postscript with welcome series, abandoned cart, post-purchase, and win-back flows. Most stores get 25–35% of revenue from email + SMS within 90 days.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much does e-commerce design cost?",
        answer:
          "Shopify builds: AUD 9,000–28,000. Custom headless: AUD 35,000–120,000. Migrations from Squarespace, Wix or older Shopify: AUD 7,000–18,000.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "Shopify designer Melbourne",
      "DTC website Melbourne",
      "online store design Melbourne",
      "headless commerce Melbourne",
      "Shopify Plus Melbourne",
    ],
    related: ["luxury-website-design-melbourne", "branding-agency-melbourne", "conversion-rate-optimization-melbourne"],
    wordCountTarget: 1500,
  },
  {
    slug: "website-redesign-services-melbourne",
    keyword: "Website Redesign Services Melbourne",
    metaTitle:
      "Best Website Redesign Services Melbourne | Olive Marketing — Modern Rebuilds, SEO Migrations & UX Overhauls Near Me",
    metaDescription:
      "Website redesign services for Melbourne businesses — modern rebuilds, SEO-safe migrations, performance overhauls, and accessibility upgrades. Keep your rankings, gain conversions.",
    h1: "Website Redesign Services Melbourne",
    intro:
      "Most website redesigns lose 20–40% of organic traffic in the first 90 days because the migration is botched. We redesign the experience without breaking what already ranks.",
    sections: [
      {
        heading: "SEO-safe migration framework",
        paragraphs: [
          "Before the design starts, we crawl every URL on the existing site, capture rankings and traffic, and build a redirect map. After launch we monitor 404s, indexation, and rank movements daily for 60 days.",
          "Most Melbourne agencies skip this step — that's why most redesigns hurt SEO.",
        ],
      },
      {
        heading: "When a redesign is the right call",
        paragraphs: [
          "If your site is on Wix/Squarespace and growing past it, if your brand has shifted, if conversion is broken, or if your stack is locked into an agency you can't fire — those are good redesign reasons.",
          "If you just want it to 'look fresh' without measurable problems, we'll talk you out of a full redesign and into a focused refresh instead.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will a redesign hurt my SEO?",
        answer:
          "Only if it's done badly. With a proper redirect map, schema migration, and indexation monitoring, traffic recovers within 60–90 days and usually grows past the old baseline within 6 months.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "website refresh Melbourne",
      "rebuild website Melbourne",
      "website migration Melbourne",
      "Squarespace to Shopify Melbourne",
      "website overhaul Melbourne",
    ],
    related: ["web-design-melbourne", "seo-melbourne", "conversion-rate-optimization-melbourne"],
    wordCountTarget: 1300,
  },
  {
    slug: "small-business-marketing-melbourne",
    keyword: "Small Business Marketing Melbourne",
    metaTitle:
      "Best Small Business Marketing Melbourne | Olive Marketing — Affordable Local SEO, Web Design & Lead Generation Near Me",
    metaDescription:
      "Small business marketing Melbourne — affordable, practical marketing for trades, local services, retail, and professional services across Preston, Richmond, Northcote, Brunswick, South Yarra, Carlton and Greater Melbourne.",
    h1: "Small Business Marketing Melbourne",
    intro:
      "We work with Melbourne small businesses — trades, clinics, retail, professional services — that need real marketing without an enterprise budget or an in-house team.",
    sections: [
      {
        heading: "What's included in a small business package",
        paragraphs: [
          "A typical package covers local SEO, Google Business Profile management, a fast small-business website, monthly content, and either Meta or Google Ads. We pick the channels that fit your buyer.",
          "We bundle so you get one invoice, one team, and one report — not five contractors arguing over attribution.",
        ],
      },
      {
        heading: "Predictable monthly retainers",
        paragraphs: [
          "Retainers start at AUD 1,500/month inclusive of media for very local businesses, and scale to AUD 4,500/month for multi-suburb operations.",
          "No setup fees, no lock-in, and a 90-day performance review where you can walk if it isn't working.",
        ],
      },
      {
        heading: "What good looks like at 6 months",
        paragraphs: [
          "Month 6 typical outcomes: top-3 map pack ranking in your primary suburb, 30–80 inbound enquiries per month, and a clear monthly revenue attribution to marketing — so the next year's budget is a numbers conversation, not a guess.",
        ],
      },
    ],
    faqs: [
      {
        question: "I'm a sole trader — is this overkill?",
        answer:
          "Possibly. If you're under AUD 200k revenue we'll usually start with a Google Business Profile rebuild + a simple lead-gen page rather than a full retainer.",
      },
      {
        question: "Do you have minimum contracts?",
        answer:
          "No lock-in. We earn the work month-to-month. Most clients stay 12+ months because the system compounds.",
      },
    ],
    intent: "commercial",
    semanticKeywords: [
      "marketing for small business Melbourne",
      "affordable marketing Melbourne",
      "local marketing Melbourne",
      "Melbourne tradie marketing",
      "professional services marketing Melbourne",
    ],
    related: ["local-seo-melbourne", "web-design-melbourne", "google-ads-management-melbourne"],
    wordCountTarget: 1700,
  },
];

export function getMelbourneServiceBySlug(slug: string): MelbourneService | undefined {
  return MELBOURNE_SERVICES.find((s) => s.slug === slug);
}

export function getMelbourneServiceSlugs(): string[] {
  return MELBOURNE_SERVICES.map((s) => s.slug);
}
