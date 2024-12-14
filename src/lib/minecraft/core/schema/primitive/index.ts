import type { Analysers } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { Action } from "@/lib/minecraft/core/engine/actions";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component.ts";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";

export type SidebarConfig = {
    action: Action;
    description: string;
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
    compiler?: {
        merge_field_to_tags: string[];
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
