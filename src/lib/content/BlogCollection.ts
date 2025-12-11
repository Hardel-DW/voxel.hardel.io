import { ContentCollection } from "@/lib/content/ContentCollection";

export interface BlogPostData extends Record<string, unknown> {
    title: string;
    snippet: string;
    imageSrc: string;
    imageAlt: string;
    author: string;
    publishDate: Date;
    category: string;
    draft?: boolean;
    video?: string;
}

class BlogCollection extends ContentCollection<BlogPostData> {
    protected readonly basePath = "blog";
    protected readonly type = "markdown" as const;

    published() {
        return this.filter((entry) => !entry.data.draft && entry.data.publishDate < new Date()).sort(
            (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
        );
    }

    byLang(lang: string) {
        return this.published().filter((entry) => entry.slug.startsWith(`blog/${lang}/`) || entry.slug.includes(`/${lang}/`));
    }
}

export const blog = new BlogCollection();
