import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { funnelGenerationSchema, GeneratedFunnel } from './schemas';

export async function generateFunnelContent(wizardData: any): Promise<GeneratedFunnel | null> {
  try {
    const prompt = `
      You are an expert direct-response copywriter and conversion rate optimization specialist.
      Your task is to generate a highly persuasive, structured one-page sales funnel based on the provided product and business information.

      Collected Data:
      ${JSON.stringify(wizardData, null, 2)}

      Instructions:
      1. Use copywriting frameworks like AIDA (Attention, Interest, Desire, Action) or PAS (Problem, Agitation, Solution).
      2. Ensure the copy is persuasive, clear, readable, and highly specific to the product data provided.
      3. Tailor the tone to the "targetAudience" and "brandPersonality" if provided.
      4. DO NOT invent medical claims, scientific studies, customer reviews, or guarantees that are not explicitly stated or logically derived from the product data.
      5. Address the "painPoints" specified in the collected data.
      6. Select the most appropriate sections and order them logically for maximum conversion.
      7. The first section must be HERO, and the page should end with a strong CTA or OFFER.
      8. Output must strictly conform to the provided JSON schema.
    `;

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: funnelGenerationSchema,
      prompt: prompt,
      temperature: 0.7,
    });

    return object;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return null;
  }
}
