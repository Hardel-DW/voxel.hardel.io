type ContentType = "markdown" | "json";
export interface ContentEntry<T> {
    slug: string;
    data: T;
    content?: string;
}

const slugFromPath = (path: string): string => path.replace("../../../content/", "").replace(/\.(mdx?|json)$/, "");
function parseMarkdownFrontmatter<T extends Record<string, unknown>>(raw: string): { data: T; content: string } {
    const match = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/.exec(raw);
    if (!match) return { data: {} as T, content: raw };

    const data: Record<string, unknown> = {};
    for (const line of match[1].split("\n")) {
        const [key, ...values] = line.split(":");
        if (!key || !values.length) continue;

        const value = values
            .join(":")
            .trim()
            .replace(/^["']|["']$/g, "");
        const trimmedKey = key.trim();

        if (trimmedKey === "draft") data[trimmedKey] = value === "true";
        else if (trimmedKey === "publishDate") data[trimmedKey] = new Date(value);
        else data[trimmedKey] = value;
    }

    return { data: data as T, content: match[2] };
}

const markdownModules = import.meta.glob<string>(["../../../content/**/*.md", "../../../content/**/*.mdx"], {
    query: "?raw",
    import: "default",
    eager: true
});

const jsonModules = import.meta.glob<Record<string, unknown>>("../../../content/**/*.json", {
    import: "default",
    eager: true
});

export abstract class ContentCollection<T extends Record<string, unknown>> {
    protected abstract readonly basePath: string;
    protected abstract readonly type: ContentType;
    protected entries: ContentEntry<T>[] | null = null;

    protected loadEntries(): ContentEntry<T>[] {
        if (this.entries) return this.entries;

        const modules = this.type === "markdown" ? markdownModules : jsonModules;
        const prefix = `../../../content/${this.basePath}`;

        this.entries = Object.entries(modules)
            .filter(([path]) => path.startsWith(prefix))
            .map(([path, raw]) => {
                const slug = slugFromPath(path);

                if (this.type === "markdown") {
                    const { data, content } = parseMarkdownFrontmatter<T>(raw as string);
                    return { slug, data, content };
                }

                return { slug, data: raw as T };
            });

        return this.entries;
    }

    all(): ContentEntry<T>[] {
        return this.loadEntries();
    }

    find(predicate: (entry: ContentEntry<T>) => boolean): ContentEntry<T> | undefined {
        return this.loadEntries().find(predicate);
    }

    filter(predicate: (entry: ContentEntry<T>) => boolean): ContentEntry<T>[] {
        return this.loadEntries().filter(predicate);
    }

    bySlug(slug: string): ContentEntry<T> | undefined {
        return this.find((e) => e.slug === slug || e.slug.endsWith(`/${slug}`));
    }
}
