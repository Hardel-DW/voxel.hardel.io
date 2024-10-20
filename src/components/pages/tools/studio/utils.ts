import type { AnyGridObject, BlueprintObject, Position } from "@/components/pages/tools/studio/types";

export const generatePath = (startX: number, startY: number, endX: number, endY: number) => {
    const controlPointOffset = Math.abs(endX - startX) * 0.5;

    const controlPoint1X = startX + controlPointOffset;
    const controlPoint1Y = startY;
    const controlPoint2X = endX - controlPointOffset;

    return `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${endY}, ${endX} ${endY}`;
};

export function getFieldPosition(gridObjects: AnyGridObject[], blueprintId: string, fieldId: string): Position {
    const blueprint = gridObjects.find((obj): obj is BlueprintObject => obj.type === "blueprint" && obj.id === blueprintId);
    if (!blueprint || !blueprint.ref.current) return { x: 0, y: 0 };

    const field = blueprint.fields.find((f) => f.id === fieldId);
    if (!field) return { x: 0, y: 0 };

    const blueprintRect = blueprint.ref.current.getBoundingClientRect();
    console.log("Blueprint rect", blueprintRect.width, blueprintRect.height);
    const fieldIndex = blueprint.fields.findIndex((f) => f.id === fieldId);
    const isOutput = field.type === "output";

    const x = blueprint.position.x + (isOutput ? blueprintRect.width - 22 : 22);
    const y = blueprint.position.y + 64 + fieldIndex * 40 + 20;

    return { x, y };
}

export function cleanForJSON(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(cleanForJSON);
    }

    if (obj && typeof obj === "object") {
        const cleaned: any = {};
        for (const [key, value] of Object.entries(obj)) {
            if (key !== "ref" && value !== undefined) {
                cleaned[key] = cleanForJSON(value);
            }
        }
        return cleaned;
    }
    return obj;
}
