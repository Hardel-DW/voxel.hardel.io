import type { ToolGridType } from "@/components/pages/tools/enchant/RenderComponent.tsx";
import type { ToolCounterType } from "@/components/ui/tools/ToolCounter.tsx";
import type { ToolRangeType } from "@/components/ui/tools/ToolRange.tsx";
import type { ToolSelectableType } from "@/components/ui/tools/ToolSelectable.tsx";
import type { ToolSlotType } from "@/components/ui/tools/ToolSlot.tsx";
import type { ToolSwitchType } from "@/components/ui/tools/ToolSwitch.tsx";
import type { ToolVillagerType } from "@/components/ui/tools/ToolVillager.tsx";
import type { ToolEffectType } from "@/components/ui/tools/schema/ToolEffect.tsx";

export type LockedTags = {
    field: string;
    reason: string;
};

export type ToggleSection = {
    name: string;
    title: string;
    description: string;
};

export type ToolConfiguration = {
    id: string;
    section: string;
    description: string;
    toggle?: ToggleSection[];
    components: FormComponent[];
};

export type FormComponent =
    | ToolRangeType
    | ToolSwitchType
    | ToolVillagerType
    | ToolGridType
    | ToolSlotType
    | ToolSelectableType
    | ToolEffectType
    | ToolCounterType;
