import { useTranslate } from "@/components/useTranslate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import { ToolEffect } from "@/components/tools/elements/schema/ToolEffect.tsx";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { ReturnValue } from "@/lib/minecraft/core/engine/value";
import type { EffectComponents, EffectComponentsRecord } from "@voxel/definitions";

export default function ToolEffectRecord(props: {
    value: ReturnValue<EffectComponentsRecord>;
    conditions: Condition;
    onChange: (value: string) => void;
}) {
    const { t } = useTranslate();
    const store = useConfiguratorStore();
    const currentElementId = store.currentElementId;
    const elements = store.elements;
    if (!currentElementId) return null;
    const currentElement = elements.find((element) => element.identifier.equals(currentElementId));
    if (!currentElement) return null;

    return (
        <div className="grid gap-4">
            {!props.value || Object.entries(props.value).length === 0 ? (
                <h1 className="text-zinc-400 text-center py-4">{t("tools.enchantments.section.effects.components.empty")}</h1>
            ) : null}

            {props.value &&
                Object.entries(props.value).map(([effect]) => {
                    if (!currentElement) return null;
                    const checked = checkCondition(props.conditions, currentElement, effect);

                    return (
                        <ToolEffect
                            key={effect}
                            name={effect as keyof EffectComponents}
                            isChecked={!checked}
                            onChange={() => props.onChange(effect)}
                        />
                    );
                })}
        </div>
    );
}
