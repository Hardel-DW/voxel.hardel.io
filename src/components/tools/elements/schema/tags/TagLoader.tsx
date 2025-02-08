import { ToolTagCard } from "@/components/tools/elements/schema/tags/ToolTagCard";
import { useTranslate } from "@/components/useTranslate";
import { useTag } from "@/components/tools/elements/schema/tags/useTag";

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
    const filteredData = data?.filter((value) => !values?.includes(value));

    if (isLoading) {
        return (
            <div className="flex justify-between items-center bg-blue-50/5 ring-0 ring-zinc-700 transition-all hover:ring-1 px-6 py-4 rounded-xl">
                <div className="flex flex-col">
                    <h2 className="text-zinc-200 text-sm">{t("enchantment.component.tag_viewer.title")}</h2>
                    <p className="text-zinc-500 text-sm">{t("enchantment.component.tag_viewer.loading")}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="size-3 rounded-full bg-zinc-700 animate-bounce delay-700" />
                    <div className="size-3 rounded-full bg-zinc-700 animate-bounce delay-300" />
                    <div className="size-3 rounded-full bg-zinc-700 animate-bounce delay-700" />
                </div>
            </div>
        );
    }
    if (error) {
        return <div className="text-center py-6 text-zinc-500 text-sm">{t("enchantment.component.tag_viewer.error")}</div>;
    }
    if (!data) {
        return <div className="text-center py-6 text-zinc-500 text-sm">{t("enchantment.component.tag_viewer.error")}</div>;
    }

    return (
        <div className="space-y-2">
            {filteredData?.map((value) => (
                <ToolTagCard key={value} value={value} registry={registry} />
            ))}
        </div>
    );
}
