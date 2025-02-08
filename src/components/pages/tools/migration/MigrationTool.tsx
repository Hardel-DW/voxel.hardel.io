import { DatapackDropzone } from "@/components/pages/tools/migration/DatapackDropzone";
import { StatusBox } from "@/components/pages/tools/migration/StatusBox";
import Button from "@/components/ui/react/Button";
import { useConfetti } from "@/components/ui/react/confetti/useConfetti";
import { Toaster } from "@/components/ui/shadcn/Sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { compileDatapack } from "@voxelio/breeze/core";
import { parseDatapack } from "@voxelio/breeze/core";
import { applyActions } from "@voxelio/breeze/core";
import { logToActions } from "@voxelio/breeze/core";
import { Logger } from "@voxelio/breeze/core";
import type { Log } from "@voxelio/breeze/core";
import { voxelDatapacks } from "@voxelio/breeze/core";
import { trackEvent } from "@/lib/server/telemetry";
import { downloadArchive } from "@/lib/utils/download";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Datapack } from "@voxelio/breeze/core";

interface MigrationToolProps {
    translate: Record<string, string>;
    children?: React.ReactNode;
}

interface DatapackInfo {
    version: number;
    name: string;
    isModded: boolean;
    status: "success" | "error";
    reason?: string;
}

