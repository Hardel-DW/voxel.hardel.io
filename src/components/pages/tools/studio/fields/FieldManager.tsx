import Field, { type BlueprintFieldType } from "@/components/pages/tools/studio/fields/Field.tsx";
import { cn } from "@/lib/utils.ts";

export default function FieldManager(props: {
    fields: BlueprintFieldType[];
    blueprintId: string;
}) {
    return (
        <div className="p-4 grid grid-cols-1 auto-rows-fr gap-2">
            {props.fields.map((field) => (
                <div
                    key={field.id}
                    className={cn("flex items-center mb-1 h-10", {
                        "justify-end": field.type === "output",
                        "justify-between": field.type !== "output"
                    })}
                >
                    <Field field={field} blueprintId={props.blueprintId} />
                </div>
            ))}
        </div>
    );
}
