import { generatePath } from "@/components/pages/tools/studio/utils.ts";

export default function TemporaryLink({ link, zoom, position }: {
    link: {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    };
    zoom: number;
    position: { x: number; y: number };
}){
    const startX = link.startX * zoom + position.x;
    const startY = link.startY * zoom + position.y;
    const endX = link.endX * zoom + position.x;
    const endY = link.endY * zoom + position.y;

    return <path d={generatePath(startX, startY, endX, endY)} stroke="#66c0f4" strokeWidth={2} fill="none" strokeLinecap="round" />;
}