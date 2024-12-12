import { useConfigurator } from "@/components/tools/ConfiguratorContext.tsx";
import { RenderComponent } from "@/components/tools/RenderComponent";
import type { VoxelElement } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { InternalIterationResult, IterationResult, IterationType } from "@/lib/minecraft/core/schema/primitive/iteration";
import { type RegistryElement, getRegistry } from "@/lib/minecraft/mczip.ts";

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
    files: Record<string, Uint8Array>,
    path: string,
    exclude_namespace?: string[]
): RegistryElement<T>[] {
    const content = getRegistry<T>(files, registry);
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
            const files = collectFromPath(valueSet.registry, context.files, valueSet.path, valueSet.exclude_namespace);
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
