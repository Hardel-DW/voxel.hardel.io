import type { BlueprintFieldType } from "@/components/pages/tools/studio/fields/Field.tsx";
import type React from "react";

export interface Position {
    x: number;
    y: number;
}

export interface GridObject {
    id: string;
    position: Position;
}

export interface BlueprintObject extends GridObject {
    type: "blueprint";
    title: string;
    fields: BlueprintFieldType[];
    linkingFieldId?: string;
    ref: React.RefObject<HTMLDivElement>;
}

export interface LinkObject extends GridObject {
    type: "link";
    sourceId: string;
    targetId: string;
    sourceFieldId: string;
    targetFieldId: string;
    endPosition: Position;
}

export interface TemporaryLinkObject extends GridObject {
    type: "tmp_link";
    endPosition: Position;
    sourceId: string;
    sourceFieldId: string;
}

export type AnyGridObject = BlueprintObject | LinkObject | TemporaryLinkObject;
