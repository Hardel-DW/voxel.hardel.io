import { useTranslate } from "@/components/useTranslate";
import { ToolPropertyElement } from "@/components/tools/elements/schema/property/ToolPropertyElement";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { RegistryElement } from "@/lib/minecraft/mczip";

export default function ToolProperty(props: {
    value: Record<string, any>;
    conditions: Condition;
    element: RegistryElement<any>;
    onChange: (value: string) => void;
}) {
    const { t } = useTranslate();

    return (
        <div className="grid gap-4">
            {!props.value || Object.entries(props.value).length === 0 ? (
                <h1 className="text-zinc-400 text-center py-4">{t("tools.enchantments.section.effects.components.empty")}</h1>
            ) : null}

            {props.value &&
                Object.entries(props.value).map(([effect]) => {
                    const checked = checkCondition(props.conditions, props.element, effect);
                    return <ToolPropertyElement key={effect} name={effect} isChecked={!checked} onChange={() => props.onChange(effect)} />;
                })}
        </div>
    );
}
