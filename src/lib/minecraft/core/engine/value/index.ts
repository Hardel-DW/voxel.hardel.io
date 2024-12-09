import type { ConfiguratorContextType } from "@/components/tools/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type FieldValueParams, getFieldValue } from "@/lib/minecraft/core/engine/value/FieldValue.ts";
import { type SimpleValueParams, getSimpleValue } from "@/lib/minecraft/core/engine/value/SimpleValue.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { type Condition, checkCondition } from "src/lib/minecraft/core/engine/condition";

export type ValueParams<K> = {
    params: SimpleValueParams<K> | FieldValueParams;
    condition?: Condition | undefined;
};
export type ReturnValue<K> = K | null;

export function getValue<T extends keyof Analysers, K>(
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    value: ValueParams<K>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): ReturnValue<K> {
    const isTrue = checkCondition<T>(value.condition, context, element);
    if (!isTrue) return null;

    switch (value.params.type) {
        case "Field":
            return getFieldValue<T, K>(value.params, context, element);
        case "Value":
            return getSimpleValue<K>(value.params);
        default:
            return null;
    }
}
