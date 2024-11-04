import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";

export type ConditionEqualsToggleName = {
    type: "compare_to_toggle_name";
    group: string;
    value: string;
};

export function CheckEqualConditionToggleName<T extends keyof Analysers>(
    condition: ConditionEqualsToggleName,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): boolean {
    const { toggleSection } = context;
    if (!toggleSection) return false;
    return toggleSection[condition.group]?.name === condition.value;
}
