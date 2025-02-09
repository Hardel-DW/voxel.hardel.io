import Button from "@/components/ui/react/Button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/react/Dialog.tsx";
import { useTranslate } from "@/lib/hook/useTranslate.ts";
import { saveLogs } from "@/lib/server/telemetry.ts";
import { downloadArchive } from "@/lib/utils/download.ts";
import { Datapack } from "@voxelio/breeze/core";
import { useConfiguratorStore } from "@/components/tools/Store";
import { voxelDatapacks } from "@voxelio/breeze/core";
import SettingsDialog from "./SettingsDialog.tsx";

export default function DownloadButton() {
    const { t } = useTranslate();

    const handleClick = async () => {
        const store = useConfiguratorStore.getState();
        const { logger, files, minify, name, isJar } = store;

        const content = store.compile();
        const compiledContent = await new Datapack(files).generate(content, { isMinified: minify, logger, include: voxelDatapacks });
        await saveLogs({ logs: logger?.getLogs() });
        downloadArchive(compiledContent, name, isJar);
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button type="button" className="w-full" variant="white-shimmer" onClick={handleClick} onKeyDown={handleClick}>
                    <span className="text-sm hidden xl:block">{t("tools.download")}</span>
                    <span className="text-sm block xl:hidden">{t("tools.download.small")}</span>
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
