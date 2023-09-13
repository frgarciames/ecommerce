import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const headerItemSchema = {
  schema: z.object({
    position: z.number(),
    name: z.string(),
    link: z.string(),
    children: z
      .array(
        z.object({
          name: z.string(),
          link: z.string(),
        }),
      )
      .optional(),
  }),
};

const header = defineCollection({
  schema: headerItemSchema.schema,
});

export const collections = { blog, header };