export default function MigrationTool({ translate, children }: MigrationToolProps) {
    const [sourceFiles, setSourceFiles] = useState<FileList | null>(null);
    const [targetFiles, setTargetFiles] = useState<FileList | null>(null);
    const [sourceData, setSourceData] = useState<DatapackInfo>();
    const [targetData, setTargetData] = useState<DatapackInfo>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { addConfetti, renderConfetti } = useConfetti();

    useEffect(() => {
        if (sourceFiles && targetFiles) handleMigration();
    }, [sourceFiles, targetFiles]);

    const handleMigration = async () => {
        if (!sourceFiles || !targetFiles) return;
        toast.info(translate["tools.migration.processing"]);
        const source = await parseDatapack("enchantment", sourceFiles[0]);
        const target = await parseDatapack("enchantment", targetFiles[0]);
        if (typeof source === "string") {
            toast.error(translate[source]);
            return;
        }

        if (typeof target === "string") {
            toast.error(translate[target]);
            return;
        }

        const logFile = source.files["voxel/logs.json"];
        if (!logFile) {
            toast.error("No logs found in source datapack");
            return;
        }

        try {
            const logs: Log = JSON.parse(new TextDecoder().decode(logFile));
            const actions = logToActions(logs);
            const modifiedTarget = applyActions(target, actions);
            const finalDatapack = compileDatapack({
                elements: Array.from(modifiedTarget.elements.values()),
                version: modifiedTarget.version,
                files: modifiedTarget.files,
                tool: "enchantment"
            });

            const modifiedDatapack = await new Datapack(modifiedTarget.files).generate(finalDatapack, {
                isMinified: modifiedTarget.logger.getLogs().isMinified,
                logger: new Logger(logs),
                include: voxelDatapacks
            });

            downloadArchive(modifiedDatapack, `Migrated-${target.name}`, target.isModded);
            toast.success(translate["tools.migration.success"]);
            await trackEvent("migrated_datapack");
            setIsDialogOpen(true);
            addConfetti();

            setTimeout(() => {
                setSourceFiles(null);
                setTargetFiles(null);
                setSourceData(undefined);
                setTargetData(undefined);
            }, 3000);
            setIsDialogOpen(false);
        } catch (error) {
            toast.error("Failed to parse logs");
        }
    };

    const handleSourceUpload = async (files: FileList) => {
        const result = await parseDatapack("enchantment", files[0]);
        if (typeof result === "string") {
            toast.error(translate[result]);
            return;
        }

        if (!result.files["voxel/logs.json"]) {
            toast.error(translate["tools.migration.error.no_logs"]);
            setSourceData({
                version: result.version,
                name: result.name,
                isModded: result.isModded,
                status: "error",
                reason: translate["tools.migration.error.invalid_datapack"]
            });
            setSourceFiles(files);
            return;
        }

        setSourceFiles(files);
        setSourceData({ version: result.version, name: result.name, isModded: result.isModded, status: "success" });
    };

    const handleTargetUpload = async (files: FileList) => {
        const result = await parseDatapack("enchantment", files[0]);
        if (typeof result === "string") {
            toast.error(translate[result]);
            return;
        }

        if (result.elements.size === 0) {
            toast.error(translate["tools.migration.error.invalid_datapack"]);
            setTargetData({
                version: result.version,
                name: result.name,
                isModded: result.isModded,
                status: "error",
                reason: translate["tools.migration.error.invalid_datapack"]
            });
            setTargetFiles(files);
            return;
        }

        setTargetFiles(files);
        setTargetData({ version: result.version, name: result.name, isModded: result.isModded, status: "success" });
    };

    return (
        <div className="container mx-auto">
            {renderConfetti()}
            {children}
            <Toaster richColors />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-x-2">
                            <img src="/icons/success.svg" alt="zip" className="size-6" />
                            {translate["dialog.success.title"]}
                        </DialogTitle>
                        <DialogDescription>{translate["dialog.success.description"]}</DialogDescription>
                        <div className="py-2">
                            <span className="font-semibold text-zinc-400">
                                {targetData && `${targetData.name}.${targetData.isModded ? "jar" : "zip"}`}
                            </span>
                        </div>
                        <div className="h-1 w-full bg-zinc-700 rounded-full" />
                        <div className="pt-8">
                            <h4 className="font-semibold">{translate["dialog.success.additional_info_title"]}</h4>
                            <ul className="list-disc list-inside pt-4 space-y-2 pl-4">
                                <li>
                                    <span className="font-light">{translate["tools.migration.success.additional_info"]}</span>
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

            <div className="flex flex-col md:grid md:grid-cols-5 items-center justify-center mt-8">
                <div className="col-span-2 h-full">
                    {!sourceFiles ? (
                        <DatapackDropzone
                            id="source-dropzone"
                            title={translate["tools.migration.source"]}
                            subtitle={translate["tools.migration.drop.source"]}
                            onUpload={handleSourceUpload}
                        />
                    ) : (
                        <StatusBox
                            files={sourceFiles}
                            version={sourceData?.version ?? 0}
                            onReset={() => {
                                setSourceFiles(null);
                                setSourceData(undefined);
                            }}
                            translate={translate}
                            variant={sourceData?.status ?? "error"}
                            reason={sourceData?.reason}
                        />
                    )}
                </div>

                <div className="col-span-1 flex-col items-center gap-2 hidden md:flex">
                    <img src="/icons/arrow-right.svg" alt="Arrow" className="w-12 h-12 invert-75" />
                    <span className="text-sm text-muted-foreground">{translate["tools.migration.arrow"]}</span>
                </div>

                <div className="col-span-1 flex-col items-center py-8 gap-4 md:hidden flex">
                    <span className="text-sm text-muted-foreground">{translate["tools.migration.arrow"]}</span>
                    <img src="/icons/arrow-bottom.svg" alt="Arrow" className="w-12 h-12 invert-75" />
                </div>

                <div className="col-span-2">
                    {!targetFiles ? (
                        <DatapackDropzone
                            id="target-dropzone"
                            title={translate["tools.migration.target"]}
                            subtitle={translate["tools.migration.drop.target"]}
                            onUpload={handleTargetUpload}
                        />
                    ) : (
                        <StatusBox
                            files={targetFiles}
                            version={targetData?.version ?? 0}
                            onReset={() => {
                                setTargetFiles(null);
                                setTargetData(undefined);
                            }}
                            translate={translate}
                            variant={targetData?.status ?? "error"}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
