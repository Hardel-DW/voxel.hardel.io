import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/pages/tools/ConfiguratorContext.tsx";
import Dropzone from "@/components/ui/dropzone";
import { toast } from "sonner";

export default function FileUploader<T>(props: {
    handleParse: (file: FileList) => Promise<boolean>;
}) {
    const context = useConfigurator<T>();
    const { translate } = useTranslate();

    const handleFileUpload = async (file: FileList) => {
        if (file.length === 0) {
            toast.error(translate["generic.error"], {
                description: translate["tools.enchantments.warning.no_file"]
            });
            return;
        }

        if (file.length > 1) {
            toast.error(translate["generic.error"], {
                description: translate["tools.enchantments.warning.multiple_files"]
            });
            return;
        }

        if (file[0].name.endsWith(".jar")) {
            toast.error(translate["generic.error"], {
                description: translate["tools.enchantments.warning.mods"]
            });
            return;
        }

        if (!file[0].name.endsWith(".zip")) {
            toast.error(translate["generic.error"], {
                description: translate["tools.enchantments.warning.invalid_file"]
            });
            return;
        }

        const isOk = await props.handleParse(file);
        if (!isOk) {
            toast.error(translate["generic.error"], {
                description: translate["tools.enchantments.warning.invalid_file"]
            });
            return;
        }
    };

    if (context.elements.length > 0) return null;

    return (
        <>
            <Dropzone onFileUpload={handleFileUpload} dropzone={{ accept: ".zip", maxSize: 100000000, multiple: false }}>
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
