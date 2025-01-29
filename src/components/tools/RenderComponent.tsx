import Donation from "@/components/tools/elements/Donation";
import ToolCategory from "@/components/tools/elements/ToolCategory.tsx";
import ToolCounter from "@/components/tools/elements/ToolCounter.tsx";
import ToolFlexible from "@/components/tools/elements/ToolFlexible";
import ToolGrid from "@/components/tools/elements/ToolGrid";
import ToolInlineSlot from "@/components/tools/elements/ToolInlineSlot.tsx";
import ToolIteration from "@/components/tools/elements/ToolIteration";
import ToolRange from "@/components/tools/elements/ToolRange.tsx";
import ToolScrollable from "@/components/tools/elements/ToolScrollable.tsx";
import ToolSection from "@/components/tools/elements/ToolSection.tsx";
import ToolSelector from "@/components/tools/elements/ToolSelector";
import ToolSlot from "@/components/tools/elements/ToolSlot.tsx";
import ToolSwitch from "@/components/tools/elements/ToolSwitch.tsx";
import ToolSwitchSlot from "@/components/tools/elements/ToolSwitchSlot.tsx";
import ToolProperty from "@/components/tools/elements/schema/property/ToolProperty";
import ToolReveal from "@/components/tools/elements/schema/reveal/ToolReveal";
import ToolTagViewer from "@/components/tools/elements/schema/tags/ToolTagViewer";
import TextRender from "@/components/tools/elements/text/TextRender.tsx";
import type { FormComponent } from "@/lib/minecraft/core/schema/primitive/component.ts";
import { BaseComponent } from "./elements/BaseComponent";

type ComponentMap = {
    [K in FormComponent["type"]]: React.ComponentType<{
        component: Extract<FormComponent, { type: K }>;
    }>;
};

const COMPONENT_MAP: ComponentMap = {
    Counter: BaseComponent(ToolCounter),
    Selector: BaseComponent(ToolSelector),
    Range: BaseComponent(ToolRange),
    Switch: BaseComponent(ToolSwitch),
    Slot: BaseComponent(ToolSlot),
    SwitchSlot: BaseComponent(ToolSwitchSlot),
    InlineSlot: BaseComponent(ToolInlineSlot),
    Property: BaseComponent(ToolProperty),
    Donation: BaseComponent(Donation),
    Reveal: BaseComponent(ToolReveal),
    Category: BaseComponent(ToolCategory),
    Section: BaseComponent(ToolSection),
    Grid: BaseComponent(ToolGrid),
    Text: BaseComponent(TextRender),
    Scrollable: BaseComponent(ToolScrollable),
    Flexible: BaseComponent(ToolFlexible),
    Iteration: BaseComponent(ToolIteration),
    TagViewer: BaseComponent(ToolTagViewer)
};

export function RenderComponent({ component }: { component: FormComponent }) {
    const Component = COMPONENT_MAP[component.type] as React.ComponentType<{
        component: typeof component;
    }>;

    return Component ? <Component component={component} /> : null;
}
