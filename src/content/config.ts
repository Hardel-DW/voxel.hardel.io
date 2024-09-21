import { defineCollection, z } from "astro:content";
import * as translate from "@/content/i18n/en-us.json";

export type FaqType = {
    question: string;
    answer: string;
};

const articleCollection = defineCollection({
    schema: z.object({
        draft: z.boolean().default(false),
        author: z.string().default("Hardel")
    })
});

const guideCollection = defineCollection({
    type: "data",
    schema: z.object({
        metadata: z.object({
            draft: z.boolean(),
            title: z.string(),
            snippet: z.string(),
            description: z.string(),
            author: z.string(),
            locked: z.boolean(),
            tags: z.array(z.string()),
            publishDate: z.string().transform((str) => new Date(str)),
            images: z.object({
                src: z.string(),
                alt: z.string()
            })
        }),
        premium: z
            .object({
                product_id: z.string(),
                variant_id: z.string(),
                title: z.string(),
                description: z.string(),
                button: z.string(),
                price: z.number(),
                currency: z.string(),
                url: z.string(),
                items: z.array(z.string()),
                faq: z.array(
                    z.object({
                        question: z.string(),
                        answer: z.string()
                    })
                )
            })
            .optional(),
        navigation: z
            .array(
                z.object({
                    title: z.string(),
                    slug: z.string(),
                    logo: z.string()
                })
            )
            .optional(),
        sections: z.array(
            z.object({
                title: z.string(),
                slug: z.string(),
                article: z.array(
                    z.object({
                        title: z.string(),
                        redirect: z.string(),
                        time: z.string(),
                        description: z.string(),
                        premium: z.boolean().default(false)
                    })
                )
            })
        ),
        presentations: z
            .object({
                cards: z
                    .array(
                        z.object({
                            title: z.string(),
                            description: z.string()
                        })
                    )
                    .optional()
            })
            .optional()
    })
});

const i18nCollection = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        translations: z.object(
            (() => {
                const acc: { [key in keyof typeof translate.translations]?: z.ZodString } = {};
                for (const key of Object.keys(translate.translations) as (keyof typeof translate.translations)[]) {
                    acc[key] = z.string();
                }
                return acc;
            })() as {
                [key in keyof typeof translate.translations]: z.ZodString;
            }
        )
    })
});

const faqCollection = defineCollection({
    type: "data",
    schema: z.array(
        z.object({
            question: z.string(),
            answer: z.string()
        })
    )
});

const blogCollection = defineCollection({
    type: "content",
    schema: z.object({
        draft: z.boolean(),
        title: z.string(),
        snippet: z.string(),
        image: z.object({
            src: z.string(),
            alt: z.string()
        }),
        publishDate: z.coerce.date(),
        authors: z.array(z.string()),
        category: z.string()
    })
});

const teamCollection = defineCollection({
    type: "data",
    schema: z.object({
        name: z.string(),
        github: z.string(),
        image: z.object({
            src: z.string(),
            alt: z.string()
        })
    })
});

const timelineCollection = defineCollection({
    type: "data",
    schema: z.object({
        authors: z.array(z.string()),
        name: z.string()
    })
});

const updateCollection = defineCollection({
    schema: z.object({
        draft: z.boolean().default(false),
        publishDate: z.coerce.date(),
        version: z.string(),
        type: z.string()
    })
});

export const collections = {
    article: articleCollection,
    guide: guideCollection,
    i18n: i18nCollection,
    faq: faqCollection,
    blog: blogCollection,
    team: teamCollection,
    timeline: timelineCollection,
    update: updateCollection
};
