import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/tools/ConfiguratorContext.tsx";
import Button from "@/components/ui/react/Button.tsx";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { compileDatapack } from "@/lib/minecraft/core/engine/Compiler.ts";
import { generateZip } from "@/lib/minecraft/mczip.ts";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function DownloadButton<T extends keyof Analysers>() {
    const { translate } = useTranslate();
    const context = useConfigurator<GetAnalyserVoxel<T>>();

    const handleCompile = async () => {
        const content = compileDatapack(context);
        const compiledContent = await generateZip(context.files, content, context.minify, context.logger);
        const fileExtension = context.isJar ? "jar" : "zip";
        const blob = new Blob([compiledContent], {
            type: `application/${fileExtension}`
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${context.name}.${context.isJar ? "jar" : "zip"}`;
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
                    <DialogDescription>{translate["dialog.success.description"]}</DialogDescription>
                    <div className="py-2">
                        <span className="font-semibold text-zinc-400">{`${context.name}.${context.isJar ? "jar" : "zip"}`}</span>
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
                </DialogHeader>
                <DialogFooter className="pt-4 flex items-end justify-between">
                    <div>
                        <a
                            href="https://discord.gg/TAmVFvkHep"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="discord"
                            className="hover:opacity-50 transition">
                            <img src="/icons/company/discord.svg" alt="Discord" className="size-6 invert" />
                        </a>
                    </div>
                    <Button
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://streamelements.com/hardoudou/tip"
                        variant="primary-shimmer">
                        {translate["dialog.footer.donate"]}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
