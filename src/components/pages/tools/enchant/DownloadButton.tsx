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
        <div className="mt-4">
            <button
                type="button"
                className="rounded-xl bg-white text-black w-full py-2 font-medium border border-zinc-900 hover:opacity-75 transition border-t border-l"
                onClick={handleCompile}
                onKeyDown={handleCompile}
            >
                {translate["tools.download"]}
                <span className="text-xs ml-2">(.zip)</span>
            </button>
        </div>
    );
}
