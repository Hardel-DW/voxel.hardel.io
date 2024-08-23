import { useTranslate } from "@/components/TranslateContext.tsx";
import { useEnchantments } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";
import { compileTags } from "@/lib/minecraft/core/Tag.ts";
import { compileDataPack } from "@/lib/minecraft/mczip.ts";

export default function DownloadButton() {
    const { files, enchantments, enchantmentTags } = useEnchantments();
    const { translate } = useTranslate();

    const handleCompile = async () => {
        const tags = compileTags(enchantmentTags);
        const dataPack = await compileDataPack(files, [...enchantments, ...tags]);

        const blob = new Blob([dataPack], { type: "application/zip" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "datapack.zip";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button
            type="button"
            className="bg-white text-white p-2 size-12 rounded-xl border-zinc-950 border-t-2 border-l-2"
            onClick={handleCompile}
            onKeyDown={handleCompile}
        >
            <img src="/icons/download.svg" alt={translate["tools.enchantments.download"]} className="w-auto" />
        </button>
    );
}
