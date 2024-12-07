import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import { cn } from "@/lib/utils.ts";
import type React from "react";
import { useCallback } from "react";
import type { BaseBlueprintField } from "./Field";

export interface ConnectorFieldType extends BaseBlueprintField {
    type: "input" | "output";
}

export default function ConnectorField(props: {
    field: ConnectorFieldType;
    blueprintId: string;
}) {
    const { startLinking, finishLinking, isLinking } = useStudioContext();

    const handleConnectorMouseDown = (e: React.MouseEvent, fieldId: string) => {
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        startLinking(props.blueprintId, fieldId, startX, startY);
    };

    const handleConnectorMouseUp = useCallback(
        (fieldId: string) => {
            if (isLinking) finishLinking(props.blueprintId, fieldId);
        },
        [isLinking, finishLinking, props.blueprintId]
    );

    return (
        <div
            className={cn("flex items-center gap-2", {
                "justify-start": props.field.type === "input",
                "justify-end flex-row-reverse": props.field.type === "output"
            })}>
            <div
                className="w-3 h-3 select-none rounded-full cursor-pointer"
                onMouseDown={(e) => handleConnectorMouseDown(e, props.field.id)}
                onMouseUp={() => handleConnectorMouseUp(props.field.id)}>
                <img draggable="false" src="/icons/tools/studio/connector.svg" alt="connector" />
            </div>
            <span>{props.field.name}</span>
        </div>
    );
}
