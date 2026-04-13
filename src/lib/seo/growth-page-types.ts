export type GrowthFaq = { question: string; answer: string };

export type GrowthSection = {
  heading: string;
  paragraphs: string[];
};

export type ProgrammaticGrowthPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl?: string | null;
  h1: string;
  intro: string;
  sections: GrowthSection[];
  faqs: GrowthFaq[];
};
