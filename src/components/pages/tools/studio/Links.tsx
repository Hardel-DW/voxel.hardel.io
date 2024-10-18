import type React from "react";
import { useStudioContext } from "./StudioContext";

const Links: React.FC = () => {
    const { visualLinks, zoom } = useStudioContext();

    const generatePath = (startX: number, startY: number, endX: number, endY: number) => {
        const controlPointOffset = Math.abs(endX - startX) * 0.5;

        const controlPoint1X = startX + controlPointOffset;
        const controlPoint1Y = startY;
        const controlPoint2X = endX - controlPointOffset;
        const controlPoint2Y = endY;

        return `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`;
    };

    return (
        <svg
            role="presentation"
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1000 }}
        >
            {visualLinks.map((link, index) => (
                <path
                    key={index.toString()}
                    d={generatePath(link.startX, link.startY, link.endX, link.endY)}
                    className="fill-none stroke-[#66c0f4]"
                    strokeWidth={2 / zoom}
                    strokeLinecap="round"
                />
            ))}
        </svg>
    );
};

export default Links;
