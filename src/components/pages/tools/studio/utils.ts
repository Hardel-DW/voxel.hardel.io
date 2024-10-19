import type { AnyGridObject, BlueprintObject, Position } from "@/components/pages/tools/studio/types";

export const generatePath = (startX: number, startY: number, endX: number, endY: number) => {
    const controlPointOffset = Math.abs(endX - startX) * 0.5;

    const controlPoint1X = startX + controlPointOffset;
    const controlPoint1Y = startY;
    const controlPoint2X = endX - controlPointOffset;

    return `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${endY}, ${endX} ${endY}`;
};

export function getFieldPosition(
    gridObjects: AnyGridObject[],
    blueprintId: string,
    fieldId: string,
    zoom: number,
    canvasPosition: Position
): Position {
    console.log("Hello");
    const blueprint = gridObjects.find((obj): obj is BlueprintObject => obj.type === "blueprint" && obj.id === blueprintId);
    if (!blueprint || !blueprint.ref.current) return { x: 0, y: 0 };

    const field = blueprint.fields.find((f) => f.id === fieldId);
    if (!field) return { x: 0, y: 0 };

    const blueprintRect = blueprint.ref.current.getBoundingClientRect();
    const fieldIndex = blueprint.fields.findIndex((f) => f.id === fieldId);
    const isOutput = field.type === "output";

    const blueprintX = (blueprintRect.left - canvasPosition.x) / zoom;
    const blueprintY = (blueprintRect.top - canvasPosition.y) / zoom;
    const blueprintWidth = blueprintRect.width / zoom;

    const x = blueprintX + (isOutput ? blueprintWidth - 22 : 22);
    const y = blueprintY + 64 + fieldIndex * 40 + 20;

    return { x, y };
}
