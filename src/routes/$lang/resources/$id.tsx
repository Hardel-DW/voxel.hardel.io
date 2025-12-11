import { createFileRoute } from "@tanstack/react-router";
import CompoundLayout from "@/components/layout/CompoundLayout";
import MarketplaceCard from "@/components/MarketplaceCard";
import { Button } from "@/components/ui/Button";
import Markdown from "@/components/ui/markdown";
import Star from "@/components/ui/Star";
import TriangleWave from "@/components/ui/triangle/TriangleWave";
import { marketplacePreviews } from "@/lib/content/MarketplacePreviewCollection";
import { downloadFile } from "@/lib/download";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/resources/$id")({
    component: MarketplaceDetailPage
});

function MarketplaceDetailPage() {
    const { lang, id } = Route.useParams();
    const translate = t(lang);
    const allPreviews = marketplacePreviews.byLang(lang);
    const preview = allPreviews.find((p) => p.slug.endsWith(`/${id}`));

    if (!preview) {
        return (
            <CompoundLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">{translate("marketplace.not_found")}</h1>
                        <Button to="/$lang/resources/asset" params={{ lang }} variant="primary">
                            {translate("marketplace.back")}
                        </Button>
                    </div>
                </div>
            </CompoundLayout>
        );
    }

    const recommendedPreviews = allPreviews.filter((p) => !p.slug.endsWith(`/${id}`)).slice(0, 2);
    const previewName = String(preview.data.name || preview.data.title || "Preview");
    const previewDescription = String(preview.data.description || "");
    const previewAsset = String(preview.data.asset || "");

    const handleDownload = async () => {
        await downloadFile(`/images/marketplace/${previewAsset}`, `${previewName}.webp`);
    };

    return (
        <CompoundLayout>
            <main className="mt-32 mb-20 relative w-full">
                <div
                    className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-10 blur-3xl"
                    style={{ backgroundImage: `url('/images/marketplace/${previewAsset}')` }}
                />

                <div className="px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-5/6 mx-auto justify-items-end relative">
                        <div className="space-y-8">
                            <div
                                className="h-fit w-fit px-8 relative before:absolute before:inset-4 before:-z-10 before:rounded-3xl before:blur-3xl before:bg-(image:--hover-image) before:opacity-50"
                                style={{ "--hover-image": `url('/images/marketplace/${previewAsset}')` } as React.CSSProperties}>
                                <img
                                    src={`/images/marketplace/${previewAsset}`}
                                    alt={previewName}
                                    className="w-full h-fit rounded-3xl relative opacity-90"
                                    loading="eager"
                                />
                            </div>

                            <Star />

                            <div className="grid w-full px-8">
                                <Button to="/$lang/resources/asset" params={{ lang }} variant="ghost">
                                    {translate("marketplace.back")}
                                </Button>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="w-full">
                            <Markdown content={preview.content} />
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div
                        id="bottom-bar"
                        className="z-50 bottom-8 bg-black/50 backdrop-blur-sm border-t container mx-auto border-t-zinc-800 rounded-3xl overflow-hidden transition-transform duration-300"
                        style={{ position: "fixed", insetInline: "32px", width: "100%" }}>
                        <div className="opacity-50">
                            <TriangleWave />
                        </div>

                        <div className="mx-auto py-6 px-12 z-100 relative">
                            <div className="flex justify-between items-center gap-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-4">
                                        <h1 className="text-2xl font-bold tracking-tight">{previewName}</h1>
                                    </div>
                                    <p className="text-zinc-400 text-sm">{previewDescription}</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Button onClick={handleDownload} size="md" variant="shimmer" className="w-full md:w-auto">
                                        {translate("marketplace.download")} - {previewName}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommended Products */}
                    {recommendedPreviews.length > 0 && (
                        <div className="mb-8 container mx-auto mt-32">
                            <div className="pb-8">
                                <h1 className="text-2xl font-bold tracking-tight">{translate("marketplace.recommended")}</h1>
                                <Star />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recommendedPreviews.map((recommendedPreview) => {
                                    const recommendedId = recommendedPreview.slug.split("/").pop() || "";
                                    const recommendedName = String(recommendedPreview.data.name || recommendedPreview.data.title || "");
                                    return (
                                        <MarketplaceCard
                                            key={recommendedPreview.slug}
                                            packId={recommendedId}
                                            packName={recommendedName}
                                            text={translate("marketplace.go")}
                                            lang={lang}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </CompoundLayout>
    );
}
