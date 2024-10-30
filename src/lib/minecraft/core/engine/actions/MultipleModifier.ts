import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type Field, getField } from "@/lib/minecraft/core/engine/field";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import { getPropertySafely } from "@/lib/utils";
type ValidType = string | number | Identifier;

export type MultipleAction = {
    type: "Multiple";
    field: Field;
    values: ValidType[];
};

/**
 * Check if the types of the two lists are consistent
 * @param list1 - The first list
 * @param list2 - The second list
 */
const checkTypesConsistency = (list1: unknown[], list2: unknown[]): boolean => {
    const getType = (item: unknown): string =>
        typeof item === "string" || typeof item === "number" ? typeof item : item instanceof Identifier ? "Identifier" : "Invalid";

    if (list1.length === 0 || list2.length === 0) return true;

    const type = getType(list1[0]);
    return type !== "Invalid" && list1.every((item) => getType(item) === type) && list2.every((item) => getType(item) === type);
};

/**
 * Check if the value is a valid type
 * @param value - The value to check
 */
const isValidType = (value: unknown): value is ValidType =>
    typeof value === "string" || typeof value === "number" || value instanceof Identifier;

/**
 * Check if the two values are equal
 * @param a - The first value
 * @param b - The second value
 */
const isValueEqual = (a: ValidType, b: ValidType): boolean =>
    (typeof a === typeof b && a === b) || (a instanceof Identifier && b instanceof Identifier && a.equals(b));

/**
 * Modify the field of the current element, check if the value is in the list, if it is, he tries to remove all the values from the list, if it is not, he adds them.
 * @param action - The action to perform
 * @param context - The context of the configurator
 * @param element - The element to modify
 */
export default function MultipleModifier<T extends keyof Analysers>(
    action: MultipleAction,
    context: ConfiguratorContextType<GetAnalyserVoxel<T>>,
    element: RegistryElement<GetAnalyserVoxel<T>>
): RegistryElement<GetAnalyserVoxel<T>> | undefined {
    const field = getField(action.field, context);
    const currentList = getPropertySafely<GetAnalyserVoxel<T>, Array<ValidType>>(element.data, field, []);
    if (!checkTypesConsistency(action.values, currentList)) {
        throw new Error("The types of the values are not consistent");
    }

    const validValues = action.values.filter(isValidType);
    const isValueInList = validValues.some((value) => currentList.some((item) => isValueEqual(item, value)));

    const newList = isValueInList
        ? currentList.filter((item) => !validValues.some((value) => isValueEqual(item, value)))
        : [...currentList, ...validValues];

    return {
        identifier: element.identifier,
        data: {
            ...element.data,
            [field]: newList
        }
    };
}
