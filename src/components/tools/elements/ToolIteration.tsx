import { RenderComponent } from "@/components/tools/RenderComponent";
import { createIterations } from "@/lib/minecraft/core/engine/resolver/iteration/createIterations.ts";
import { resolveIterationValue } from "@/lib/minecraft/core/engine/resolver/iteration/resolveIterationValue.ts";
import type { TemplateReplacer } from "@/lib/minecraft/core/engine/resolver/iteration/type";
import type { FormComponent, ToolIterationType } from "@/lib/minecraft/core/schema/primitive/component.ts";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";

export default function ToolIteration({ component }: { component: ToolIterationType }) {
    const files = useConfiguratorStore((state) => state.files);
    const iterations = component.values.flatMap((valueSet) => createIterations(valueSet, files));

    return (
        <>
            {iterations.map((iteration) => {
                const resolvedTemplate = JSON.parse(JSON.stringify(component.template), (_, value: TemplateReplacer<FormComponent>) =>
                    resolveIterationValue(value, iteration.context)
                );

                return <RenderComponent key={iteration.key} component={resolvedTemplate} />;
            })}
            {component.fallback && iterations.length === 0 && <RenderComponent key="fallback" component={component.fallback} />}
        </>
    );
}
