import type { ToolCategoryType } from "@/lib/minecraft/components/elements/ToolCategory.tsx";
import type { ToolCollectionType } from "@/lib/minecraft/components/elements/ToolCollection.tsx";
import type { ToolCounterType } from "@/lib/minecraft/components/elements/ToolCounter.tsx";
import type { ToolInlineType } from "@/lib/minecraft/components/elements/ToolInlineSlot.tsx";
import type { ToolRangeType } from "@/lib/minecraft/components/elements/ToolRange.tsx";
import type { ToolSectionType } from "@/lib/minecraft/components/elements/ToolSection.tsx";
import type { ToolSlotType } from "@/lib/minecraft/components/elements/ToolSlot.tsx";
import type { ToolSwitchType } from "@/lib/minecraft/components/elements/ToolSwitch.tsx";
import type { ToolDonationType } from "@/lib/minecraft/components/elements/misc/Donation.tsx";
import type { ToolRevealType } from "@/lib/minecraft/components/elements/reveal/ToolReveal.tsx";
import type { ToolEffectType } from "@/lib/minecraft/components/elements/schema/ToolEffectRecord.tsx";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Field } from "@/lib/minecraft/core/engine/field";
import type { Action } from "src/lib/minecraft/core/engine/actions";

export type FormComponent =
    | ToolCollectionType
    | ToolRangeType
    | ToolSwitchType
    | ToolGridType
    | ToolSlotType
    | ToolInlineType
    | ToolEffectType
    | ToolCategoryType
    | ToolRevealType
    | ToolSectionType
    | ToolDonationType
    | ToolCounterType;

export type ToolGridType = {
    type: "Grid";
    size?: string;
    children: Exclude<FormComponent, ToolGridType>[];
};

export type ToolConfiguration = {
    interface: InterfaceConfiguration[];
    sidebar: SidebarConfiguration;
    parser: ParserConfiguration;
};

export type ParserConfiguration = {
    id: keyof Analysers;
    registries: ParserRegistry;
};

type ParserRegistry = {
    main: string;
    tags?: string;
};

type SidebarConfiguration = {
    toggle: Action;
    description: {
        field: Field;
    };
    value: {
        field: Field;
    };
};

export type InterfaceConfiguration = {
    id: string;
    components: FormComponent[];
    section: string;
    soon?: boolean;
};
