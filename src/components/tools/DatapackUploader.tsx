import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import Dropzone from "@/components/ui/react/Dropzone.tsx";
import { parseDatapack } from "@/lib/minecraft/core/engine/Parser.ts";
import { toast } from "sonner";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import { useTranslate } from "@/components/useTranslate";

export default function DatapackUploader(props: { tool: keyof Analysers }) {
    const { t } = useTranslate();
    const store = useConfiguratorStore();
    const elements = store.elements;
    const setName = store.setName;
    const setFiles = store.setFiles;
    const setElements = store.setElements;
    const setVersion = store.setVersion;
    const setToggleSection = store.setToggleSection;
    const setCurrentElementId = store.setCurrentElementId;
    const setIsJar = store.setIsJar;
    const setConfiguration = store.setConfiguration;
    const setLogger = store.setLogger;

    const handleFileUpload = async (files: FileList) => {
        if (files.length === 0) {
            toast.error(t("tools.enchantments.warning.no_file"), {
                description: t("tools.enchantments.warning.no_file")
            });
            return;
        }

        if (files.length > 1) {
            toast.error(t("tools.enchantments.warning.multiple_files"), {
                description: t("tools.enchantments.warning.multiple_files")
            });
            return;
        }

        if (!files[0].name.endsWith(".zip") && !files[0].name.endsWith(".jar")) {
            toast.error(t("tools.enchantments.warning.invalid_file"), {
                description: t("tools.enchantments.warning.invalid_file")
            });
            return;
        }

        const result = await parseDatapack(props.tool, files);
        if (typeof result === "string") {
            toast.error(t("generic.error"), {
                description: t(result)
            });
            return;
        }

        try {
            toast.success(t("tools.upload.success"), {
                description: t("tools.upload.indexed")
            });
        } catch (error) {
            toast.error(t("generic.error"), {
                description: t("tools.upload.index_failed")
            });
        }

        setName(result.name);
        setFiles(result.files);
        setElements(result.elements);
        setVersion(result.version);
        setToggleSection(result.toggleSection);
        setCurrentElementId(result.currentElementId);
        setIsJar(result.isJar);
        setConfiguration(result.configuration);
        setLogger(result.logger);
    };

    if (elements.length > 0) return null;

    return (
        <Dropzone
            onFileUpload={handleFileUpload}
            dropzone={{
                accept: ".zip,.jar",
                maxSize: 100000000,
                multiple: false
            }}>
            <div>
                <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">{t("tools.upload.start")} </span>
                    {t("tools.upload.drop")}
                </p>
                <p className="text-xs text-gray-500">{t("tools.upload.description")}</p>
            </div>
        </Dropzone>
    );
}
