import { ToolTagCard } from "@/components/tools/elements/schema/tags/ToolTagCard";
import { useTranslate } from "@/components/useTranslate";
import { useTag } from "@/lib/minecraft/net/api/ComputedTag";

interface TagLoaderProps {
    registry: string;
    path: string;
    fileName: string;
    namespace?: string;
    values?: string[];
}

export function TagLoader({ registry, path, fileName, namespace, values }: TagLoaderProps) {
    const { data, isLoading, error } = useTag(registry, path, fileName, { namespace });
    const { t } = useTranslate();

    if (isLoading) {
        return (
            <div className="flex justify-between items-center bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl">
                <div className="flex flex-col">
                    <h2 className="text-zinc-200 text-sm">{t("enchantment.component.tag_viewer.title")}</h2>
                    <p className="text-zinc-500 text-sm">{t("enchantment.component.tag_viewer.loading")}</p>
                </div>
                <div className="w-16 h-16 bg-zinc-800 rounded-full animate-pulse" />
            </div>
        );
    }
    if (error) {
        return <div className="text-center py-6 text-zinc-500 text-sm">{t("enchantment.component.tag_viewer.error")}</div>;
    }
    if (!data) {
        return <div className="text-center py-6 text-zinc-500 text-sm">{t("enchantment.component.tag_viewer.no_entry")}</div>;
    }

    return (
        <div className="space-y-2">
            {data
                .filter((value) => values?.includes(value))
                .map((value) => (
                    <ToolTagCard key={value} value={value} />
                ))}
        </div>
    );
}
