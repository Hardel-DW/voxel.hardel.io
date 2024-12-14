import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { IterationValue, TemplateReplacer } from "@/lib/minecraft/core/engine/resolver/iteration/type";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import type { ToolRevealElementType } from "@/lib/minecraft/core/schema/primitive/index.ts";
import type { TextRenderType, TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { EffectComponentsRecord } from "@voxel/definitions";

// Base type for common component properties
type BaseComponent = {
    hide?: Condition;
    condition?: Condition;
};

// Define non-container components first
type NonContainerComponent =
    | ToolDonationType
    | ToolSwitchSlotType
    | ToolSwitchType
    | TextRenderType
    | ToolSlotType
    | ToolCounterType
    | ToolRangeType
    | ToolInlineType
    | ToolTagViewerType
    | ToolEffectType;

// Define container components
export type ToolGridType = BaseComponent & {
    type: "Grid";
    size?: string;
    children: FormComponent[];
};

export type ToolListType = BaseComponent & {
    type: "Flexible";
    direction: "horizontal" | "vertical";
    children: FormComponent[];
};

export type ToolSectionType = BaseComponent & {
    type: "Section";
    id: string;
    title: TranslateTextType;
    children: FormComponent[];
    toggle?: ToggleSection[];
    button?: { text: TranslateTextType; url: string };
};

export type ToolScrollableType = BaseComponent & {
    type: "Scrollable";
    height?: number;
    children: FormComponent[];
};

export type ToolCategoryType = BaseComponent & {
    type: "Category";
    title: TranslateTextType;
    children: FormComponent[];
};

// Non-container components definitions restent les mêmes jusqu'à ToolIterationType
export type ToolIterationType = {
    type: "Iteration";
    values: IterationValue[];
    template: TemplateReplacer<FormComponent>;
};

// Non-container components remain the same
export type ToolRevealType = {
    type: "Reveal";
    elements: ToolRevealElementType[];
};

export type ToolDonationType = {
    type: "Donation";
    title: TranslateTextType;
    link: string;
    description: TranslateTextType;
    image: string;
};

export type ToolSwitchSlotType = {
    type: "SwitchSlot";
    title: TranslateTextType;
    description: TranslateTextType;
    action: Action;
    condition?: Condition;
    lock?: ValueParams<string>;
    image?: string;
};

export type ToolSwitchType = {
    type: "Switch";
    title: TranslateTextType;
    description: TranslateTextType;
    action: Action;
    condition?: Condition;
    lock?: ValueParams<string> | null;
};

export type ToolSlotType = {
    type: "Slot";
    description?: TranslateTextType;
    title: TranslateTextType;
    image: string;
    action: Action;
    size?: number;
    condition?: Condition;
    lock?: ValueParams<string>;
};

export type ToolCounterType = {
    type: "Counter";
    title: TranslateTextType;
    short?: TranslateTextType;
    description?: TranslateTextType;
    image: string;
    min: number;
    max: number;
    step: number;
    action: Action;
    value: ValueParams<number>;
};

export type ToolRangeType = {
    type: "Range";
    label: TranslateTextType;
    min: number;
    max: number;
    step: number;
    action: Action;
    value: ValueParams<number>;
};

export type ToolInlineType = {
    type: "InlineSlot";
    description?: TranslateTextType;
    title: TranslateTextType;
    image: string;
    action?: Action;
    condition?: Condition;
    lock?: ValueParams<string>;
};

export type ToolTagViewerType = {
    type: "TagViewer";
    field?: string;
    registry: string;
    additional?: Record<string, string[]>;
};

export type ToolEffectType = {
    type: "Effect";
    action: Action;
    condition: Condition;
    value: ValueParams<EffectComponentsRecord>;
};
// Finally, export the complete FormComponent type
export type FormComponent =
    | NonContainerComponent
    | ToolRevealType
    | ToolGridType
    | ToolListType
    | ToolSectionType
    | ToolScrollableType
    | ToolCategoryType
    | ToolIterationType;
