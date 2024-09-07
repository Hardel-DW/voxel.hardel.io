import { useTranslate } from "@/components/TranslateContext.tsx";
import { ToolEffect } from "@/components/ui/tools/schema/ToolEffect.tsx";
import type { EffectComponents, EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import type { Action } from "@/lib/minecraft/voxel/actions";
import type { Condition } from "@/lib/minecraft/voxel/condition";

export type ToolEffectType = {
    type: "Effect";
    action: Action;
    condition: Condition[];
};

export default function ToolEffectRecord(props: {
    value: EffectComponentsRecord;
    onChange: (value: string) => void;
}) {
    const { translate } = useTranslate();

    return (
        <div className="grid gap-4">
            {!props.value || Object.entries(props.value).length === 0 ? (
                <h1 className="text-zinc-400 text-center py-4">{translate["tools.enchantments.section.effects.components.empty"]}</h1>
            ) : (
                <h1 className="text-2xl font-semibold mt-8">{translate["tools.enchantments.section.effects.components.title"]}</h1>
            )}

            {props.value &&
                Object.entries(props.value).map(([effect]) => (
                    <ToolEffect
                        key={effect}
                        name={effect as keyof EffectComponents}
                        isChecked={true}
                        onChange={() => props.onChange(effect)}
                    />
                ))}
        </div>
    );
}
