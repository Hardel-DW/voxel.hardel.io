import type React from "react";
import type { BaseBlueprintField } from "./Field";

export interface OutputFieldType extends BaseBlueprintField {
    type: "output";
    value: string;
}

export default function OutputField(props: {
    field: OutputFieldType;
    handleConnectorMouseDown: (e: React.MouseEvent, fieldId: string) => void;
    handleConnectorMouseUp: (fieldId: string) => void;
}) {
    return (
        <div className="flex items-center justify-end">
            <span>{props.field.name}</span>
            <div
                className="w-3 h-3 rounded-full ml-2 bg-red-400 cursor-pointer"
                onMouseDown={(e) => props.handleConnectorMouseDown(e, props.field.id)}
                onMouseUp={() => props.handleConnectorMouseUp(props.field.id)}
            />
        </div>
    );
}
