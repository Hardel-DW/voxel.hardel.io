import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import { generatePath } from "@/components/pages/tools/studio/utils.ts";
import type { Link, Blueprint } from "@/components/pages/tools/studio/types";
import type React from "react";

export default function Links(): React.ReactElement {
    const { gridObjects, zoom, position } = useStudioContext();
    const links = gridObjects.filter((obj): obj is Link => obj.type === "link");

    const getFieldPosition = (blueprintId: string, fieldId: string, isOutput: boolean) => {
        const blueprint = gridObjects.find((obj): obj is Blueprint => obj.type === "blueprint" && obj.id === blueprintId);
        if (!blueprint) return { x: 0, y: 0 };

        const fieldIndex = blueprint.fields.findIndex((f) => f.id === fieldId);
        if (fieldIndex === -1) return { x: 0, y: 0 };

        const blueprintX = blueprint.position.x * zoom + position.x;
        const blueprintY = blueprint.position.y * zoom + position.y;
        const fieldY = blueprintY + (50 + fieldIndex * 30) * zoom;

        if (isOutput) {
            return { x: blueprintX + 200 * zoom, y: fieldY + 10 * zoom };
        }

        return { x: blueprintX, y: fieldY + 10 * zoom };
    };

    return (
        <svg role="presentation" className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1000 }}>
            {links.map((link) => {
                const startPos = getFieldPosition(link.sourceId, link.sourceFieldId, true);
                const endPos = getFieldPosition(link.targetId, link.targetFieldId, false);

                return (
                    <path
                        key={link.id}
                        d={generatePath(startPos.x, startPos.y, endPos.x, endPos.y)}
                        className="fill-none stroke-[#66c0f4]"
                        strokeWidth={2}
                        strokeLinecap="round"
                    />
                );
            })}
        </svg>
    );
}
