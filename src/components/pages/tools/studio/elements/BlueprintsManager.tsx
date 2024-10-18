import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import Blueprint from "@/components/pages/tools/studio/elements/Blueprint.tsx";

export default function BlueprintsManager() {
    const { blueprints, zoom, position, setDraggingBlueprintId, setBlueprintOffset } = useStudioContext();

    return (
        <>
            {blueprints.map((blueprint) => (
                <Blueprint
                    key={blueprint.id}
                    id={blueprint.id}
                    x={blueprint.x}
                    y={blueprint.y}
                    zoom={zoom}
                    position={position}
                    title={blueprint.title}
                    fields={blueprint.fields}
                    onDragStart={(offsetX: number, offsetY: number) => {
                        setDraggingBlueprintId(blueprint.id);
                        setBlueprintOffset({ x: offsetX, y: offsetY });
                    }}
                />
            ))}
        </>
    );
}
