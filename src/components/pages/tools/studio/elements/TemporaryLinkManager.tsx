import React from "react";
import { useStudioContext } from "./StudioContext";
import TemporaryLink from "./TemporaryLink";

const TemporaryLinkManager: React.FC = () => {
    const { temporaryLink, zoom, position } = useStudioContext();

    if (!temporaryLink) return null;

    return (
        <svg
            role="presentation"
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1001 }}
        >
            <TemporaryLink link={temporaryLink} zoom={zoom} position={position} />
        </svg>
    );
};

export default TemporaryLinkManager;
