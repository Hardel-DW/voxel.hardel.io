import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Field } from "@/lib/minecraft/core/engine/field";
import type { Condition } from "./condition";
import type {
    ToolCategoryType,
    ToolCounterType,
    ToolDonationType,
    ToolEffectType,
    ToolInlineType,
    ToolRevealType,
    ToolScrollableType,
    ToolSectionType,
    ToolSlotType,
    ToolSwitchSlotType,
    ToolSwitchType,
    ToolRangeType,
    ToolTagViewerType
} from "@/lib/minecraft/core/schema/primitive/component";
import type { TextRenderType, TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import type { IterationType } from "@/lib/minecraft/core/schema/primitive/iteration";

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
