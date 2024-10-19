import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import Link from "@/components/pages/tools/studio/elements/Link.tsx";
import type { LinkObject } from "@/components/pages/tools/studio/types.ts";
import { getFieldPosition } from "@/components/pages/tools/studio/utils.ts";
import type React from "react";

export default function LinkManager(): React.ReactElement {
    const { gridObjects, zoom, position } = useStudioContext();
    const links = gridObjects.filter((obj): obj is LinkObject => obj.type === "link");

    return (
        <svg 
            role="presentation" 
            className="absolute top-0 left-0 w-full h-full pointer-events-none" 
            style={{ zIndex: 1000 }}
        >
            {links.map((link) => {
                const startPos = getFieldPosition(gridObjects, link.sourceId, link.sourceFieldId, zoom, position);
                const endPos = getFieldPosition(gridObjects, link.targetId, link.targetFieldId, zoom, position);

                return <Link 
                    key={link.id} 
                    startX={startPos.x * zoom + position.x} 
                    startY={startPos.y * zoom + position.y} 
                    endX={endPos.x * zoom + position.x} 
                    endY={endPos.y * zoom + position.y} 
                />;
            })}
        </svg>
    );
}
