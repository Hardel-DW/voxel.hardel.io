import InputField, { type InputFieldType } from "@/components/pages/tools/studio/fields/InputField.tsx";
import NumberField, { type NumberFieldType } from "@/components/pages/tools/studio/fields/NumberField.tsx";
import OutputField, { type OutputFieldType } from "@/components/pages/tools/studio/fields/OutputField.tsx";
import type React from "react";

export type BlueprintFieldType = InputFieldType | NumberFieldType | OutputFieldType;
export interface BaseBlueprintField {
    id: string;
    name: string;
}

export default function Field(props: {
    field: BlueprintFieldType;
    blueprintId: string;
    handleConnectorMouseDown: (e: React.MouseEvent, fieldId: string) => void;
    handleConnectorMouseUp: (fieldId: string) => void;
    updateFieldValue: (blueprintId: string, fieldId: string, value: number) => void;
}) {
    switch (props.field.type) {
        case "input":
            return (
                <InputField
                    field={props.field}
                    handleConnectorMouseDown={props.handleConnectorMouseDown}
                    handleConnectorMouseUp={props.handleConnectorMouseUp}
                />
            );
        case "number":
            return <NumberField field={props.field} updateFieldValue={props.updateFieldValue} blueprintId={props.blueprintId} />;
        case "output":
            return (
                <OutputField
                    field={props.field}
                    handleConnectorMouseDown={props.handleConnectorMouseDown}
                    handleConnectorMouseUp={props.handleConnectorMouseUp}
                />
            );
        default:
            return null;
    }
}
