import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { IterationValue, TemplateReplacer } from "@/lib/minecraft/core/engine/resolver/iteration/type";
import type { TextRenderType, TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { ValueRenderer } from "@/lib/minecraft/core/engine/value";

// Base type for common component properties
export type BaseComponent = {
    hide?: Condition;
};

export type Lock = {
    text: TranslateTextType;
    condition: Condition;
};

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

// Special Components
export type ToolIterationType = BaseComponent & {
    type: "Iteration";
    values: IterationValue[];
    template: TemplateReplacer<FormComponent>;
    fallback?: FormComponent;
};

export type ToolTagViewerType = BaseComponent & {
    type: "TagViewer";
    field?: string;
    registry: string;
    additional?: Record<string, string[]>;
};

export type ToolRevealType = BaseComponent & {
    type: "Reveal";
    elements: ToolRevealElementType[];
};

export type ToolRevealElementType = {
    id: string;
    title: TranslateTextType;
    soon?: boolean;
    image: string;
    logo: string;
    href: string;
    description: TranslateTextType;
    children: FormComponent[];
};

// Interactions Components
export type ToolSelectorType = BaseComponent & {
    type: "Selector";
    title: TranslateTextType;
    description: TranslateTextType;
    options: { label: TranslateTextType; value: string }[];
    action: Action;
    renderer: ValueRenderer;
    lock?: Lock[];
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
    image?: string;
    action: Action;
    renderer: ValueRenderer;
    lock?: Lock[];
};

export type ToolSwitchType = BaseComponent & {
    type: "Switch";
    title: TranslateTextType;
    description: TranslateTextType;
    action: Action;
    renderer: ValueRenderer;
    lock?: Lock[];
};

export type ToolSlotType = BaseComponent & {
    type: "Slot";
    description?: TranslateTextType;
    title: TranslateTextType;
    image: string;
    size?: number;
    action: Action;
    renderer: ValueRenderer;
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
    lock?: Lock[];
    renderer: ValueRenderer;
};

export type ToolRangeType = BaseComponent & {
    type: "Range";
    label: TranslateTextType;
    min: number;
    max: number;
    step: number;
    action: Action;
    lock?: Lock[];
    renderer: ValueRenderer;
};

export type ToolInlineType = BaseComponent & {
    type: "InlineSlot";
    description?: TranslateTextType;
    title: TranslateTextType;
    image: string;
    action?: Action;
    renderer: ValueRenderer;
    lock?: Lock[];
};

export type ToolPropertyType = BaseComponent & {
    type: "Property";
    action: Action;
    condition: Condition;
    properties: string;
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
    | ToolSelectorType
    | ToolInlineType
    | ToolTagViewerType
    | ToolPropertyType;

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
