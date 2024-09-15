import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import ToolSlot from "@/lib/minecraft/components/elements/ToolSlot.tsx";
import { Identifier } from "@/lib/minecraft/core/Identifier.ts";
import type { Analysers, GetAnalyserVoxel } from "@/lib/minecraft/core/engine/Analyser.ts";
import type { ValueParams } from "@/lib/minecraft/core/engine/value";
import { useMemo } from "react";
import { type Action, handleChange } from "src/lib/minecraft/core/engine/actions";

type Props = {
    action: Action;
    field: string;
    includes: string[];
};

export type ToolCollectionType = {
    type: "Collection";
    field: string;
    includes: string[];
    value: ValueParams<string[]>;
    action: Action;
};

export default function ToolCollection<T extends keyof Analysers>(props: Props) {
    const context = useConfigurator<GetAnalyserVoxel<T>>();
    if (!context.currentElement) return null;
    const data = context.currentElement.data[props.field as keyof GetAnalyserVoxel<T>] as SingleOrMultiple<string> | undefined;

    const items: Identifier[] = useMemo(() => {
        const alreadyFound: string[] = props.includes;

        for (const element of context.elements) {
            if (props.field in element.data) {
                const field = element.data[props.field as keyof GetAnalyserVoxel<T>] as SingleOrMultiple<string> | undefined;
                if (typeof field === "string") {
                    if (alreadyFound.includes(field)) continue;
                    alreadyFound.push(field);
                }
            }
        }

        return Identifier.sortIdentifier(alreadyFound.map((id) => Identifier.fromString(id, "enchantment")));
    }, [context.elements, props.field, props.includes]);

    return (
        <>
            {items.map((element) => {
                return (
                    <div key={element.toString()}>
                        <ToolSlot
                            title={element.renderResourceName()}
                            image="/images/features/item/enchanted_book.webp"
                            checked={typeof data === "string" && data === element.toString()}
                            onChange={() => handleChange(props.action, element.toString(), context)}
                            description={element.renderNamespace()}
                            value={element.toString()}
                        />
                    </div>
                );
            })}
        </>
    );
}
