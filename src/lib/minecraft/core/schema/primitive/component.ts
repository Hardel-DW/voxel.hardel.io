import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import type { FormComponent } from "@/lib/minecraft/core/engine";
import type { ToggleSection } from "@/lib/minecraft/core/schema/primitive/toggle";
import type { IterationValue, TemplateReplacer } from "@/lib/minecraft/core/schema/primitive/iteration";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import type { ToolRevealElementType } from "@/lib/minecraft/core/schema/primitive/reveal";
import type { EffectComponentsRecord } from "@voxel/definitions";

// Primitive Component
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

export type ToolSectionType = {
    type: "Section";
    id: string;
    title: TranslateTextType;
    children: FormComponent[];
    toggle?: ToggleSection[];
    button?: { text: TranslateTextType; url: string };
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

export type ToolScrollableType = {
    type: "Scrollable";
    height?: number;
    children: FormComponent[];
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

export type ToolCategoryType = {
    type: "Category";
    title: TranslateTextType;
    children: FormComponent[];
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

export type ToolIterationType = {
    type: "Iteration";
    values: IterationValue[];
    template: TemplateReplacer<FormComponent>;
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
