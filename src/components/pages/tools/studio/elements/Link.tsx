import { generatePath } from "@/components/pages/tools/studio/utils.ts";

interface LinkProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export default function Link({ startX, startY, endX, endY }: LinkProps) {
    return <path d={generatePath(startX, startY, endX, endY)} className="fill-none stroke-[#aaa]" strokeWidth={2} strokeLinecap="round" />;
}
