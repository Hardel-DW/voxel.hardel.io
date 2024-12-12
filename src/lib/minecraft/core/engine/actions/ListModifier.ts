import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ExtraActionData } from "@/lib/minecraft/core/engine/actions/index.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { getPropertySafely } from "@/lib/utils.ts";

export type ListAction = {
    type: "List";
    field: Field;
    value: string;
    mode?: "remove_if_empty";
};

/**
 * Toggle the value in the list field of the element. it will add/remove the hardcoded value to the list depending on the dynamic boolean value
 * @param action - The action to perform.
 * @param value - The value to set.
 * @param context - The context of the configurator.
 * @param element - The element to modify.
 * @constructor
 */
export default function ListModifier<T extends keyof Analysers>(
    action: ListAction,
    element: RegistryElement<GetAnalyserVoxel<T>>,
    extra: ExtraActionData
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const { value, toggleSection } = extra;
    if (typeof value !== "boolean") {
        throw new Error("List action requires a boolean value");
    }

    const shadowCopy = structuredClone(element);
    const field = getField(action.field, toggleSection);
    const list = getPropertySafely<GetAnalyserVoxel<T>, Array<unknown>>(shadowCopy.data, field, []);
    const newList = value ? [...list, action.value] : list.filter((item) => item !== action.value);

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: action.mode === "remove_if_empty" && newList.length === 0 ? undefined : newList
        }
    };
}
