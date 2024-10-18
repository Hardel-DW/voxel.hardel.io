import type React from "react";
import type { BaseBlueprintField } from "./Field";

export interface OutputFieldType extends BaseBlueprintField {
    type: "output";
    value: string;
}

export default function OutputField({ field, handleConnectorMouseDown, handleConnectorMouseUp }: {
    field: OutputFieldType;
    handleConnectorMouseDown: (e: React.MouseEvent, fieldId: string) => void;
    handleConnectorMouseUp: (fieldId: string) => void;
}) {
    return (
        <div className="flex items-center justify-end">
            <span>{field.name}</span>
            <div
                className="w-3 h-3 rounded-full ml-2 bg-red-400 cursor-pointer"
                onMouseDown={(e) => handleConnectorMouseDown(e, field.id)}
                onMouseUp={() => handleConnectorMouseUp(field.id)}
            />
        </div>
    );
}
