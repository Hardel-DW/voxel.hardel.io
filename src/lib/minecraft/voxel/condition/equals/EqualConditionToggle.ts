import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { ConditionResult } from "@/lib/minecraft/voxel/condition";

export type ConditionEqualsToggle = {
    type: "Toggle";
    group: string;
    value: string;
};

export function CheckEqualConditionToggle<T>(condition: ConditionEqualsToggle, context: ConfiguratorContextType<T>): ConditionResult {
    const { toggleSection } = context;
    if (!toggleSection) return { value: false };

    const toggle = toggleSection[condition.group];

    if (toggle === condition.value) {
        return { value: true };
    }

    return { value: false };
}
