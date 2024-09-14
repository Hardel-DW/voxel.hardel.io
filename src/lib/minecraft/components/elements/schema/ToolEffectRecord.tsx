import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { ToolEffect } from "@/lib/minecraft/components/elements/schema/ToolEffect.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import type { EffectComponents, EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import type { Action } from "src/lib/minecraft/core/engine/actions";

export type ToolEffectType = {
    type: "Effect";
    action: Action;
    condition: Condition;
    value: ValueParams<EffectComponentsRecord>;
};

export default function ToolEffectRecord<T extends keyof Analysers>(props: {
    value: EffectComponentsRecord;
    conditions: Condition;
    onChange: (value: string) => void;
}) {
    const { translate } = useTranslate();
    const context = useConfigurator<GetAnalyserVoxel<T>>();

    return (
        <div className="grid gap-4">
            {!props.value || Object.entries(props.value).length === 0 ? (
                <h1 className="text-zinc-400 text-center py-4">{translate["tools.enchantments.section.effects.components.empty"]}</h1>
            ) : null}

            {props.value &&
                Object.entries(props.value).map(([effect]) => {
                    if (!context.currentElement) return null;
                    const checked = checkCondition(props.conditions, context, context.currentElement, effect);

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
