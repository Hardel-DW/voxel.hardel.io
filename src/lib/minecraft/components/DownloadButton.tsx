import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { compileDatapack } from "@/lib/minecraft/core/engine/Compiler.ts";
import { generateZip } from "@/lib/minecraft/mczip.ts";

export default function DownloadButton<T extends keyof Analysers>() {
    const { translate } = useTranslate();
    const context = useConfigurator<GetAnalyserVoxel<T>>();

    const handleCompile = async () => {
        const content = await generateZip(context.files, compileDatapack(context));
        const blob = new Blob([content], { type: "application/zip" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Modified-${context.name}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button
            type="button"
            className="rounded-xl animate-shimmer bg-[linear-gradient(110deg,#FFFEFC,45%,#d0d0d0,55%,#FFFEFC)] bg-[length:200%_100%] text-black w-full py-2 font-medium border border-zinc-900 hover:opacity-75 transition border-t border-l"
            onClick={handleCompile}
            onKeyDown={handleCompile}
        >
            {translate["tools.download"]}
            <span className="text-xs ml-2">(.zip)</span>
        </button>
    );
}
