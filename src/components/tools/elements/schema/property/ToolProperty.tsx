import type { InteractiveProps } from "@/components/tools/elements/InteractiveComponent";
import { useTranslate } from "@/components/useTranslate";
import type { ToolPropertyType } from "@/lib/minecraft/core/schema/primitive/component";
import { ToolPropertyElement } from "./ToolPropertyElement";

export default function ToolProperty({
    component,
    interactiveProps
}: { component: ToolPropertyType; interactiveProps: InteractiveProps<string> }) {
    const { value, handleChange } = interactiveProps;
    const { t } = useTranslate();

    return (
        <div className="grid gap-4">
            {!value || Object.keys(value).length === 0 ? (
                <h1 className="text-zinc-400 text-center py-4">{t("tools.enchantments.section.effects.components.empty")}</h1>
            ) : null}

            {value &&
                Object.entries(value).map(([effect]) => {
                    return (
                        <ToolPropertyElement
                            key={effect}
                            name={effect}
                            condition={component.condition}
                            onChange={() => handleChange(effect)}
                        />
                    );
                })}
        </div>
    );
}
