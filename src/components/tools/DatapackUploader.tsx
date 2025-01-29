import Dropzone from "@/components/ui/react/Dropzone.tsx";
import { useTranslate } from "@/components/useTranslate";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import { parseDatapack } from "@/lib/minecraft/core/engine/Parser.ts";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { toast } from "sonner";

export default function DatapackUploader(props: { tool: keyof Analysers }) {
    const { t } = useTranslate();

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

        toast.success(t("tools.upload.success"), {
            description: t("tools.upload.success.description")
        });

        const store = useConfiguratorStore.getState();
        store.setName(result.name);
        store.setFiles(result.files);
        store.setElements(result.elements);
        store.setVersion(result.version);
        store.setToggleSection(result.toggleSection);
        store.setCurrentElementId(result.currentElementId);
        store.setIsJar(result.isJar);
        store.setConfiguration(result.configuration);
        store.setLogger(result.logger);
        store.setIdentifiers(result.identifiers);
    };

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
