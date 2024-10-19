import type React from "react";
import type { BaseBlueprintField } from "./Field";

export interface InputFieldType extends BaseBlueprintField {
    type: "input";
    value: string;
}

export default function InputField(props: {
    field: InputFieldType;
    handleConnectorMouseDown: (e: React.MouseEvent, fieldId: string) => void;
    handleConnectorMouseUp: (fieldId: string) => void;
}) {
    return (
        <div className="flex items-center justify-start">
            <div
                className="w-3 h-3 rounded-full mr-2 cursor-pointer bg-blue-400"
                onMouseDown={(e) => props.handleConnectorMouseDown(e, props.field.id)}
                onMouseUp={() => props.handleConnectorMouseUp(props.field.id)}
            />
            <span>{props.field.name}</span>
        </div>
    );
}
