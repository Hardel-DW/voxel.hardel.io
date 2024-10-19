import { generatePath } from "@/components/pages/tools/studio/utils.ts";
import React from "react";

interface LinkProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export default function Link({ startX, startY, endX, endY }: LinkProps) {
    return (
        <path d={generatePath(startX, startY, endX, endY)} className="fill-none stroke-[#66c0f4]" strokeWidth={2} strokeLinecap="round" />
    );
}
