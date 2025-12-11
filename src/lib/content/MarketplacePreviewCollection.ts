import { ContentCollection } from "@/lib/content/ContentCollection";

export interface MarketplacePreviewData extends Record<string, unknown> {
    title?: string;
}

class MarketplacePreviewCollection extends ContentCollection<MarketplacePreviewData> {
    protected readonly basePath = "marketplace/preview";
    protected readonly type = "markdown" as const;

    byLang(lang: string) {
        return this.filter((entry) => entry.slug.includes(`/${lang}/`));
    }
}

export const marketplacePreviews = new MarketplacePreviewCollection();
