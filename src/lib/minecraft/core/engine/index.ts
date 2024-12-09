import type { ToolTagViewerType } from "@/components/tools/elements/TagViewer.tsx";
import type { ToolCategoryType } from "@/components/tools/elements/ToolCategory.tsx";
import type { ToolCounterType } from "@/components/tools/elements/ToolCounter.tsx";
import type { ToolInlineType } from "@/components/tools/elements/ToolInlineSlot.tsx";
import type { IterationType } from "@/components/tools/elements/ToolIteration.tsx";
import type { ToolRangeType } from "@/components/tools/elements/ToolRange.tsx";
import type { ToolScrollableType } from "@/components/tools/elements/ToolScrollable.tsx";
import type { ToolSectionType } from "@/components/tools/elements/ToolSection.tsx";
import type { ToolSlotType } from "@/components/tools/elements/ToolSlot.tsx";
import type { ToolSwitchType } from "@/components/tools/elements/ToolSwitch.tsx";
import type { ToolSwitchSlotType } from "@/components/tools/elements/ToolSwitchSlot.tsx";
import type { ToolDonationType } from "@/components/tools/elements/misc/Donation.tsx";
import type { ToolRevealType } from "@/components/tools/elements/reveal/ToolReveal.tsx";
import type { ToolEffectType } from "@/components/tools/elements/schema/ToolEffectRecord.tsx";
import type { TextRenderType } from "@/components/tools/elements/text/TextRender.tsx";
import type { TranslateTextType } from "@/components/tools/elements/text/TranslateText.tsx";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Field } from "@/lib/minecraft/core/engine/field";
import type { Condition } from "./condition";

type BaseComponentProps = {
    hide?: Condition;
};

export type FormComponent = BaseComponentProps &
    (
        | ToolRangeType
        | ToolSwitchType
        | ToolGridType
        | ToolListType
        | ToolSlotType
        | ToolInlineType
        | ToolEffectType
        | ToolCategoryType
        | ToolRevealType
        | ToolScrollableType
        | ToolSwitchSlotType
        | ToolSectionType
        | ToolDonationType
        | ToolCounterType
        | TextRenderType
        | IterationType
        | ToolTagViewerType
    );

export type GetValueFromContext = {
    type: "get_value_from_context";
    key: string;
};

export type ToolGridType = {
    type: "Grid";
    size?: string;
    children: Exclude<FormComponent, ToolGridType>[];
};

export type ToolListType = {
    type: "Flexible";
    direction: "horizontal" | "vertical";
    children: Exclude<FormComponent, ToolListType>[];
};

export type ToolConfiguration = {
    interface: InterfaceConfiguration[];
    sidebar: SidebarConfiguration;
    parser: ParserConfiguration;
    compiler?: {
        merge_field_to_tags: string[];
    };
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
    toggle: {
        field: Field;
        action: Action;
    };
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
    section: TranslateTextType;
    soon?: boolean;
};
