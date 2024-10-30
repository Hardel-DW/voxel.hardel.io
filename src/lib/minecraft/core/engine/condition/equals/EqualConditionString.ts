import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { GetValueFromContext } from "@/lib/minecraft/core/engine";

export type ConditionEqualsString = {
    type: "String";
    field: Field;
    value: GetValueFromContext<string>;
};

export function CheckEqualConditionString<T extends keyof Analysers>(
    condition: ConditionEqualsString,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): boolean {
    const field = getField<T>(condition.field, context);

    const enchantValue = element.data[field];
    if (!enchantValue || typeof enchantValue !== "string") {
        return false;
    }

    return enchantValue === condition.value;
}
