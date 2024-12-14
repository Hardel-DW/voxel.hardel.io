import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { type Condition, checkCondition } from "@/lib/minecraft/core/engine/condition";

export type SimpleValueParams<K> =
    | {
          type: "Value";
          value: K;
      }
    | {
          type: "Field";
          field: string;
      };

export type ValueParams<K> = {
    params: SimpleValueParams<K>;
    condition?: Condition | undefined;
};
export type ReturnValue<K> = K | null;

export function getValue<T extends keyof Analysers, K>(
    value: ValueParams<K>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): ReturnValue<K> {
    const isTrue = checkCondition<T>(value.condition, element);
    if (!isTrue) return null;

    switch (value.params.type) {
        case "Value":
            return value.params.value;
        case "Field":
            // You'll need to implement field resolution logic here
            // For now, returning null as placeholder
            return null;
        default:
            return null;
    }
}
