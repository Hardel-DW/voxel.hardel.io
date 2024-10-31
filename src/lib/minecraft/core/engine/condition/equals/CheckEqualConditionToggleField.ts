import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";

export type ConditionEqualsToggleField = {
    type: "compare_to_toggle_field";
    group: string;
    value: string;
};

export function CheckEqualConditionToggleField<T extends keyof Analysers>(
    condition: ConditionEqualsToggleField,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): boolean {
    const { toggleSection } = context;
    if (!toggleSection) return false;
    return toggleSection[condition.group]?.field === condition.value;
}
