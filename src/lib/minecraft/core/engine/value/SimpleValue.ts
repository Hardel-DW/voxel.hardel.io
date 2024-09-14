import type { ReturnValue } from "@/lib/minecraft/core/engine/value/index.ts";

export type SimpleValueParams<K> = {
    type: "Value";
    value: K;
};

export function getSimpleValue<K>(params: SimpleValueParams<K>): ReturnValue<K> {
    return params.value;
}
