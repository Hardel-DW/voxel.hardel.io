import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import Blueprint from "@/components/pages/tools/studio/elements/Blueprint.tsx";
import type { Blueprint as BlueprintType } from "@/components/pages/tools/studio/types";

export default function BlueprintsManager() {
    const { gridObjects, zoom, position, setDraggingObjectId, setObjectOffset } = useStudioContext();
    const blueprints = gridObjects.filter((obj): obj is BlueprintType => obj.type === "blueprint");

    return (
        <>
            {blueprints.map((blueprint) => (
                <Blueprint
                    key={blueprint.id}
                    id={blueprint.id}
                    x={blueprint.position.x}
                    y={blueprint.position.y}
                    zoom={zoom}
                    position={position}
                    title={blueprint.title}
                    fields={blueprint.fields}
                    onDragStart={(offsetX: number, offsetY: number) => {
                        setDraggingObjectId(blueprint.id);
                        setObjectOffset({ x: offsetX, y: offsetY });
                    }}
                />
            ))}
        </>
    );
}
