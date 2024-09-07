import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";
import { getPropertySafely } from "@/lib/utils.ts";

type ValidType = string | number | Identifier;
export type MultipleAction = {
    type: "Multiple";
    field: Field;
    values: unknown[];
};

/**
 * Check if the types of the two lists are consistent
 * @param list1
 * @param list2
 */
const checkTypesConsistency = (list1: unknown[], list2: unknown[]): boolean => {
    const getType = (item: unknown) => {
        if (typeof item === "string" || typeof item === "number") return typeof item;
        if (item instanceof Identifier) return "Identifier";
        throw new Error("Invalid type");
    };

    if (list1.length === 0 || list2.length === 0) return true;
    const type1 = getType(list1[0]);
    const type2 = getType(list2[0]);

    if (type1 !== type2 || type1 === null) {
        throw new Error("The types of the values are not consistent");
    }

    return list1.every((item) => getType(item) === type1) && list2.every((item) => getType(item) === type1);
};

const isValidType = (value: unknown): value is ValidType => {
    return typeof value === "string" || typeof value === "number" || value instanceof Identifier;
};

const isValueEqual = (a: ValidType, b: ValidType): boolean => {
    if ((typeof a === "string" && typeof b === "string") || (typeof a === "number" && typeof b === "number")) {
        return a === b;
    }

    if (a instanceof Identifier && b instanceof Identifier) {
        return a.equals(b);
    }

    return false;
};

/**
 * Modify the field of the current element, check if the value is in the list, if it is, he tries to remove all the values from the list, if it is not, he adds them.
 * @param action - The action to perform
 * @param context - The context of the configurator
 */
export default function MultipleModifier<T extends Record<string, unknown>>(
    action: MultipleAction,
    context: ConfiguratorContextType<T>
): RegistryElement<T> | undefined {
    const { currentElement } = context;
    if (!currentElement) return;
    const field = getField(action.field, context);

    const newList = getPropertySafely<T, Array<ValidType>>(currentElement.data, field, []);
    if (!checkTypesConsistency(action.values, newList)) {
        throw new Error("The types of the values are not consistent");
    }

    const isValueInList = action.values.some((value): boolean => isValidType(value) && newList.some((item) => isValueEqual(item, value)));

    if (isValueInList) {
        for (const value of action.values) {
            if (isValidType(value)) {
                const index = newList.findIndex((item) => isValueEqual(item, value));
                if (index > -1) {
                    newList.splice(index, 1);
                }
            }
        }
    } else {
        const validValues = action.values.filter(isValidType);
        newList.push(...validValues);
    }

    return {
        identifier: currentElement.identifier,
        data: {
            ...currentElement.data,
            [field]: newList
        }
    };
}
