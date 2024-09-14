import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import ToolCollection from "@/lib/minecraft/components/elements/ToolCollection.tsx";
import ToolCounter from "@/lib/minecraft/components/elements/ToolCounter.tsx";
import ToolInline from "@/lib/minecraft/components/elements/ToolInlineSlot.tsx";
import ToolRange from "@/lib/minecraft/components/elements/ToolRange.tsx";
import ToolSection from "@/lib/minecraft/components/elements/ToolSection.tsx";
import ToolSlot from "@/lib/minecraft/components/elements/ToolSlot.tsx";
import ToolSwitch from "@/lib/minecraft/components/elements/ToolSwitch.tsx";
import Donation from "@/lib/minecraft/components/elements/misc/Donation.tsx";
import ToolReveal from "@/lib/minecraft/components/elements/reveal/ToolReveal.tsx";
import ToolEffectRecord from "@/lib/minecraft/components/elements/schema/ToolEffectRecord.tsx";
import type { FormComponent } from "@/lib/minecraft/core/engine";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { getValue } from "@/lib/minecraft/core/engine/value";
import type { EffectComponentsRecord } from "@/lib/minecraft/schema/enchantment/EffectComponents.ts";
import { toast } from "sonner";
import { handleChange } from "src/lib/minecraft/core/engine/actions";
import { checkCondition } from "src/lib/minecraft/core/engine/condition";

type RenderComponentProps = {
    component: FormComponent;
};

export function RenderComponent<T extends keyof Analysers>({ component }: RenderComponentProps) {
    const context = useConfigurator<GetAnalyserVoxel<T>>();
    const { translate } = useTranslate();
    if (!context.currentElement) return null;

    switch (component.type) {
        case "Counter": {
            const result = getValue<T, number>(context, component.value, context.currentElement);
            if (typeof result !== "number") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.effect"]
                });

                return null;
            }

            return (
                <ToolCounter
                    key={component.title}
                    value={result}
                    min={component.min}
                    max={component.max}
                    step={component.step}
                    title={translate[component.title]}
                    image={component.image}
                    description={translate[component.description]}
                    onChange={(option) => handleChange(component.action, option, context)}
                />
            );
        }
        case "Range": {
            const result = getValue<T, number>(context, component.value, context.currentElement);
            if (typeof result !== "number") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.effect"]
                });

                return null;
            }

            return (
                <ToolRange
                    key={component.label}
                    id={component.label}
                    value={result}
                    label={translate[component.label]}
                    onValueChange={(option) => handleChange(component.action, option, context)}
                />
            );
        }
        case "Switch": {
            const result = checkCondition<T>(component.condition, context, context.currentElement);
            const lock = component.lock ? getValue<T, string>(context, component.lock, context.currentElement) : null;

            return (
                <ToolSwitch
                    key={component.title}
                    title={translate[component.title]}
                    checked={result}
                    lock={lock ? lock : undefined}
                    description={translate[component.description]}
                    name={component.title}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "Slot": {
            const hide = component.hide ? checkCondition<T>(component.hide, context, context.currentElement) : false;
            const result = checkCondition<T>(component.condition, context, context.currentElement);
            const lock = component.lock ? getValue<T, string>(context, component.lock, context.currentElement) : null;

            return (
                <ToolSlot
                    key={component.title}
                    title={translate[component.title]}
                    checked={result}
                    value={result}
                    hide={hide}
                    lock={lock ? lock : undefined}
                    description={component.description ? translate[component.description] : undefined}
                    image={component.image}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "InlineSlot": {
            const hide = component.hide ? checkCondition<T>(component.hide, context, context.currentElement) : false;
            const result = checkCondition<T>(component.condition, context, context.currentElement);
            const lock = component.lock ? getValue<T, string>(context, component.lock, context.currentElement) : null;

            return (
                <ToolInline
                    key={component.title}
                    title={translate[component.title]}
                    checked={result}
                    value={result}
                    hide={hide}
                    lock={lock ? lock : undefined}
                    description={component.description ? translate[component.description] : undefined}
                    image={component.image}
                    onChange={(value) => component.action && handleChange(component.action, value, context)}
                />
            );
        }
        case "Effect": {
            const result = getValue<T, EffectComponentsRecord>(context, component.value, context.currentElement);
            if (!result) {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.effect"]
                });

                return null;
            }

            return (
                <ToolEffectRecord
                    value={result}
                    conditions={component.condition}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "Collection": {
            return <ToolCollection action={component.action} field={component.field} includes={component.includes} />;
        }
        case "Donation": {
            return <Donation title={component.title} link={component.link} description={component.description} image={component.image} />;
        }
        case "Reveal": {
            return <ToolReveal elements={component.elements} />;
        }
        case "Section": {
            return (
                <div className="[&:not(:first-child)]:mt-8">
                    <ToolSection title={component.title} id={component.id} toggle={component.toggle}>
                        {component.children.map((child, index: number) => (
                            <RenderComponent key={component.id + index.toString()} component={child} />
                        ))}
                    </ToolSection>
                </div>
            );
        }
        case "Grid": {
            const size = component.size ? component.size : "255px";

            return (
                <div className="grid max-xl:grid-cols-1 gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${size}, 1fr))` }}>
                    {component.children.map((child, index: number) => (
                        <RenderComponent key={index.toString()} component={child} />
                    ))}
                </div>
            );
        }
    }
}
