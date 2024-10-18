import React from "react";
import { useStudioContext } from "./StudioContext";
import { Blueprint } from "./Blueprint";

const BlueprintsManager: React.FC = () => {
    const { blueprints, zoom, position, setDraggingBlueprintId } = useStudioContext();

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
                    onDragStart={(offsetX, offsetY) => {
                        setDraggingBlueprintId(blueprint.id);
                        // Note: blueprintOffset.current doit être géré dans le contexte ou dans le composant parent
                    }}
                />
            ))}
        </>
    );
};

export default BlueprintsManager;
