import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component.ts";
import type { Lock } from "@/lib/minecraft/core/schema/primitive/component.ts";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";

export type SidebarConfig = {
    action: Action;
    description: string;
    enabled?: Condition;
    lock?: Lock[];
};

export type ToolConfiguration = {
    interface: InterfaceConfiguration[];
    sidebar: SidebarConfig;
    analyser: {
        id: keyof Analysers;
        registries: {
            main: string;
            tags?: string;
        };
    };
};

export type InterfaceConfiguration = {
    id: string;
    components: FormComponent[];
    section: TranslateTextType;
    soon?: boolean;
};
