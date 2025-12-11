import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import CompoundLayout from "@/components/layout/CompoundLayout";
import Box from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";
import Disclosure from "@/components/ui/Disclosure";
import GroupItem from "@/components/ui/GroupItem";
import IconButton from "@/components/ui/IconButton";
import { marketplaceItems } from "@/lib/content/MarketplaceItemCollection";
import { marketplacePreviews } from "@/lib/content/MarketplacePreviewCollection";
import { downloadFile } from "@/lib/download";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/resources/asset")({
    component: MarketplacePage,
    head: ({ params }) => {
        const translate = t(params.lang);
        return {
            meta: [
                { title: translate("marketplace.seo.title") },
                { name: "description", content: translate("marketplace.seo.description") },
                { property: "og:image", content: "/images/opengraph/marketplace.webp" }
            ]
        };
    }
});

function MarketplacePage() {
    const { lang } = Route.useParams();
    const translate = t(lang);
    const [searchTerm, setSearchTerm] = useState("");
    const [layoutMode, setLayoutMode] = useState<"category" | "grid">("category");
    const [categoryFilters, setCategoryFilters] = useState<Record<string, boolean>>({});
    const allItems = marketplaceItems.all();
    const premiumPacks = marketplacePreviews.byLang(lang);

    const isCategoryVisible = (categoryId: string) => categoryFilters[categoryId] !== false;
    const handleDownload = async (assetUrl: string, assetName: string) => await downloadFile(assetUrl, assetName);
    const filteredItems = (items: Record<string, string>) => {
        if (!searchTerm) return items;
        return Object.fromEntries(Object.entries(items).filter(([, name]) => name.toLowerCase().includes(searchTerm.toLowerCase())));
    };

    return (
        <CompoundLayout>
            <main className="mt-40 mb-20 relative w-full">
                <section className="w-11/12 md:w-3/4 mx-auto my-16 relative z-20">
                    <h1 className="text-3xl lg:text-6xl lg:tracking-tight font-bold mt-1 lg:leading-tight">
                        {translate("marketplace.title")}
                    </h1>
                    <p className="text-zinc-400 mt-1 text-lg font-medium">{translate("marketplace.description")}</p>
                </section>

                <div
                    className="flex lg:flex-row flex-col gap-12 px-12"
                    data-layout-category={layoutMode === "category" ? "" : undefined}
                    data-layout-grid={layoutMode === "grid" ? "" : undefined}>
                    <aside className="shrink-0 w-full lg:w-1/5">
                        <label>
                            <input
                                type="text"
                                placeholder={translate("generic.search")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 rounded border border-zinc-800 bg-transparent text-white"
                            />
                        </label>

                        <div className="mt-6 flex flex-col gap-4">
                            <h3 className="text-2xl font-semibold tracking-tighter">{translate("marketplace.filters")}</h3>
                            <div className="grid divide-y divide-zinc-900 border-t-2 border-zinc-900">
                                <Disclosure heading="Layout" variant="minimal">
                                    <div className="mt-4 flex gap-2 select-none">
                                        <IconButton
                                            icon="/icons/layout/grid.svg"
                                            onClick={() => setLayoutMode("grid")}
                                            className={layoutMode === "grid" ? "bg-zinc-800" : ""}
                                        />
                                        <IconButton
                                            icon="/icons/layout/list.svg"
                                            onClick={() => setLayoutMode("category")}
                                            className={layoutMode === "category" ? "bg-zinc-800" : ""}
                                        />
                                    </div>
                                </Disclosure>

                                <Disclosure heading="Tags" variant="minimal">
                                    <div className="mt-4 flex flex-col gap-2 select-none">
                                        {allItems.map((category) => {
                                            const categoryId = category.data.name.toLowerCase();
                                            return (
                                                <label key={category.slug} htmlFor={categoryId} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={isCategoryVisible(categoryId)}
                                                        onChange={(e) =>
                                                            setCategoryFilters((prev) => ({
                                                                ...prev,
                                                                [categoryId]: e.target.checked
                                                            }))
                                                        }
                                                        id={categoryId}
                                                    />
                                                    <span>{category.data.name}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </Disclosure>
                            </div>
                        </div>
                    </aside>

                    <section className="w-full">
                        <div
                            className="in-data-layout-grid:grid in-data-layout-grid:grid-cols-marketplace in-data-layout-grid:gap-4 in-data-layout-category:flex in-data-layout-category:flex-col in-data-layout-category:gap-16"
                            id="marketplace">
                            <GroupItem title="Premium Packs">
                                {premiumPacks.map((pack) => {
                                    const packId = pack.slug.split("/").pop() || "";
                                    const packName = String(pack.data.name || pack.data.title || "");
                                    const packAsset = String(pack.data.asset || "");

                                    return (
                                        <div key={pack.slug} className="relative group/effect">
                                            <div
                                                className="absolute inset-0 -z-100 group-hover/effect:opacity-100 opacity-0 transition-opacity rounded-3xl blur-xl bg-contain bg-(image:--hover-image)"
                                                style={
                                                    {
                                                        "--hover-image": `url('/images/marketplace/card/${packId}.webp')`
                                                    } as React.CSSProperties
                                                }
                                            />
                                            <Box loading="lazy" image={`/images/marketplace/feature/${packId}.webp`} data-marketplace="">
                                                <h2 className="text-white font-semibold text-center line-clamp-1 mt-8">
                                                    {packName}
                                                </h2>
                                                <div className="flex gap-2 mt-6 w-full justify-center">
                                                    <Button
                                                        size="sm"
                                                        variant="default"
                                                        to="/$lang/resources/$id"
                                                        params={{ lang, id: packId }}>
                                                        {translate("generic.learn_more")}
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            handleDownload(`/images/marketplace/${packAsset}`, `${packName}.webp`)
                                                        }>
                                                        {translate("marketplace.download")}
                                                    </Button>
                                                </div>
                                            </Box>
                                        </div>
                                    );
                                })}
                            </GroupItem>

                            {allItems.map((category) => {
                                const categoryId = category.data.name.toLowerCase();
                                const visible = isCategoryVisible(categoryId);
                                if (!visible || !category.data.items) return null;
                                const items = filteredItems(category.data.items);
                                const itemEntries = Object.entries(items);
                                if (itemEntries.length === 0) return null;

                                return (
                                    <GroupItem key={category.slug} title={category.data.name}>
                                        {itemEntries.map(([assetUrl, assetName]) => (
                                            <Box key={assetUrl} loading="lazy" image={assetUrl} size="sm">
                                                <h2 className="text-white font-semibold text-center line-clamp-1 mt-8 item-name">
                                                    {assetName}
                                                </h2>
                                                <div className="flex flex-wrap gap-2 mt-6 w-full justify-center">
                                                    <Button
                                                        className="w-32"
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleDownload(assetUrl, assetName)}>
                                                        {translate("marketplace.download")}
                                                    </Button>
                                                </div>
                                            </Box>
                                        ))}
                                    </GroupItem>
                                );
                            })}

                            {allItems.length === 0 && premiumPacks.length === 0 && (
                                <div className="col-span-full text-center py-20">
                                    <p className="text-zinc-500">{translate("generic.no_results")}</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </CompoundLayout>
    );
}
