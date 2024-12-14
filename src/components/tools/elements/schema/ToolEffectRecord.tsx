import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/tools/ConfiguratorContext.tsx";
import { ToolEffect } from "@/components/tools/elements/schema/ToolEffect.tsx";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { ReturnValue } from "@/lib/minecraft/core/engine/value";
import type { EffectComponents, EffectComponentsRecord } from "@voxel/definitions";

export default function ToolEffectRecord(props: {
    value: ReturnValue<EffectComponentsRecord>;
    conditions: Condition;
    onChange: (value: string) => void;
}) {
    const { translate } = useTranslate();
    const context = useConfigurator();

    return (
        <div className="grid gap-4">
            {!props.value || Object.entries(props.value).length === 0 ? (
                <h1 className="text-zinc-400 text-center py-4">{translate["tools.enchantments.section.effects.components.empty"]}</h1>
            ) : null}

            {props.value &&
                Object.entries(props.value).map(([effect]) => {
                    if (!context.currentElement) return null;
                    const checked = checkCondition(props.conditions, context.currentElement, effect);

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
