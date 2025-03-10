import { useCopilotStore } from "@/components/pages/tools/copilot/store/DatapackStore";
import { CONCEPTS } from "@/components/pages/tools/copilot/store/data/elements";
import Dropzone from "@/components/ui/react/Dropzone";
import useAsyncError from "@/lib/hook/useAsyncError";
import { useTranslate } from "@/lib/hook/useTranslate";
import { Datapack } from "@voxelio/breeze/core";
import type { DataDrivenElement } from "@voxelio/breeze/core";
import { Identifier } from "@voxelio/breeze/core";
import { DatapackError } from "@voxelio/breeze/core";
import type { TranslationKey } from "@voxelio/breeze/i18n";
import { toast } from "sonner";

const REGISTRIES = ["loot_table", "enchantment", "recipe", "tags/enchantment", "tags/item"];

export default function UploadButton() {
    const { t } = useTranslate();
    const throwError = useAsyncError();

    const handleFileUpload = async (files: FileList) => {
        try {
            if (files.length === 0) throw new DatapackError("tools.enchantments.warning.no_file");
            if (files.length > 1) throw new DatapackError("tools.enchantments.warning.multiple_files");
            if (!files[0].name.endsWith(".zip") && !files[0].name.endsWith(".jar"))
                throw new DatapackError("tools.enchantments.warning.invalid_file");

            const file = files[0];
            const datapack = await Datapack.parse(file);
            const registries = await Promise.all(REGISTRIES.map((registry) => datapack.getRegistry<DataDrivenElement>(registry)));

            const mappedElements = new Map<string, DataDrivenElement>();
            for (const element of registries.flat()) {
                mappedElements.set(new Identifier(element.identifier).toUniqueKey(), element.data);
            }

            toast.success(t("tools.upload.success"), {
                description: t("tools.upload.success.description")
            });

            useCopilotStore.getState().setup(
                mappedElements,
                datapack.getFiles(),
                CONCEPTS.map((concept) => concept.registry)
            );
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
