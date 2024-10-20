import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import Blueprint from "@/components/pages/tools/studio/elements/Blueprint.tsx";
import type { BlueprintObject } from "@/components/pages/tools/studio/types";

export default function BlueprintsManager() {
    const { gridObjects, setDraggingObjectId, setObjectOffset } = useStudioContext();
    const blueprints = gridObjects.filter((obj): obj is BlueprintObject => obj.type === "blueprint");

    return (
        <>
            {blueprints.map((blueprint) => (
                <Blueprint
                    key={blueprint.id}
                    id={blueprint.id}
                    x={blueprint.position.x}
                    y={blueprint.position.y}
                    title={blueprint.title}
                    fields={blueprint.fields}
                    ref={blueprint.ref}
                    onDragStart={(offsetX: number, offsetY: number) => {
                        setDraggingObjectId(blueprint.id);
                        setObjectOffset({ x: offsetX, y: offsetY });
                    }}
                />
            ))}
        </>
    );
}
