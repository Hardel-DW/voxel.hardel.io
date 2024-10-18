import type React from "react";
import { useStudioContext } from "./StudioContext";
import { generatePath } from "./utils";

const Links: React.FC = () => {
    const { visualLinks, zoom, position, blueprints } = useStudioContext();

    const getFieldPosition = (blueprintId: string, fieldId: string, isOutput: boolean) => {
        const blueprint = blueprints.find((bp) => bp.id === blueprintId);
        if (!blueprint) return { x: 0, y: 0 };

        const fieldIndex = blueprint.fields.findIndex((f) => f.id === fieldId);
        if (fieldIndex === -1) return { x: 0, y: 0 };

        const blueprintX = blueprint.x * zoom + position.x;
        const blueprintY = blueprint.y * zoom + position.y;
        const fieldY = blueprintY + (50 + fieldIndex * 30) * zoom; // 50px pour le titre, 30px par champ

        if (isOutput) {
            return { x: blueprintX + 200 * zoom, y: fieldY + 10 * zoom }; // 200px largeur du blueprint, 10px pour centrer sur le rond
        }
        
        return { x: blueprintX, y: fieldY + 10 * zoom }; // 10 px pour centrer sur le rond
    };

    return (
        <svg role="presentation" className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1000 }}>
            {visualLinks.map((link, index) => {
                const startPos = getFieldPosition(link.sourceId, link.sourceFieldId, true);
                const endPos = getFieldPosition(link.targetId, link.targetFieldId, false);

                return (
                    <path
                        key={index.toString()}
                        d={generatePath(startPos.x, startPos.y, endPos.x, endPos.y)}
                        className="fill-none stroke-[#66c0f4]"
                        strokeWidth={2}
                        strokeLinecap="round"
                    />
                );
            })}
        </svg>
    );
};

export default Links;
