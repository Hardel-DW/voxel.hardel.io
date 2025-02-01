import Link from "@/components/pages/tools/studio/elements/Link.tsx";
import { useStudioContext } from "@/components/pages/tools/studio/hooks/useStudioContext";
import type { TemporaryLinkObject } from "@/components/pages/tools/studio/types";
import { getFieldPosition } from "@/components/pages/tools/studio/utils.ts";

export default function TemporaryLinkManager() {
    const { gridObjects } = useStudioContext();
    const temporaryLinks = gridObjects.filter((obj): obj is TemporaryLinkObject => obj.type === "tmp_link");

    if (temporaryLinks.length === 0) return null;

    return (
        <svg role="presentation" className="absolute origin-top-left overflow-visible pointer-events-none" style={{ zIndex: 1001 }}>
            {temporaryLinks.map((link) => {
                const startPos = getFieldPosition(gridObjects, link.sourceId, link.sourceFieldId);
                return <Link key={link.id} startX={startPos.x} startY={startPos.y} endX={link.endPosition.x} endY={link.endPosition.y} />;
            })}
        </svg>
    );
}
