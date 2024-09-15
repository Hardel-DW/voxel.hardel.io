import type { DataDrivenElement } from "@/lib/minecraft/core/engine/Analyser.ts";

export interface TagType extends DataDrivenElement {
    replace?: boolean;
    values: (string | OptionalTag)[];
}

export type OptionalTag = {
    required: boolean;
    id: string;
};
