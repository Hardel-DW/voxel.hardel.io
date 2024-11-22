import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import TagViewer from "@/lib/minecraft/components/elements/TagViewer";
import ToolCategory from "@/lib/minecraft/components/elements/ToolCategory.tsx";
import ToolCounter from "@/lib/minecraft/components/elements/ToolCounter.tsx";
import ToolInline from "@/lib/minecraft/components/elements/ToolInlineSlot.tsx";
import ToolIteration from "@/lib/minecraft/components/elements/ToolIteration";
import ToolRange from "@/lib/minecraft/components/elements/ToolRange.tsx";
import ToolScrollable from "@/lib/minecraft/components/elements/ToolScrollable.tsx";
import ToolSection from "@/lib/minecraft/components/elements/ToolSection.tsx";
import ToolSlot from "@/lib/minecraft/components/elements/ToolSlot.tsx";
import ToolSwitch from "@/lib/minecraft/components/elements/ToolSwitch.tsx";
import ToolSwitchSlot from "@/lib/minecraft/components/elements/ToolSwitchSlot.tsx";
import Donation from "@/lib/minecraft/components/elements/misc/Donation.tsx";
import ToolReveal from "@/lib/minecraft/components/elements/reveal/ToolReveal.tsx";
import ToolEffectRecord from "@/lib/minecraft/components/elements/schema/ToolEffectRecord.tsx";
import TextRender from "@/lib/minecraft/components/elements/text/TextRender.tsx";
import { getKey } from "@/lib/minecraft/components/elements/text/TranslateText";
import type { FormComponent } from "@/lib/minecraft/core/engine";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import { handleChange } from "@/lib/minecraft/core/engine/actions";
import { checkCondition } from "@/lib/minecraft/core/engine/condition";
import { getValue } from "@/lib/minecraft/core/engine/value";
import { cn } from "@/lib/utils";
import type { EffectComponentsRecord } from "@voxel/definitions";
import { toast } from "sonner";

export function RenderComponent<T extends keyof Analysers>({
    component
}: {
    component: FormComponent;
}) {
    const context = useConfigurator<GetAnalyserVoxel<T>>();
    const { translate } = useTranslate();
    if (!context.currentElement) return null;
    if (component.hide && checkCondition<T>(component.hide, context, context.currentElement)) {
        return null;
    }

    switch (component.type) {
        case "Counter": {
            const result = getValue<T, number>(context, component.value, context.currentElement);
            if (typeof result !== "number") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.component"]
                });

                return null;
            }

            return (
                <ToolCounter
                    key={getKey(component.title)}
                    value={result}
                    min={component.min}
                    max={component.max}
                    step={component.step}
                    title={component.title}
                    short={component.short}
                    image={component.image}
                    description={component.description}
                    onChange={(option) => handleChange(component.action, option, context)}
                />
            );
        }
        case "Range": {
            const result = getValue<T, number>(context, component.value, context.currentElement);
            if (typeof result !== "number") {
                toast.error(translate["generic.error"], {
                    description: translate["tools.enchantments.warning.component"]
                });

                return null;
            }

            return (
                <ToolRange
                    key={getKey(component.label)}
                    id={getKey(component.label)}
                    value={result}
                    label={component.label}
                    onValueChange={(option) => handleChange(component.action, option, context)}
                />
            );
        }
        case "Switch": {
            const result = checkCondition<T>(component.condition, context, context.currentElement);
            const lock = component.lock ? getValue<T, string>(context, component.lock, context.currentElement) : null;

            return (
                <ToolSwitch
                    key={getKey(component.title)}
                    title={component.title}
                    checked={result}
                    lock={lock ? lock : undefined}
                    description={component.description}
                    name={getKey(component.title)}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "Slot": {
            const result = checkCondition<T>(component.condition, context, context.currentElement);
            const lock = component.lock ? getValue<T, string>(context, component.lock, context.currentElement) : null;

            return (
                <ToolSlot
                    key={getKey(component.title)}
                    title={component.title}
                    checked={result}
                    value={result}
                    size={component.size}
                    lock={lock ? lock : undefined}
                    description={component.description}
                    image={component.image}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "InlineSlot": {
            const result = checkCondition<T>(component.condition, context, context.currentElement);
            const lock = component.lock ? getValue<T, string>(context, component.lock, context.currentElement) : null;

            return (
                <ToolInline
                    key={getKey(component.title)}
                    title={component.title}
                    description={component.description}
                    checked={result}
                    value={result}
                    lock={lock ? lock : undefined}
                    image={component.image}
                    onChange={(value) => component.action && handleChange(component.action, value, context)}
                />
            );
        }
        case "Effect": {
            const result = getValue<T, EffectComponentsRecord>(context, component.value, context.currentElement);

            return (
                <ToolEffectRecord
                    value={result}
                    conditions={component.condition}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "Donation": {
            return <Donation title={component.title} link={component.link} description={component.description} image={component.image} />;
        }
        case "Reveal": {
            return <ToolReveal elements={component.elements} />;
        }
        case "Category": {
            return <ToolCategory title={component.title} component={component.children} />;
        }
        case "Section": {
            return (
                <div className="not-first:mt-8">
                    <ToolSection title={component.title} id={component.id} toggle={component.toggle} button={component.button}>
                        {component.children.map((child: FormComponent, index: number) => (
                            <RenderComponent key={component.id + index.toString()} component={child} />
                        ))}
                    </ToolSection>
                </div>
            );
        }
        case "Grid": {
            const size = component.size ? component.size : "255px";

            return (
                <div
                    className="grid max-xl:grid-cols-1 gap-4"
                    style={{
                        gridTemplateColumns: `repeat(auto-fit, minmax(${size}, 1fr))`
                    }}
                >
                    {component.children.map((child: FormComponent, index: number) => (
                        <RenderComponent key={index.toString()} component={child} />
                    ))}
                </div>
            );
        }
        case "Text": {
            return <TextRender content={component.content} />;
        }
        case "Scrollable": {
            return (
                <ToolScrollable height={component.height}>
                    {component.children.map((child: FormComponent, index: number) => (
                        <RenderComponent key={index.toString()} component={child} />
                    ))}
                </ToolScrollable>
            );
        }
        case "SwitchSlot": {
            const checked = checkCondition<T>(component.condition, context, context.currentElement);
            const lock = component.lock ? getValue<T, string>(context, component.lock, context.currentElement) : null;

            return (
                <ToolSwitchSlot
                    key={getKey(component.title)}
                    title={component.title}
                    description={component.description}
                    image={component.image}
                    checked={checked}
                    lock={lock ? lock : undefined}
                    onChange={(value) => handleChange(component.action, value, context)}
                />
            );
        }
        case "Flexible": {
            return (
                <div
                    className={cn("flex gap-4", {
                        "flex-row": component.direction === "horizontal",
                        "flex-col": component.direction === "vertical"
                    })}
                >
                    {component.children.map((child: FormComponent, index: number) => (
                        <RenderComponent key={index.toString()} component={child} />
                    ))}
                </div>
            );
        }
        case "Iteration":
            return <ToolIteration {...component} />;
        case "TagViewer": {
            return <TagViewer field={component.field} registry={component.registry} additional={component.additional} />;
        }
        default:
            return null;
    }
}
