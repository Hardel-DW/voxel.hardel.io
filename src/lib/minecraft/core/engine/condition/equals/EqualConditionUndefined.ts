import type { ConfiguratorContextType } from "@/components/tools/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type ConditionEqualsUndefined = {
    type: "Undefined";
    field: Field;
};

export function CheckEqualConditionUndefined<T extends keyof Analysers>(
    condition: ConditionEqualsUndefined,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    const field = getField<T>(condition.field, context);
    return element.data[field] === undefined;
}
