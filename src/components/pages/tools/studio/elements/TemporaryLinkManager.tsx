import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import TemporaryLink from "@/components/pages/tools/studio/elements/TemporaryLink.tsx";
import type { TemporaryLink as TemporaryLinkType } from "@/components/pages/tools/studio/types";

export default function TemporaryLinkManager() {
    const { gridObjects, zoom, position } = useStudioContext();
    const temporaryLinks = gridObjects.filter((obj): obj is TemporaryLinkType => obj.type === 'tmp_link');

    if (temporaryLinks.length === 0) return null;

    return (
        <svg role="presentation" className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1001 }}>
            {temporaryLinks.map((link) => (
                <TemporaryLink
                    key={link.id}
                    link={{
                        startX: link.position.x,
                        startY: link.position.y,
                        endX: link.endPosition.x,
                        endY: link.endPosition.y
                    }}
                    zoom={zoom}
                    position={position}
                />
            ))}
        </svg>
    );
}
