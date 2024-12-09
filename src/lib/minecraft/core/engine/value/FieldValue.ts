import type { ConfiguratorContextType } from "@/components/tools/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { ReturnValue } from "@/lib/minecraft/core/engine/value/index.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type FieldValueParams = {
    type: "Field";
    field: Field;
};

export function getFieldValue<T extends keyof Analysers, K>(
    params: FieldValueParams,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): ReturnValue<K> {
    const field = getField<T>(params.field, context);
    return element.data[field] as K;
}
