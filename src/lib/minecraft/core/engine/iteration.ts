import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type RegistryElement, getRegistry } from "@/lib/minecraft/mczip.ts";
import type { FormComponent, GetValueFromContext } from "./index";
import type { InternalIterationResult } from "@/lib/minecraft/components/elements/ToolIteration";

export type IterationCollectFromPath = {
    type: "collect_from_path";
    registry: string;
    path: string;
    exclude_namespace?: string[];
};

export type IterationStatic = {
    type: "static";
    values: string[];
};

export type IterationObject = {
    type: "object";
    values: Record<string, any>[];
};

export type IterationValue = IterationCollectFromPath | IterationStatic | IterationObject;

export type IterationType = {
    type: "Iteration";
    values: IterationValue[];
    template: TemplateReplacer<FormComponent>;
};

type TemplateReplacer<T> = T extends string
    ? string | GetValueFromContext
    : T extends object
      ? { [K in keyof T]: T[K] extends GetValueFromContext ? T[K]["key"] : TemplateReplacer<T[K]> }
      : T;

export function resolveIterationValue(value: any, context: InternalIterationResult | undefined): any {
    if (typeof value === "object" && value?.type === "get_value_from_context") {
        if (!context) return value;

        if ("current_iteration" in context) {
            return context.current_iteration;
        }

        if ("file_name" in context) {
            switch (value.key) {
                case "file_name":
                    return context.file_name;
                case "namespace":
                    return context.namespace;
                case "identifier":
                    return context.identifier;
                default:
                    return context[value.key as keyof typeof context] ?? value;
            }
        }

        if ("object_data" in context) {
            return context.object_data[value.key] ?? value;
        }
    }
    return value;
}

export function collectFromPath<T extends VoxelElement>(
    registry: string,
    context: ConfiguratorContextType<T>,
    path: string,
    exclude_namespace?: string[]
): RegistryElement<T>[] {
    const content = getRegistry<T>(context.files, registry);
    return content.filter((element) => {
        const matchesPath = element.identifier.getResource().startsWith(path);
        if (!matchesPath) return false;

        if (exclude_namespace && exclude_namespace.length > 0) {
            return !exclude_namespace.includes(element.identifier.getNamespace());
        }

        return true;
    });
}
