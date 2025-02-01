import { RenderComponent } from "@/components/tools/RenderComponent";
import type { ToolRevealType } from "@/lib/minecraft/core/schema/primitive/component";
import React from "react";
import ToolRevealElement from "./ToolRevealElementType";

export default function ToolReveal({ component }: { component: ToolRevealType }) {
    const [reveal, setReveal] = React.useState<string>(component.elements[0].id);
    const currentElement = component.elements.find((element) => element.id === reveal);

    return (
        <div className="grid gap-4">
            <div className="grid max-xl:grid-cols-1 gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(225px, 1fr))" }}>
                {component.elements.map((element) => (
                    <ToolRevealElement
                        key={element.id}
                        element={element}
                        isSelected={currentElement?.id === element.id}
                        onSelect={() => setReveal(element.id)}
                    />
                ))}
            </div>

            <div className="h-1 my-4 rounded-full w-full bg-zinc-900" />

            {currentElement?.children.map((child, index) => (
                <RenderComponent key={index.toString()} component={child} />
            ))}
        </div>
    );
}
