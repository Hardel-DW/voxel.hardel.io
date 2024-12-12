import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type FieldValueParams, getFieldValue } from "@/lib/minecraft/core/engine/value/FieldValue.ts";
import { type SimpleValueParams, getSimpleValue } from "@/lib/minecraft/core/engine/value/SimpleValue.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export type ValueParams<K> = {
    params: SimpleValueParams<K> | FieldValueParams;
    condition?: Condition | undefined;
};
export type ReturnValue<K> = K | null;

export function getValue<T extends keyof Analysers, K>(
    value: ValueParams<K>,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    toggleSection: ToggleSectionMap | undefined
): ReturnValue<K> {
    const isTrue = checkCondition<T>(value.condition, element, toggleSection);
    if (!isTrue) return null;

    switch (value.params.type) {
        case "Field":
            return getFieldValue<T, K>(value.params, element, toggleSection);
        case "Value":
            return getSimpleValue<K>(value.params);
        default:
            return null;
    }
}
