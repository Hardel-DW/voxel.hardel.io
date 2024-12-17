import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { IterationValue, TemplateReplacer } from "@/lib/minecraft/core/engine/resolver/iteration/type";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import type { ToolRevealElementType } from "@/lib/minecraft/core/schema/primitive/index.ts";
import type { TextRenderType, TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { EffectComponentsRecord } from "@voxel/definitions";

// Base type for common component properties
export type BaseComponent = {
    hide?: Condition;
};

export type Lock = {
    text: TranslateTextType;
    condition: Condition;
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
export type ToolIterationType = BaseComponent & {
    type: "Iteration";
    values: IterationValue[];
    template: TemplateReplacer<FormComponent>;
    fallback?: FormComponent;
};

// Non-container components remain the same
export type ToolRevealType = BaseComponent & {
    type: "Reveal";
    elements: ToolRevealElementType[];
};

export type ToolDonationType = BaseComponent & {
    type: "Donation";
    title: TranslateTextType;
    link: string;
    description: TranslateTextType;
    image: string;
};

export type ToolSwitchSlotType = BaseComponent & {
    type: "SwitchSlot";
    title: TranslateTextType;
    description: TranslateTextType;
    action: Action;
    condition?: Condition;
    lock?: Lock[];
    image?: string;
};

export type ToolSwitchType = BaseComponent & {
    type: "Switch";
    title: TranslateTextType;
    description: TranslateTextType;
    action: Action;
    condition?: Condition;
    lock?: Lock[];
};

export type ToolSlotType = BaseComponent & {
    type: "Slot";
    description?: TranslateTextType;
    title: TranslateTextType;
    image: string;
    action: Action;
    size?: number;
    condition?: Condition;
    lock?: Lock[];
};

export type ToolCounterType = BaseComponent & {
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

export type ToolRangeType = BaseComponent & {
    type: "Range";
    label: TranslateTextType;
    min: number;
    max: number;
    step: number;
    action: Action;
    value: ValueParams<number>;
};

export type ToolInlineType = BaseComponent & {
    type: "InlineSlot";
    description?: TranslateTextType;
    title: TranslateTextType;
    image: string;
    action?: Action;
    condition?: Condition;
    lock?: Lock[];
};

export type ToolTagViewerType = BaseComponent & {
    type: "TagViewer";
    field?: string;
    registry: string;
    additional?: Record<string, string[]>;
};

export type ToolEffectType = BaseComponent & {
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
