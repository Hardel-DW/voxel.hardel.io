import { useConfiguratorStore } from "@/components/tools/Store";
import Dropzone from "@/components/ui/react/Dropzone.tsx";
import useAsyncError from "@/lib/hook/useAsyncError";
import { useTranslate } from "@/lib/hook/useTranslate";
import type { Analysers } from "@voxelio/breeze/core";
import { parseDatapack } from "@voxelio/breeze/core";
import { DatapackError } from "@voxelio/breeze/core";
import type { TranslationKey } from "@voxelio/breeze/i18n";
import { toast } from "sonner";

export default function DatapackUploader(props: { tool: keyof Analysers }) {
    const throwError = useAsyncError();
    const { t } = useTranslate();

    const handleFileUpload = async (files: FileList) => {
        try {
            if (files.length === 0) throw new DatapackError("tools.enchantments.warning.no_file");
            if (files.length > 1) throw new DatapackError("tools.enchantments.warning.multiple_files");
            if (!files[0].name.endsWith(".zip") && !files[0].name.endsWith(".jar"))
                throw new DatapackError("tools.enchantments.warning.invalid_file");

            const result = await parseDatapack(props.tool, files[0]);
            toast.success(t("tools.upload.success"), {
                description: t("tools.upload.success.description")
            });

            useConfiguratorStore.getState().setup(result);
        } catch (e: unknown) {
            if (e instanceof DatapackError) {
                throwError(e.message as TranslationKey);
            }
        }
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
