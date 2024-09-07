import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { ConditionResult } from "@/lib/minecraft/voxel/condition/index.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type NoneCondition = {
    condition: "None";
    field: Field;
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object";
}

export function CheckNoneCondition<T>(condition: NoneCondition, context: ConfiguratorContextType<T>): ConditionResult {
    const { currentElement } = context;
    if (!currentElement) return;

    const field = getField<T>(condition.field, context);
    const value = currentElement.data[field];
    if (typeof value !== "string" && typeof value !== "boolean" && typeof value !== "number" && !isRecord(value) && !Array.isArray(value)) {
        return;
    }

    return { value };
}
