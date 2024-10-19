import type { BlueprintFieldType } from "./fields/Field";

export interface Position {
    x: number;
    y: number;
}

export interface GridObject {
    id: string;
    position: Position;
}

export interface Blueprint extends GridObject {
    type: "blueprint";
    title: string;
    fields: BlueprintFieldType[];
    linkingFieldId?: string;
}

export interface Link extends GridObject {
    type: "link";
    sourceId: string;
    targetId: string;
    sourceFieldId: string;
    targetFieldId: string;
    endPosition: Position;
}

export interface TemporaryLink extends GridObject {
    type: "tmp_link";
    endPosition: Position;
    sourceId: string;
    sourceFieldId: string;
}

export type AnyGridObject = Blueprint | Link | TemporaryLink;