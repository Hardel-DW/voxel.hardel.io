import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import TextComponent from "@/lib/minecraft/components/elements/schema/TextComponent.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { cn } from "@/lib/utils.ts";
import type React from "react";
import { useRef } from "react";
import { handleChange } from "src/lib/minecraft/core/engine/actions";

export function SidebarItem<T extends keyof Analysers>(props: {
    element: RegistryElement<GetAnalyserVoxel<T>>;
}) {
    const context = useConfigurator<GetAnalyserVoxel<T>>();
    const switchRef = useRef<HTMLDivElement>(null);
    const sidebar = context.configuration?.sidebar;
    if (!sidebar) return null;

    const descriptionField = getField(sidebar.description.field, context);
    const softDeleteField = getField(sidebar.toggle.field, context);
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
        handleChange(context.configuration.sidebar.toggle, !e.target.checked, context, props.element.identifier);
    };

    return (
        <div
            className={cn("odd:bg-black/75 pl-4 pr-2 py-2 rounded-xl", {
                "ring-1 ring-rose-900": context.currentElement?.identifier?.equals(props.element.identifier)
            })}
        >
            <div className="flex items-center justify-between" onClick={handleClick} onKeyDown={handleClick}>
                <TextComponent data={descriptionValue as TextComponentType} />
                <div className="flex items-center gap-8" ref={switchRef}>
                    <label className="flex items-center justify-between gap-4">
                        <input type="checkbox" name="enable" checked={!check} onChange={handleSoftDelete} />
                    </label>
                </div>
            </div>
        </div>
    );
}
