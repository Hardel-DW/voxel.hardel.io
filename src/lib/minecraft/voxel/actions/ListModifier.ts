import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import type { ActionValue } from "@/lib/minecraft/voxel/actions/index.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";
import { getPropertySafely } from "@/lib/utils.ts";

export type ListAction = {
    type: "List";
    field: Field;
    value: string;
};

export default function ListModifier<T extends Record<string, unknown>>(
    action: ListAction,
    value: ActionValue,
    context: ConfiguratorContextType<T>
): RegistryElement<T> | undefined {
    if (typeof value !== "boolean") {
        throw new Error("List action requires a boolean value");
    }

    const { currentElement } = context;
    if (!currentElement) return;

    const shadowCopy = structuredClone(currentElement);
    const field = getField(action.field, context);

    const list = getPropertySafely<T, Array<unknown>>(shadowCopy.data, field, []);
    const newList = value ? [...list, action.value] : list.filter((item) => item !== action.value);

    return {
        identifier: currentElement.identifier,
        data: {
            ...currentElement.data,
            [field]: newList
        }
    };
}
