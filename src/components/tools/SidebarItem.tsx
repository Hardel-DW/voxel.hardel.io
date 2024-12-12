import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/tools/ConfiguratorContext.tsx";
import TextComponent from "@/components/tools/elements/schema/TextComponent.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip.tsx";
import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser";
import { getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { cn } from "@/lib/utils.ts";
import type { TextComponentType } from "@voxel/definitions";
import type React from "react";
import { useRef } from "react";

export function SidebarItem(props: {
    element: RegistryElement<VoxelElement>;
}) {
    const context = useConfigurator();
    const { translate } = useTranslate();
    const switchRef = useRef<HTMLDivElement>(null);
    const sidebar = context.configuration?.sidebar;
    if (!sidebar) return null;

    const descriptionField = getField(sidebar.description.field, context.toggleSection);
    const softDeleteField = getField(sidebar.toggle.field, context.toggleSection);
    const descriptionValue = props.element.data[descriptionField];
    const check = props.element.data[softDeleteField];
    if (!context.currentElement) return null;
    if (typeof check !== "boolean") return null;

    const handleClick = () => {
        if (switchRef.current?.contains(document.activeElement)) return;
        context.setCurrentElementId(props.element.identifier);
    };

    const handleSoftDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!context.configuration?.sidebar.toggle) return;
        context.handleChange(context.configuration.sidebar.toggle.action, !e.target.checked, props.element.identifier);
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
