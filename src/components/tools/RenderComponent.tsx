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
import ToolPropertyRecord from "@/components/tools/elements/schema/ToolPropertyRecord";
import ToolSelector from "@/components/tools/elements/ToolSelector";
import ToolGrid from "@/components/tools/elements/ToolGrid";
import TextRender from "@/components/tools/elements/text/TextRender.tsx";
import ToolFlexible from "@/components/tools/elements/ToolFlexible";
import type { Analysers } from "@/lib/minecraft/core/engine/Analyser";
import { checkCondition } from "@/lib/minecraft/core/engine/condition";
import { checkLocks } from "@/lib/minecraft/core/engine/lock/index";
import { getValue } from "@/lib/minecraft/core/engine/value";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component.ts";
import { getKey } from "@/lib/minecraft/i18n/translations";

export function RenderComponent<T extends keyof Analysers>({ component }: { component: FormComponent }) {
    const store = useConfiguratorStore();
    const currentElement = store.getCurrentElement();
    const handleChange = store.handleChange;
    if (!currentElement) return null;

    if (component.hide && checkCondition<T>(component.hide, currentElement)) {
        return null;
    }

    switch (component.type) {
        case "Counter": {
            const result = getValue<T, number>(component.renderer, currentElement);
            const { isLocked, text: lockText } = checkLocks<T>(component.lock, currentElement);

            return (
                <ToolCounter
                    key={getKey(component.title)}
                    lock={isLocked ? lockText : undefined}
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
            const result = getValue<T, string>(component.renderer, currentElement);
            const { isLocked, text: lockText } = checkLocks<T>(component.lock, currentElement);
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
            const result = getValue<T, number>(component.renderer, currentElement);
            const { isLocked, text: lockText } = checkLocks<T>(component.lock, currentElement);

            return (
                <ToolRange
                    key={getKey(component.label)}
                    id={getKey(component.label)}
                    lock={isLocked ? lockText : undefined}
                    value={result}
                    label={component.label}
                    min={component.min}
                    max={component.max}
                    step={component.step}
                    onChange={(value) => handleChange(component.action, currentElement?.identifier, value)}
                />
            );
        }
        case "Switch": {
            const result = getValue<T, boolean>(component.renderer, currentElement);
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
            const result = getValue<T, boolean>(component.renderer, currentElement);
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
            const result = getValue<T, boolean>(component.renderer, currentElement);
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
        case "Property": {
            return (
                <ToolPropertyRecord
                    value={currentElement[component.properties as keyof typeof currentElement]}
                    conditions={component.condition}
                    element={currentElement}
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
            return <ToolGrid size={component.size}>{component.children}</ToolGrid>;
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
            const checked = getValue<T, boolean>(component.renderer, currentElement);
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
            return <ToolFlexible direction={component.direction}>{component.children}</ToolFlexible>;
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
