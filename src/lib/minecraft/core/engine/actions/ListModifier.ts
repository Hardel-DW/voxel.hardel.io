import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions/index.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { getPropertySafely } from "@/lib/utils.ts";

export type ListAction = {
    type: "List";
    field: Field;
    value: string;
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
    value: ActionValue,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    if (typeof value !== "boolean") {
        throw new Error("List action requires a boolean value");
    }

    const shadowCopy = structuredClone(element);
    const field = getField(action.field, context);
    const list = getPropertySafely<GetAnalyserVoxel<T>, Array<unknown>>(shadowCopy.data, field, []);
    const newList = value ? [...list, action.value] : list.filter((item) => item !== action.value);

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: newList
        }
    };
}
