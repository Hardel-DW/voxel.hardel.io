import type React from "react";
import ConnectorField, { type ConnectorFieldType } from "./ConnectorField";
import NumberField, { type NumberFieldType } from "./NumberField";

export type BlueprintFieldType = ConnectorFieldType | NumberFieldType;
export interface BaseBlueprintField {
    id: string;
    name: string;
}

export default function Field(props: {
    field: BlueprintFieldType;
    blueprintId: string;
}) {
    switch (props.field.type) {
        case "input":
        case "output":
            return <ConnectorField field={props.field} blueprintId={props.blueprintId} />;
        case "number":
            return <NumberField field={props.field} blueprintId={props.blueprintId} />;
        default:
            return null;
    }
}
