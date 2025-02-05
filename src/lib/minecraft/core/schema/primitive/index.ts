import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component.ts";
import type { Lock } from "@/lib/minecraft/core/schema/primitive/component.ts";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";

export type SidebarConfig = {
    action: Action;
    enabled?: Condition;
    lock?: Lock[];
};

export type ToolConfiguration = {
    interface: InterfaceConfiguration[];
    sidebar: SidebarConfig;
    analyser: keyof Analysers;
};

export type InterfaceConfiguration = {
    disabled?: boolean;
    id: string;
    components: FormComponent[];
    section: TranslateTextType;
    soon?: boolean;
};
