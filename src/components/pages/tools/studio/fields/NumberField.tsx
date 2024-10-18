import type { BaseBlueprintField } from "./Field";

export interface NumberFieldType extends BaseBlueprintField {
    type: "number";
    value: number;
}

export default function NumberField({ field, updateFieldValue, blueprintId }: {
    field: NumberFieldType;
    updateFieldValue: (blueprintId: string, fieldId: string, value: number) => void;
    blueprintId: string;
}) {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 cursor-pointer bg-green-400" />
                <span>{field.name}</span>
            </div>
            <input
                type="number"
                value={field.value}
                onChange={(e) => updateFieldValue(blueprintId, field.id, +e.target.value)}
                className="!w-24 text-sm bg-opacity-60 rounded text-right"
            />
        </div>
    );
}
