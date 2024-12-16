import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/tools/ConfiguratorContext.tsx";
import Dropzone from "@/components/ui/react/Dropzone.tsx";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import { parseDatapack } from "@/lib/minecraft/core/engine/Parser.ts";
import { toast } from "sonner";

export default function DatapackUploader<T extends keyof Analysers>() {
    const context = useConfigurator<T>();
    const { translate } = useTranslate();

    const handleFileUpload = async (files: FileList) => {
        if (files.length === 0) {
            toast.error(translate["generic.error"], {
                description: translate["tools.enchantments.warning.no_file"]
            });
            return;
        }

        if (files.length > 1) {
            toast.error(translate["generic.error"], {
                description: translate["tools.enchantments.warning.multiple_files"]
            });
            return;
        }

        if (!files[0].name.endsWith(".zip") && !files[0].name.endsWith(".jar")) {
            toast.error(translate["generic.error"], {
                description: translate["tools.enchantments.warning.invalid_file"]
            });
            return;
        }

        const result = await parseDatapack(context.tool, files);
        if (typeof result === "string") {
            toast.error(translate["generic.error"], {
                description: translate[result]
            });
            return;
        }

        context.setName(result.name);
        context.setFiles(result.files);
        context.setElements(result.elements);
        context.setVersion(result.version);
        context.setToggleSection(result.toggleSection);
        context.setCurrentElementId(result.currentElementId);
        context.setIsJar(result.isJar);
        context.setConfiguration(result.configuration);
        context.setLogger(result.logger);
    };

    if (context.elements.length > 0) return null;

    return (
        <>
            <Dropzone onFileUpload={handleFileUpload} dropzone={{ accept: ".zip,.jar", maxSize: 100000000, multiple: false }}>
                <div>
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">{translate["tools.upload.start"]}</span> {translate["tools.upload.drop"]}
                    </p>
                    <p className="text-xs text-gray-500">{translate["tools.upload.description"]}</p>
                </div>
            </Dropzone>
        </>
    );
}
