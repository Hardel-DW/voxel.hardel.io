import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import type { BaseBlueprintField } from "./Field";

export interface NumberFieldType extends BaseBlueprintField {
    type: "number";
    value: number;
}

export default function NumberField(props: {
    field: NumberFieldType;
    blueprintId: string;
}) {
    const { updateFieldValue } = useStudioContext();

    return (
        <div className="flex items-center justify-between size-full">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full cursor-pointer bg-green-400" />
                <span>{props.field.name}</span>
            </div>
            <input
                type="number"
                value={props.field.value}
                onChange={(e) => updateFieldValue(props.blueprintId, props.field.id, Number(e.target.value))}
                className="!w-24 h-full text-sm bg-opacity-60 rounded text-right"
            />
        </div>
    );
}
