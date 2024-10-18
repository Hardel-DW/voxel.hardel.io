import InputField, { type InputFieldType } from "@/components/pages/tools/studio/fields/InputField.tsx";
import NumberField, { type NumberFieldType } from "@/components/pages/tools/studio/fields/NumberField.tsx";
import OutputField, { type OutputFieldType } from "@/components/pages/tools/studio/fields/OutputField.tsx";
import type React from "react";

export type BlueprintFieldType = InputFieldType | NumberFieldType | OutputFieldType;
export interface BaseBlueprintField {
    id: string;
    name: string;
}

export default function Field({
    field,
    blueprintId,
    handleConnectorMouseDown,
    handleConnectorMouseUp,
    updateFieldValue
}: {
    field: BlueprintFieldType;
    blueprintId: string;
    handleConnectorMouseDown: (e: React.MouseEvent, fieldId: string) => void;
    handleConnectorMouseUp: (fieldId: string) => void;
    updateFieldValue: (blueprintId: string, fieldId: string, value: number) => void;
}) {
    switch (field.type) {
        case "input":
            return (
                <InputField
                    field={field}
                    handleConnectorMouseDown={handleConnectorMouseDown}
                    handleConnectorMouseUp={handleConnectorMouseUp}
                />
            );
        case "number":
            return <NumberField field={field} updateFieldValue={updateFieldValue} blueprintId={blueprintId} />;
        case "output":
            return (
                <OutputField
                    field={field}
                    handleConnectorMouseDown={handleConnectorMouseDown}
                    handleConnectorMouseUp={handleConnectorMouseUp}
                />
            );
        default:
            return null;
    }
}
