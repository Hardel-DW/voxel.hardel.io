import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import Blueprint from "@/components/pages/tools/studio/elements/Blueprint.tsx";
import type { BlueprintObject } from "@/components/pages/tools/studio/types";

export default function BlueprintsManager(props: {
    zoom: number;
    setDraggingObjectId: (id: string | null) => void;
    setObjectOffset: (offset: { x: number; y: number }) => void;
}) {
    const { gridObjects } = useStudioContext();
    const blueprints = gridObjects.filter((obj): obj is BlueprintObject => obj.type === "blueprint");

    return (
        <>
            {blueprints.map((blueprint) => (
                <Blueprint
                    key={blueprint.id}
                    id={blueprint.id}
                    zoom={props.zoom}
                    x={blueprint.position.x}
                    y={blueprint.position.y}
                    title={blueprint.title}
                    fields={blueprint.fields}
                    ref={blueprint.ref}
                    onDragStart={(offsetX: number, offsetY: number) => {
                        props.setDraggingObjectId(blueprint.id);
                        props.setObjectOffset({ x: offsetX, y: offsetY });
                    }}
                />
            ))}
        </>
    );
}
