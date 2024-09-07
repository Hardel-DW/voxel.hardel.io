import type { ConfiguratorContextType } from "@/components/pages/tools/ConfiguratorContext.tsx";
import type { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import type { ActionValue } from "@/lib/minecraft/voxel/actions/index.ts";
import { type Field, getField } from "@/lib/minecraft/voxel/field";

export type TagsAction = {
    type: "Tags";
    field: Field;
    value: Identifier;
};

export default function TagsModifier<T>(
    action: TagsAction,
    value: ActionValue,
    context: ConfiguratorContextType<T>
): RegistryElement<T> | undefined {
    if (typeof value !== "boolean") {
        throw new Error("Tags action requires a boolean value");
    }

    const { currentElement } = context;
    if (!currentElement) return;
    const field = getField<T>(action.field, context);

    const tags = currentElement.data[field] as Identifier[];
    const newTags = value ? [...tags, action.value] : tags.filter((tag) => !tag.equals(action.value));

    return {
        identifier: currentElement.identifier,
        data: {
            ...currentElement.data,
            [field]: newTags
        }
    };
}
