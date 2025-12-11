import { ContentCollection } from "@/lib/content/ContentCollection";

export interface MarketplaceItemData extends Record<string, unknown> {
    name: string;
    description?: string;
    items?: Record<string, string>;
}

class MarketplaceItemCollection extends ContentCollection<MarketplaceItemData> {
    protected readonly basePath = "marketplace/item";
    protected readonly type = "json" as const;
}

export const marketplaceItems = new MarketplaceItemCollection();
