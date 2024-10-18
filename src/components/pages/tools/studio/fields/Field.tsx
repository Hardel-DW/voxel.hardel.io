import type { BlueprintField } from "@/components/pages/tools/studio/elements/Blueprint";
import InputField from "@/components/pages/tools/studio/elements/fields/InputField.tsx";
import NumberField from "@/components/pages/tools/studio/elements/fields/NumberField.tsx";
import OutputField from "@/components/pages/tools/studio/elements/fields/OutputField.tsx";
import type React from "react";

export default function Field({
    field,
    blueprintId,
    handleConnectorMouseDown,
    handleConnectorMouseUp,
    updateFieldValue
}: {
    field: BlueprintField;
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
            return (
                <NumberField
                    field={field}
                    updateFieldValue={updateFieldValue}
                    blueprintId={blueprintId}
                />
            );
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
