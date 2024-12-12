import type { ToggleSectionMap } from "@/lib/minecraft/core/schema/primitive/toggle";

export type ConditionEqualsToggleField = {
    type: "compare_to_toggle_field";
    group: string;
    value: string;
};

export function CheckEqualConditionToggleField(
    condition: ConditionEqualsToggleField,
    toggleSection: ToggleSectionMap | undefined
): boolean {
    if (!toggleSection) return false;
    return toggleSection[condition.group]?.field === condition.value;
}
