import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import { RenderComponent } from "@/lib/minecraft/components/RenderComponent";
import type { IterationType } from "@/lib/minecraft/core/engine/iteration";
import { collectFromPath, resolveIterationValue } from "@/lib/minecraft/core/engine/iteration";

type InternalCurrentIteration = {
    current_iteration: string;
};

type InternalFileName = {
    file_name: string;
    namespace: string;
    identifier: string;
};

export type InternalIterationResult = InternalCurrentIteration | InternalFileName;

export type IterationResult = {
    key: string;
    context: InternalIterationResult;
};

export default function ToolIteration(props: IterationType) {
    const context = useConfigurator();

    const iterations: IterationResult[] = props.values.flatMap<IterationResult>((valueSet) => {
        if (valueSet.type === "collect_from_path") {
            const files = collectFromPath(valueSet.registry, context, valueSet.path);
            return files.map((file) => ({
                key: file.identifier.toString(),
                context: {
                    file_name: file.identifier.renderResource(),
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
