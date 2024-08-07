import { useTranslate } from "@/components/TranslateContext.tsx";
import { useEnchantments } from "@/components/pages/tools/enchant/EnchantmentsContext.tsx";
import Dropzone from "@/components/ui/dropzone";
import { getTagsLinkedToEnchantmentRegistry } from "@/lib/minecraft/core/Tag.ts";
import { getRegistry } from "@/lib/minecraft/mcschema";
import { parseZip } from "@/lib/minecraft/mczip";
import type { Enchantment } from "@/lib/minecraft/schema/enchantment/Enchantment.ts";
import { toast } from "sonner";

export default function FileUploader() {
    const { setEnchantments, setEnchantmentTags, setCurrentEnchantmentData, setFiles, enchantments } = useEnchantments();
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

        const files = await parseZip(file[0]);
        const enchantments = getRegistry<Enchantment>(files, "enchantment");
        const enchantmentTags = getRegistry<TagType>(files, "tags/enchantment");
        const tags = getTagsLinkedToEnchantmentRegistry(enchantments, enchantmentTags);

        setFiles(files);
        setEnchantments(enchantments);
        setEnchantmentTags(tags);

        if (enchantments.length === 0) {
            toast.error(translate["generic.error"], {
                description: translate["tools.enchantments.warning.no_enchantments"]
            });
            return;
        }

        // Set the first enchantment as the current enchantment
        const orderListByAlphabet = enchantments.sort((a, b) =>
            (a.identifier.getResource().split("/").pop() ?? "").localeCompare(b.identifier.getResource().split("/").pop() ?? "")
        );
        setCurrentEnchantmentData(orderListByAlphabet[0].identifier, orderListByAlphabet[0].data);
    };

    if (enchantments.length > 0) return null;

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
