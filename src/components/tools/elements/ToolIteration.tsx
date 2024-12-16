import { useConfigurator } from "@/components/tools/ConfiguratorContext.tsx";
import { RenderComponent } from "@/components/tools/RenderComponent";
import { createIterations } from "@/lib/minecraft/core/engine/resolver/iteration/createIterations.ts";
import { resolveIterationValue } from "@/lib/minecraft/core/engine/resolver/iteration/resolveIterationValue.ts";
import type { TemplateReplacer } from "@/lib/minecraft/core/engine/resolver/iteration/type";
import type { FormComponent, ToolIterationType } from "@/lib/minecraft/core/schema/primitive/component.ts";

export default function ToolIteration(props: ToolIterationType) {
    const context = useConfigurator();
    const iterations = props.values.flatMap((valueSet) => createIterations(valueSet, context.files));

    return (
        <>
            {iterations.map((iteration) => {
                const resolvedTemplate = JSON.parse(JSON.stringify(props.template), (_, value: TemplateReplacer<FormComponent>) =>
                    resolveIterationValue(value, iteration.context)
                );

                return <RenderComponent key={iteration.key} component={resolvedTemplate} />;
            })}
        </>
    );
}
