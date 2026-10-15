import { z } from "zod";

export const heroSectionSchema = z.object({
  type: z.literal("HERO"),
  headline: z.string().describe("Attention-grabbing main headline"),
  subheadline: z.string().describe("Supporting headline explaining the main benefit"),
  primaryCtaText: z.string().describe("Text for the main call to action button"),
  imagePlacement: z.enum(["LEFT", "RIGHT", "CENTER"]),
});

export const problemSectionSchema = z.object({
  type: z.literal("PROBLEM"),
  headline: z.string(),
  description: z.string().describe("Empathetic copy explaining the customer's problem"),
});

export const benefitsSectionSchema = z.object({
  type: z.literal("BENEFITS"),
  headline: z.string(),
  benefits: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).min(3).max(6),
});

export const featuresSectionSchema = z.object({
  type: z.literal("FEATURES"),
  headline: z.string(),
  features: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).min(3).max(8),
});

export const offerSectionSchema = z.object({
  type: z.literal("OFFER"),
  headline: z.string(),
  price: z.number().optional(),
  originalPrice: z.number().optional(),
  currency: z.string().default("$"),
  ctaText: z.string(),
  guaranteeText: z.string().optional(),
});

export const faqSectionSchema = z.object({
  type: z.literal("FAQ"),
  headline: z.string().default("Frequently Asked Questions"),
  questions: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).min(3).max(8),
});

export const finalCtaSectionSchema = z.object({
  type: z.literal("FINAL_CTA"),
  headline: z.string(),
  subheadline: z.string(),
  ctaText: z.string(),
});

// The overarching schema that the AI must generate
export const funnelGenerationSchema = z.object({
  seoMetadata: z.object({
    title: z.string(),
    description: z.string(),
  }),
  theme: z.object({
    primaryColor: z.string().describe("Hex code for primary brand color"),
    fontStyle: z.enum(["MODERN", "CLASSIC", "PLAYFUL", "PROFESSIONAL"]),
  }),
  sections: z.array(
    z.discriminatedUnion("type", [
      heroSectionSchema,
      problemSectionSchema,
      benefitsSectionSchema,
      featuresSectionSchema,
      offerSectionSchema,
      faqSectionSchema,
      finalCtaSectionSchema,
    ])
  ).describe("An ordered array of sections composing the sales funnel. Must start with HERO and end with FINAL_CTA or OFFER."),
});

export type GeneratedFunnel = z.infer<typeof funnelGenerationSchema>;
