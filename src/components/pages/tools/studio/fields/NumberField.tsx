import type { BaseBlueprintField } from "./Field";

export interface NumberFieldType extends BaseBlueprintField {
    type: "number";
    value: number;
}

export default function NumberField(props: {
    field: NumberFieldType;
    updateFieldValue: (blueprintId: string, fieldId: string, value: number) => void;
    blueprintId: string;
}) {
    return (
        <div className="flex items-center justify-between size-full">
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 cursor-pointer bg-green-400" />
                <span>{props.field.name}</span>
            </div>
            <input
                type="number"
                value={props.field.value}
                onChange={(e) => props.updateFieldValue(props.blueprintId, props.field.id, +e.target.value)}
                className="!w-24 h-full text-sm bg-opacity-60 rounded text-right"
            />
        </div>
    );
}
