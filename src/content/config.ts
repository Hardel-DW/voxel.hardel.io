import {z, defineCollection} from "astro:content";

const articleCollection = defineCollection({
    schema: z.object({
        draft: z.boolean().default(false),
        author: z.string().default("Hardel")
    })
});

const courseCollection = defineCollection({
    type: "data",
    schema: z.object({
        metadata: z.object({
            draft: z.boolean(),
            title: z.string(),
            short: z.string(),
            snippet: z.string(),
            author: z.string(),
            tags: z.array(z.string()),
            publishDate: z.string().transform((str) => new Date(str)),
            images: z.object({
                src: z.string(),
                alt: z.string()
            })
        }),
        premium: z.object({
            product_id: z.string(),
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
        }),
        navigation: z.array(
            z.object({
                title: z.string(),
                slug: z.string(),
                logo: z.string()
            })
        ),
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
        )
    })
});

export const collections = {
    article: articleCollection,
    course: courseCollection
};
