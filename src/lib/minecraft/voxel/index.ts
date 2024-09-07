import type { ToolCounterType } from "@/components/ui/tools/ToolCounter.tsx";
import type { ToolRangeType } from "@/components/ui/tools/ToolRange.tsx";
import type { ToolSlotType } from "@/components/ui/tools/ToolSlot.tsx";
import type { ToolSwitchType } from "@/components/ui/tools/ToolSwitch.tsx";
import type { ToolEffectType } from "@/components/ui/tools/schema/ToolEffectRecord.tsx";

export type FormComponent = ToolRangeType | ToolSwitchType | ToolGridType | ToolSlotType | ToolEffectType | ToolCounterType;
export type ToolGridType = {
    type: "Grid";
    children: Exclude<FormComponent, ToolGridType>[];
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
