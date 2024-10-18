import type { BlueprintField } from "@/components/pages/tools/studio/elements/Blueprint";
import Field from "@/components/pages/tools/studio/elements/fields/Field";
import { cn } from "@/lib/utils";
import type React from "react";

export default function FieldManager({
    fields,
    blueprintId,
    handleConnectorMouseDown,
    handleConnectorMouseUp,
    updateFieldValue
}: {
    fields: BlueprintField[];
    blueprintId: string;
    handleConnectorMouseDown: (e: React.MouseEvent, fieldId: string) => void;
    handleConnectorMouseUp: (fieldId: string) => void;
    updateFieldValue: (blueprintId: string, fieldId: string, value: number) => void;
}) {
    return (
        <div className="p-4 grid grid-cols-1 auto-rows-fr gap-2">
            {fields.map((field) => (
                <div
                    key={field.id}
                    className={cn("flex items-center mb-1", {
                        "justify-end": field.type === "output",
                        "justify-between": field.type !== "output"
                    })}
                >
                    <Field
                        field={field}
                        blueprintId={blueprintId}
                        handleConnectorMouseDown={handleConnectorMouseDown}
                        handleConnectorMouseUp={handleConnectorMouseUp}
                        updateFieldValue={updateFieldValue}
                    />
                </div>
            ))}
        </div>
    );
}
