import ConnectorField, { type ConnectorFieldType } from "./ConnectorField";
import NumberField, { type NumberFieldType } from "./NumberField";
import type React from "react";

export type BlueprintFieldType = ConnectorFieldType | NumberFieldType;
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
        case "output":
            return (
                <ConnectorField
                    field={props.field}
                    handleConnectorMouseDown={props.handleConnectorMouseDown}
                    handleConnectorMouseUp={props.handleConnectorMouseUp}
                />
            );
        case "number":
            return <NumberField field={props.field} updateFieldValue={props.updateFieldValue} blueprintId={props.blueprintId} />;
        default:
            return null; 
    }
}
