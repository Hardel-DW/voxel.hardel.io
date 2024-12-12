import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { ReturnValue } from "@/lib/minecraft/core/engine/value/index.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export type FieldValueParams = {
    type: "Field";
    field: Field;
};

export function getFieldValue<T extends keyof Analysers, K>(
    params: FieldValueParams,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    toggleSection: ToggleSectionMap | undefined
): ReturnValue<K> {
    const field = getField<T>(params.field, toggleSection);
    return element.data[field] as K;
}
