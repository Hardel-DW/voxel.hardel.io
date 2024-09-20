import { useTranslate } from "@/components/TranslateContext.tsx";
import Dropzone from "@/components/ui/react/Dropzone.tsx";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { parseDatapack } from "@/lib/minecraft/core/engine/Parser.ts";
import { toast } from "sonner";

export default function DatapackUploader<T extends keyof Analysers>() {
    const context = useConfigurator<GetAnalyserVoxel<T>>();
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

        const isOk = await parseDatapack(context, files);
        if (typeof isOk === "string") {
            toast.error(translate["generic.error"], {
                description: isOk
            });
            return;
        }
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
