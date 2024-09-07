import { useConfigurator } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { EnchantmentProps } from "@/components/pages/tools/enchant/Config.ts";
import TextComponent from "@/components/ui/tools/schema/TextComponent.tsx";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import { handleChange } from "@/lib/minecraft/voxel/actions";
import { cn } from "@/lib/utils.ts";
import { useRef } from "react";

export function EnchantmentItem<T extends EnchantmentProps>(props: {
    element: RegistryElement<T>;
}) {
    const context = useConfigurator<T>();
    const switchRef = useRef<HTMLDivElement>(null);
    if (!context.currentElement) return null;

    const handleClick = () => {
        if (switchRef.current?.contains(document.activeElement)) return;
        context.setCurrentElement(props.element);
    };

    const handleSoftDelete = (value: boolean) =>
        handleChange(
            {
                type: "SoftDelete",
                identifier: props.element.identifier,
                field: "softDelete"
            },
            !value,
            context
        );

    return (
        <div
            className={cn("odd:bg-black/75 pl-4 pr-2 py-2 rounded-xl", {
                "ring-1 ring-rose-900": context.currentElement?.identifier?.equals(props.element.identifier)
            })}
        >
            <div className="flex items-center justify-between" onClick={handleClick} onKeyDown={handleClick}>
                <TextComponent data={props.element.data.description} />
                <div className="flex items-center gap-8" ref={switchRef}>
                    <label className="flex items-center justify-between gap-4">
                        <input
                            type="checkbox"
                            name="enable"
                            checked={!props.element.data.softDelete}
                            onChange={(e) => handleSoftDelete(e.target.checked)}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
