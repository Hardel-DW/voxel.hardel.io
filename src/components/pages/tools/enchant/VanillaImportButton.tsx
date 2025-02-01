import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown";
import { useTranslate } from "@/components/useTranslate";
import { parseDatapack } from "@/lib/minecraft/core/engine/Parser";
import { useConfiguratorStore } from "@/lib/minecraft/core/engine/Store";

export default function VanillaImportButton() {
    const { t } = useTranslate();

    const handleVanillaImport = async (version: number) => {
        try {
            const response = await fetch(`/api/preset/${version}`);
            if (!response.ok) throw new Error("Failed to fetch datapack");

            const blob = await response.blob();
            const file = new File([blob], `enchantment-${version}.zip`, {
                type: "application/zip"
            });

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            const fileList = dataTransfer.files;
            const result = await parseDatapack("enchantment", fileList);

            if (typeof result === "string") {
                console.error("Error parsing datapack:", result);
                return;
            }

            useConfiguratorStore.getState().setup({ ...result, name: "Vanilla Enchantment - Voxel Configurator" });
        } catch (error: unknown) {
            console.error("Failed to import vanilla datapack:", error);
            if (error instanceof Error) {
                console.error("Error stack:", error.stack);
            }
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="h-10 px-4 py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap cursor-pointer truncate text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 animate-shimmer bg-[linear-gradient(110deg,#FCFCFC,45%,#d0d0d0,55%,#FCFCFC)] bg-[length:200%_100%] text-black font-medium border-t border-l border-zinc-900 hover:opacity-75 transition">
                    {t("tools.enchantments.import_vanilla")}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleVanillaImport(61)}>Minecraft - Version 1.21.4</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleVanillaImport(57)}>Minecraft - Version 1.21.2 to 1.21.3</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleVanillaImport(48)}>Minecraft - Version 1.21 to 1.21.1</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
