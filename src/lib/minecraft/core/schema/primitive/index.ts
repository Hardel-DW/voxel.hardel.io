import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component.ts";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import type { Lock } from "@/lib/minecraft/core/schema/primitive/component.ts";
import type { Condition } from "@/lib/minecraft/core/engine/condition";
import type { Unresolved } from "../../engine/resolver/field/type";

export type SidebarConfig = {
    action: Action;
    description: string;
    enabled?: Condition;
    lock?: Lock[];
};

export type ToolConfiguration = {
    interface: Unresolved<InterfaceConfiguration[]>;
    sidebar: Unresolved<SidebarConfig>;
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
