import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import TemporaryLink from "@/components/pages/tools/studio/elements/TemporaryLink.tsx";

export default function TemporaryLinkManager() {
    const { temporaryLink, zoom, position } = useStudioContext();
    if (!temporaryLink) return null;

    return (
        <svg role="presentation" className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1001 }}>
            <TemporaryLink link={temporaryLink} zoom={zoom} position={position} />
        </svg>
    );
}