import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/tools/ConfiguratorContext.tsx";
import TextComponent from "@/components/tools/elements/schema/TextComponent.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip.tsx";
import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser";
import { resolve } from "@/lib/minecraft/core/engine/resolver/field/resolveField";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { cn } from "@/lib/utils.ts";
import type { TextComponentType } from "@voxel/definitions";
import { useRef } from "react";

export function SidebarItem(props: { element: RegistryElement<VoxelElement> }) {
    const context = useConfigurator();
    const { translate } = useTranslate();
    const switchRef = useRef<HTMLDivElement>(null);
    if (!context.configuration?.sidebar) return null;
    const configuration = resolve(context.configuration, context.toggleSection);
    if (!configuration) return null;

    const descriptionField = configuration.sidebar.description;
    const softDeleteField = "field" in configuration.sidebar.action ? configuration.sidebar.action.field : null;
    const descriptionValue = props.element.data[descriptionField];
    const check = softDeleteField ? props.element.data[softDeleteField] : null;
    if (!context.currentElement) return null;
    if (typeof check !== "boolean") return null;

    const handleClick = () => {
        if (switchRef.current?.contains(document.activeElement)) return;
        context.setCurrentElementId(props.element.identifier);
    };

    const handleSoftDelete = () => {
        if (!configuration.sidebar.action) return;
        context.handleChange(configuration.sidebar.action, props.element.identifier);
    };

    return (
        <div
            className={cn("odd:bg-black/75 pl-4 pr-2 py-2 rounded-xl", {
                "ring-1 ring-rose-900": context.currentElement?.identifier?.equals(props.element.identifier)
            })}>
            <div className="flex items-center justify-between" onClick={handleClick} onKeyDown={handleClick}>
                <TextComponent data={descriptionValue as TextComponentType} />
                <div className="flex items-center gap-8" ref={switchRef}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <label className="flex items-center justify-between gap-4">
                                <input type="checkbox" name="enable" checked={!check} onChange={handleSoftDelete} />
                            </label>
                        </TooltipTrigger>
                        <TooltipContent align="end" className="w-64">
                            <p>{translate["tooltip.safe_delete"]}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}
