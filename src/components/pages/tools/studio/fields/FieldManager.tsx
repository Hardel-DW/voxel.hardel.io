import Field, { type BlueprintFieldType } from "@/components/pages/tools/studio/fields/Field.tsx";
import { cn } from "@/lib/utils.ts";
import type React from "react";

export default function FieldManager(props: {
    fields: BlueprintFieldType[];
    blueprintId: string;
    handleConnectorMouseDown: (e: React.MouseEvent, fieldId: string) => void;
    handleConnectorMouseUp: (fieldId: string) => void;
    updateFieldValue: (blueprintId: string, fieldId: string, value: number) => void;
}) {
    return (
        <div className="p-4 grid grid-cols-1 auto-rows-fr gap-2">
            {props.fields.map((field) => (
                <div
                    key={field.id}
                    className={cn("flex items-center mb-1", {
                        "justify-end": field.type === "output",
                        "justify-between": field.type !== "output"
                    })}
                >
                    <Field
                        field={field}
                        blueprintId={props.blueprintId}
                        handleConnectorMouseDown={props.handleConnectorMouseDown}
                        handleConnectorMouseUp={props.handleConnectorMouseUp}
                        updateFieldValue={props.updateFieldValue}
                    />
                </div>
            ))}
        </div>
    );
}
