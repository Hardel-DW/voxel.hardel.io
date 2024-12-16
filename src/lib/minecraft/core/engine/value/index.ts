import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";

export type ValueParams<K> = {
    params: { type: "Value"; value: K } | { type: "Field"; field: string };
    condition?: Condition | undefined;
};

export type ReturnValue<K> = K | null;

export function getValue<T extends keyof Analysers, K>(
    params: ValueParams<K>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): ReturnValue<K> {
    const isTrue = checkCondition<T>(params.condition, element);
    if (!isTrue) return null;

    switch (params.params.type) {
        case "Field":
            return element.data[params.params.field] as ReturnValue<K>;
        case "Value":
            return params.params.value;
        default:
            return null;
    }
}
