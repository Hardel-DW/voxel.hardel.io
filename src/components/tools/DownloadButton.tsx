import Button from "@/components/ui/react/Button.tsx";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog.tsx";
import { useTranslate } from "@/components/useTranslate";
import type { versionedAnalyserCollection } from "@/lib/minecraft/core/engine/Analyser.ts";
import { compileDatapack } from "@/lib/minecraft/core/engine/Compiler.ts";
import { generateZip } from "@/lib/minecraft/mczip.ts";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { DialogDescription } from "@radix-ui/react-dialog";
import SettingsDialog from "./SettingsDialog.tsx";

export default function DownloadButton() {
    const { t } = useTranslate();

    const handleSaveLogs = async (logger: any) => {
        try {
            const response = await fetch("/api/migrations/log", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    logs: logger.getLogs()
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to save migration log: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error saving migration log:", error);
        }
    };

    const handleDownloadFile = (compiledContent: Uint8Array, name: string, isJar: boolean) => {
        const fileExtension = isJar ? "jar" : "zip";
        const blob = new Blob([compiledContent], {
            type: `application/${fileExtension}`
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}.${fileExtension}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleCompile = async () => {
        const store = useConfiguratorStore.getState();
        const { version, configuration, logger, elements, files, minify, name, isJar } = store;

        if (!version || !configuration || !logger) {
            console.error("Version, configuration or logger is missing");
            return;
        }

        const tool = configuration.analyser.id as keyof typeof versionedAnalyserCollection;
        const content = compileDatapack({ elements: Array.from(elements.values()), version, files, tool });
        const compiledContent = await generateZip(files, content, { minify, logger, includeVoxel: true });

        await handleSaveLogs(logger);
        handleDownloadFile(compiledContent, name, isJar);
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
                    <SettingsDialog />
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
