import { useTranslate } from "@/components/useTranslate";
import Button from "@/components/ui/react/Button.tsx";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog.tsx";
import type { versionedAnalyserCollection } from "@/lib/minecraft/core/engine/Analyser.ts";
import { compileDatapack } from "@/lib/minecraft/core/engine/Compiler.ts";
import { generateZip } from "@/lib/minecraft/mczip.ts";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";

export default function DownloadButton() {
    const { t } = useTranslate();
    const store = useConfiguratorStore();
    const isJar = store.isJar;
    const name = store.name;

    const handleCompile = async () => {
        if (!store.version || !store.configuration || !store.logger) {
            console.error("Version, configuration or logger is missing");
            return;
        }

        const content = compileDatapack({
            elements: store.elements,
            version: store.version,
            identifiers: store.identifiers,
            files: store.files,
            tool: store.configuration.analyser.id as keyof typeof versionedAnalyserCollection
        });

        const compiledContent = await generateZip(store.files, content, {
            minify: store.minify,
            logger: store.logger,
            includeVoxel: true
        });

        try {
            const response = await fetch("/api/migrations/log", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    logs: store.logger.getLogs()
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to save migration log: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error saving migration log:", error);
        }

        // Télécharger le fichier
        const fileExtension = store.isJar ? "jar" : "zip";
        const blob = new Blob([compiledContent], {
            type: `application/${fileExtension}`
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${store.name}.${store.isJar ? "jar" : "zip"}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" className="w-full" variant="white-shimmer" onClick={handleCompile} onKeyDown={handleCompile}>
                    {t("tools.download")}
                    <span className="text-xs ml-2">(.zip)</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-x-2">
                        <img src="/icons/success.svg" alt="zip" className="size-6" />
                        {t("dialog.success.title")}
                    </DialogTitle>
                    <DialogDescription>{t("dialog.success.description")}</DialogDescription>
                    <div className="py-2">
                        <span className="font-semibold text-zinc-400">{`${name}.${isJar ? "jar" : "zip"}`}</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-700 rounded-full" />
                    <div className="pt-8">
                        <h4 className="font-semibold">{t("dialog.success.additional_info_title")}</h4>
                        <ul className="list-disc list-inside pt-4 space-y-2 pl-4">
                            <li>
                                <span className="font-light">{t("dialog.success.additional_info")}</span>
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
                        {t("dialog.footer.donate")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
