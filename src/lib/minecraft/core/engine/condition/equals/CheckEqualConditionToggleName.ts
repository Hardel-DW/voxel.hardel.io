import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export type ConditionEqualsToggleName = {
    type: "compare_to_toggle_name";
    group: string;
    value: string;
};

export function CheckEqualConditionToggleName(condition: ConditionEqualsToggleName, toggleSection: ToggleSectionMap | undefined): boolean {
    if (!toggleSection) return false;
    return toggleSection[condition.group]?.name === condition.value;
}
