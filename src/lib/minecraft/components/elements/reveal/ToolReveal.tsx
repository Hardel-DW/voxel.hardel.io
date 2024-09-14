import { RenderComponent } from "@/lib/minecraft/components/RenderComponent.tsx";
import ToolRevealElement, { type ToolRevealElementType } from "@/lib/minecraft/components/elements/reveal/ToolRevealElementType.tsx";
import React from "react";

export type ToolRevealType = {
    type: "Reveal";
    elements: ToolRevealElementType[];
};

export default function ToolReveal(props: {
    elements: ToolRevealElementType[];
}) {
    const [reveal, setReveal] = React.useState<string>(props.elements[0].id);
    const currentElement = props.elements.find((element) => element.id === reveal);

    return (
        <div className="grid gap-4">
            <div className="grid max-xl:grid-cols-1 gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(225px, 1fr))" }}>
                {props.elements.map((element) => (
                    <ToolRevealElement
                        onClick={() => setReveal(element.id)}
                        key={element.id}
                        isSelect={currentElement?.id === element.id}
                        soon={element.soon}
                        title={element.title}
                        href={element.href}
                        logo={element.logo}
                        image={element.image}
                        description={element.description}
                    />
                ))}
            </div>

            <div className="h-1 my-4 rounded-full w-full bg-zinc-900" />

            {currentElement?.children.map((element, index) => (
                <RenderComponent key={index.toString()} component={element} />
            ))}
        </div>
    );
}
