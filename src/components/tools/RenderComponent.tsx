import { useTranslate } from "@/components/useTranslate";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";
import TagViewer from "@/components/tools/elements/TagViewer";
import ToolCategory from "@/components/tools/elements/ToolCategory.tsx";
import ToolCounter from "@/components/tools/elements/ToolCounter.tsx";
import ToolInline from "@/components/tools/elements/ToolInlineSlot.tsx";
import ToolIteration from "@/components/tools/elements/ToolIteration";
import ToolRange from "@/components/tools/elements/ToolRange.tsx";
import ToolScrollable from "@/components/tools/elements/ToolScrollable.tsx";
import ToolSection from "@/components/tools/elements/ToolSection.tsx";
import ToolSlot from "@/components/tools/elements/ToolSlot.tsx";
import ToolSwitch from "@/components/tools/elements/ToolSwitch.tsx";
import ToolSwitchSlot from "@/components/tools/elements/ToolSwitchSlot.tsx";
import Donation from "@/components/tools/elements/misc/Donation.tsx";
import ToolReveal from "@/components/tools/elements/reveal/ToolReveal.tsx";
import ToolEffectRecord from "@/components/tools/elements/schema/ToolEffectRecord.tsx";
import TextRender from "@/components/tools/elements/text/TextRender.tsx";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import { checkCondition } from "@/lib/minecraft/core/engine/condition";
import { checkLocks } from "@/lib/minecraft/core/engine/lock/index";
import { getValue } from "@/lib/minecraft/core/engine/value";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component.ts";
import { cn } from "@/lib/utils";
import type { EffectComponentsRecord } from "@voxel/definitions";
import { toast } from "sonner";
import { getKey } from "@/lib/minecraft/i18n/translations";
import ToolSelector from "./elements/ToolSelector";

export function RenderComponent<T extends keyof Analysers>({
    component
}: {
    component: FormComponent;
}) {
    const { t } = useTranslate();
    const store = useConfiguratorStore();
    const currentElementId = store.currentElementId;
    const handleChange = store.handleChange;
    const elements = store.elements;
    if (!currentElementId) return null;
    const currentElement = elements.find((element) => element.identifier.equals(currentElementId));
    if (!currentElement) return null;

    if (component.hide && checkCondition<T>(component.hide, currentElement)) {
        return null;
    }

    switch (component.type) {
        case "Counter": {
            const result = getValue<T, number>(component.value, currentElement);
            if (typeof result !== "number") {
                toast.error(t("generic.error"), {
                    description: t("tools.enchantments.warning.component")
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
                    onChange={(value) => handleChange(component.action, currentElement?.identifier, value)}
                />
            );
        }
        case "Selector": {
            const result = getValue<T, string>(component.value, currentElement);
            const { isLocked, text: lockText } = checkLocks<T>(component.lock, currentElement);
            if (typeof result !== "string") {
                toast.error(t("generic.error"), {
                    description: t("tools.enchantments.warning.component")
                });
                return null;
            }

            return (
                <ToolSelector
                    key={getKey(component.title)}
                    title={component.title}
                    description={component.description}
                    value={result}
                    options={component.options}
                    onChange={(value) => handleChange(component.action, currentElement?.identifier, value)}
                    lock={isLocked ? lockText : undefined}
                />
            );
        }
        case "Range": {
            const result = getValue<T, number>(component.value, currentElement);
            if (typeof result !== "number") {
                toast.error(t("generic.error"), {
                    description: t("tools.enchantments.warning.component")
                });

                return null;
            }

            return (
                <ToolRange
                    key={getKey(component.label)}
                    id={getKey(component.label)}
                    value={result}
                    label={component.label}
                    onValueChange={(value) => handleChange(component.action, currentElement?.identifier, value)}
                />
            );
        }
        case "Switch": {
            const result = checkCondition<T>(component.condition, currentElement);
            const { isLocked, text: lockText } = checkLocks<T>(component.lock, currentElement);

            return (
                <ToolSwitch
                    key={getKey(component.title)}
                    title={component.title}
                    checked={result}
                    lock={isLocked ? lockText : undefined}
                    description={component.description}
                    name={component.title}
                    onChange={(value) => handleChange(component.action, currentElement?.identifier, value)}
                />
            );
        }
        case "Slot": {
            const result = checkCondition<T>(component.condition, currentElement);
            const { isLocked, text: lockText } = checkLocks<T>(component.lock, currentElement);

            return (
                <ToolSlot
                    key={getKey(component.title)}
                    title={component.title}
                    checked={result}
                    value={result}
                    size={component.size}
                    lock={isLocked ? lockText : undefined}
                    description={component.description}
                    image={component.image}
                    onChange={(value) => handleChange(component.action, currentElement?.identifier, value)}
                />
            );
        }
        case "InlineSlot": {
            const result = checkCondition<T>(component.condition, currentElement);
            const { isLocked, text: lockText } = checkLocks<T>(component.lock, currentElement);

            return (
                <ToolInline
                    key={getKey(component.title)}
                    title={component.title}
                    description={component.description}
                    checked={result}
                    value={result}
                    lock={isLocked ? lockText : undefined}
                    image={component.image}
                    onChange={(value) => component.action && handleChange(component.action, currentElement?.identifier, value)}
                />
            );
        }
        case "Effect": {
            const result = getValue<T, EffectComponentsRecord>(component.value, currentElement);

            return (
                <ToolEffectRecord
                    value={result}
                    conditions={component.condition}
                    onChange={(value) => component.action && handleChange(component.action, currentElement?.identifier, value)}
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
                    }}>
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
            const checked = checkCondition<T>(component.condition, currentElement);
            const { isLocked, text: lockText } = checkLocks<T>(component.lock, currentElement);

            return (
                <ToolSwitchSlot
                    key={getKey(component.title)}
                    title={component.title}
                    description={component.description}
                    image={component.image}
                    checked={checked}
                    lock={isLocked ? lockText : undefined}
                    onChange={(value) => component.action && handleChange(component.action, currentElement?.identifier, value)}
                />
            );
        }
        case "Flexible": {
            return (
                <div
                    className={cn("flex gap-4", {
                        "flex-row": component.direction === "horizontal",
                        "flex-col": component.direction === "vertical"
                    })}>
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
