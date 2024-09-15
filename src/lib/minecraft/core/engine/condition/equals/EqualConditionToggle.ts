import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";

export type ConditionEqualsToggle = {
    type: "Toggle";
    group: string;
    value: string;
};

export function CheckEqualConditionToggle<T extends keyof Analysers>(
    condition: ConditionEqualsToggle,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>
): boolean {
    const { toggleSection } = context;
    if (!toggleSection) return false;
    return toggleSection[condition.group] === condition.value;
}
