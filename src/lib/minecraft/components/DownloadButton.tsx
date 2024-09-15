import { useTranslate } from "@/components/TranslateContext.tsx";
import Button from "@/components/ui/react/Button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/shadcn/dialog.tsx";
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
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" className="w-full" variant="white-shimmer" onClick={handleCompile} onKeyDown={handleCompile}>
                    {translate["tools.download"]}
                    <span className="text-xs ml-2">(.zip)</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-x-2">
                        <img src="/icons/success.svg" alt="zip" className="size-6" />
                        {translate["dialog.success.title"]}
                    </DialogTitle>
                    <DialogDescription>
                        <div className="py-2">
                            <span className="text-zinc-200">{translate["dialog.success.description"]}</span>{" "}
                            <span className="font-semibold text-zinc-400">"Modified-{context.name}"</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-700 rounded-full" />
                        <div className="pt-8">
                            <h4 className="font-semibold">{translate["dialog.success.additional_info_title"]}</h4>
                            <ul className="list-disc list-inside pt-4 space-y-2 pl-4">
                                <li>
                                    <span className="font-light">{translate["dialog.success.additional_info"]}</span>
                                </li>
                            </ul>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-4 flex items-end justify-between">
                    <div>
                        <a
                            href="https://discord.gg/TAmVFvkHep"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="discord"
                            className="hover:opacity-50 transition"
                        >
                            <img src="/icons/company/discord.svg" alt="Discord" className="size-6 invert" />
                        </a>
                    </div>
                    <Button
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://streamelements.com/hardoudou/tip"
                        variant="white-shimmer"
                    >
                        {translate["dialog.footer.donate"]}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
