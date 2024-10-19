import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import type { BlueprintFieldType } from "@/components/pages/tools/studio/fields/Field.tsx";
import FieldManager from "@/components/pages/tools/studio/fields/FieldManager.tsx";
import type { BlueprintObject } from "@/components/pages/tools/studio/types.ts";
import type React from "react";
import { forwardRef, useCallback, useEffect } from "react";

interface BlueprintProps {
    id: string;
    x: number;
    y: number;
    zoom: number;
    position: { x: number; y: number };
    title: string;
    fields: BlueprintFieldType[];
    onDragStart: (offsetX: number, offsetY: number) => void;
}

const Blueprint = forwardRef<HTMLDivElement, BlueprintProps>((props, ref) => {
    const { startLinking, finishLinking, isLinking, updateGridObject, updateTemporaryLink } = useStudioContext();

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left) / props.zoom;
        const offsetY = (e.clientY - rect.top) / props.zoom;
        props.onDragStart(offsetX, offsetY);
    };

    const handleConnectorMouseDown = (e: React.MouseEvent, fieldId: string) => {
        e.stopPropagation();
        if (ref && "current" in ref && ref.current) {
            const startX = e.clientX;
            const startY = e.clientY;
            startLinking(props.id, fieldId, startX, startY);
        }
    };

    const handleConnectorMouseUp = useCallback(
        (fieldId: string) => {
            if (isLinking) {
                finishLinking(props.id, fieldId);
            }
        },
        [isLinking, finishLinking, props.id]
    );

    const handleFieldValueChange = (fieldId: string, newValue: string | number) => {
        updateGridObject(props.id, {
            fields: props.fields.map((field) => {
                if (field.id !== fieldId) return field;

                const updatedValue = field.type === "number" ? Number(newValue) : String(newValue);
                return { ...field, value: updatedValue };
            })
        } as Partial<BlueprintObject>);
    };

    const handleConnectorMouseMove = useCallback(
        (e: MouseEvent) => {
            if (isLinking) {
                updateTemporaryLink({ x: e.clientX, y: e.clientY });
            }
        },
        [isLinking, updateTemporaryLink]
    );

    useEffect(() => {
        window.addEventListener("mousemove", handleConnectorMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleConnectorMouseMove);
        };
    }, [handleConnectorMouseMove]);

    return (
        <div
            ref={ref}
            className="absolute origin-top-left min-w-64 min-h-48 text select-none bg-opacity-90 bg-zinc-900 rounded-2xl shadow-md overflow-visible font-sans text-gray-200"
            onMouseDown={handleMouseDown}
            style={{
                left: `${props.x * props.zoom + props.position.x}px`,
                top: `${props.y * props.zoom + props.position.y}px`,
                transform: `scale(${props.zoom})`
            }}
        >
            <div className="bg-zinc-950 p-3 font-bold cursor-move relative overflow-hidden rounded-t-2xl">
                <div className="relative z-10 text-base">{props.title}</div>
                <div className="absolute inset-0 -left-1/2 size-full bg-gradient-to-tr from-pink-950 from-70% to-transparent rounded-full filter blur-2xl pointer-events-none" />
            </div>
            <FieldManager
                fields={props.fields}
                blueprintId={props.id}
                handleConnectorMouseDown={handleConnectorMouseDown}
                handleConnectorMouseUp={handleConnectorMouseUp}
                updateFieldValue={handleFieldValueChange}
            />
        </div>
    );
});

Blueprint.displayName = "Blueprint";
export default Blueprint;
