import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import type { FormComponent } from "@/lib/minecraft/core/engine";

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
