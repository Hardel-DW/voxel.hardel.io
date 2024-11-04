import type { ConfiguratorContextType } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { RenderComponent } from "@/lib/minecraft/components/RenderComponent";
import type { FormComponent, GetValueFromContext } from "@/lib/minecraft/core/engine";
import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser.ts";
import { type RegistryElement, getRegistry } from "@/lib/minecraft/mczip.ts";

type IterationCollectFromPath = {
    type: "collect_from_path";
    registry: string;
    path: string;
    exclude_namespace?: string[];
};

type IterationStatic = {
    type: "static";
    values: string[];
};

type IterationObject = {
    type: "object";
    values: Record<string, any>[];
};

type IterationGetRegistryElements = {
    type: "get_registry_elements";
    registry: string;
};

export type IterationType = {
    type: "Iteration";
    values: IterationValue[];
    template: TemplateReplacer<FormComponent>;
};

type IterationValue = IterationCollectFromPath | IterationStatic | IterationObject | IterationGetRegistryElements;
type TemplateReplacer<T> = T extends string
    ? string | GetValueFromContext
    : T extends object
      ? { [K in keyof T]: T[K] extends GetValueFromContext ? T[K]["key"] : TemplateReplacer<T[K]> }
      : T;

type InternalCurrentIteration = {
    current_iteration: string;
};

type InternalFileName = {
    filename: string;
    resource: string;
    namespace: string;
    identifier: string;
};

type InternalObjectData = {
    object_data: Record<string, any>;
};

export type InternalIterationResult = InternalCurrentIteration | InternalFileName | InternalObjectData;
export type IterationResult = {
    key: string;
    context: InternalIterationResult;
};

function resolveIterationValue(value: any, context: InternalIterationResult | undefined): any {
    if (typeof value === "object" && value?.type === "get_value_from_context") {
        if (!context) return value;

        if ("current_iteration" in context) {
            return context.current_iteration;
        }

        if ("filename" in context) {
            switch (value.key) {
                case "filename":
                    return context.filename;
                case "resource":
                    return context.resource;
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

function collectFromPath<T extends VoxelElement>(
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

export default function ToolIteration(props: IterationType) {
    const context = useConfigurator();

    const iterations: IterationResult[] = props.values.flatMap<IterationResult>((valueSet) => {
        if (valueSet.type === "collect_from_path") {
            const files = collectFromPath(valueSet.registry, context, valueSet.path, valueSet.exclude_namespace);
            return files.map((file) => ({
                key: file.identifier.toString(),
                context: {
                    filename: file.identifier.renderFilename(),
                    resource: file.identifier.renderResource(),
                    namespace: file.identifier.getNamespace(),
                    identifier: file.identifier.toString()
                }
            }));
        }

        if (valueSet.type === "get_registry_elements") {
            const files = getRegistry(context.files, valueSet.registry);
            return files.map((file) => ({
                key: file.identifier.toString(),
                context: {
                    filename: file.identifier.renderFilename(),
                    resource: file.identifier.renderResource(),
                    namespace: file.identifier.getNamespace(),
                    identifier: file.identifier.toString()
                }
            }));
        }

        if (valueSet.type === "static") {
            return valueSet.values.map((value) => ({
                key: value,
                context: {
                    current_iteration: value
                }
            }));
        }

        if (valueSet.type === "object") {
            return valueSet.values.map((objectData, index) => ({
                key: `object_${index}`,
                context: {
                    object_data: objectData
                }
            }));
        }

        return [];
    });

    return (
        <>
            {iterations.map((iteration) => {
                const resolvedTemplate = JSON.parse(JSON.stringify(props.template), (_, value) =>
                    resolveIterationValue(value, iteration.context)
                );

                return <RenderComponent key={iteration.key} component={resolvedTemplate} />;
            })}
        </>
    );
}
