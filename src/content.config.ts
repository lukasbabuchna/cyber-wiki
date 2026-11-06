import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const source = z.object({
  title: z.string(),
  url: z.string().url(),
  author: z.string().optional(),
  year: z.union([z.string(), z.number()]).optional(),
  note: z.string().optional(),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        sources: z.array(source).min(1),
        furtherReading: z.array(source).default([]),
        difficulty: z.enum(['easy', 'advanced', 'hard']),
        reviewed: z.string().optional(),
        tags: z.array(z.string()).default([]),
      }),
    }),
  }),
};
