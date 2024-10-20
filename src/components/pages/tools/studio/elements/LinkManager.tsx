import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import Link from "@/components/pages/tools/studio/elements/Link.tsx";
import type { LinkObject } from "@/components/pages/tools/studio/types.ts";
import { getFieldPosition } from "@/components/pages/tools/studio/utils.ts";
import type React from "react";

export default function LinkManager(): React.ReactElement {
    const { gridObjects } = useStudioContext();
    const links = gridObjects.filter((obj): obj is LinkObject => obj.type === "link");

    return (
        <svg 
            role="presentation" 
            className="absolute origin-top-left overflow-visible pointer-events-none" 
            style={{ zIndex: 1000 }}
        >
            {links.map((link) => {
                const startPos = getFieldPosition(gridObjects, link.sourceId, link.sourceFieldId);
                const endPos = getFieldPosition(gridObjects, link.targetId, link.targetFieldId);

                return <Link 
                    key={link.id} 
                    startX={startPos.x} 
                    startY={startPos.y} 
                    endX={endPos.x} 
                    endY={endPos.y} 
                />;
            })}
        </svg>
    );
}
