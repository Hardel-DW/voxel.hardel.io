import type { ConfiguratorContextType } from "@/components/tools/ConfiguratorContext.tsx";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ActionValue } from "@/lib/minecraft/core/engine/actions/index.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";

export type DynamicListAction = {
    type: "DynamicList";
    field: Field;
};

/**
 * Toggle the value in the list field of the element. it adds them if not present, remove them if present.
 * @param action - The action to perform.
 * @param value - The value to set.
 * @param context - The context of the configurator.
 * @param element - The element to modify.
 * @constructor
 */
export default function DynamicListModifier<T extends keyof Analysers>(
    action: DynamicListAction,
    value: ActionValue,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const shadowCopy = structuredClone(element);
    const field = getField(action.field, context);
    const list = (shadowCopy.data[field] as string[]) || [];
    if (!Array.isArray(list) || !list.every((item) => typeof item === "string") || typeof value !== "string") {
        return;
    }

    const isPresent = list.includes(value);
    const newList = isPresent ? list.filter((item) => item !== value) : [...list, value];

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: newList
        }
    };
}
