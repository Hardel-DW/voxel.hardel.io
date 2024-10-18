import type React from "react";
import { generatePath } from "./utils";

interface TemporaryLinkProps {
    link: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    };
    zoom: number;
    position: { x: number; y: number };
}

const TemporaryLink: React.FC<TemporaryLinkProps> = ({ link, zoom, position }) => {
    const startX = link.startX * zoom + position.x;
    const startY = link.startY * zoom + position.y;
    const endX = link.endX * zoom + position.x;
    const endY = link.endY * zoom + position.y;

    return <path d={generatePath(startX, startY, endX, endY)} stroke="#66c0f4" strokeWidth={2} fill="none" strokeLinecap="round" />;
};

export default TemporaryLink;
