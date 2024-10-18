import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import type { BlueprintFieldType } from "@/components/pages/tools/studio/fields/Field.tsx";
import FieldManager from "@/components/pages/tools/studio/fields/FieldManager.tsx";
import type React from "react";
import { useRef } from "react";

export default function Blueprint(props: {
    id: string;
    x: number;
    y: number;
    zoom: number;
    position: { x: number; y: number };
    title: string;
    fields: BlueprintFieldType[];
    onDragStart: (offsetX: number, offsetY: number) => void;
}) {
    const { startLinking, finishLinking, isLinking, setTemporaryLink, updateFieldValue } = useStudioContext();
    const blueprintRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left) / props.zoom;
        const offsetY = (e.clientY - rect.top) / props.zoom;
        props.onDragStart(offsetX, offsetY);
    };

    const handleConnectorMouseDown = (e: React.MouseEvent, fieldId: string) => {
        e.stopPropagation();
        const rect = blueprintRef.current?.getBoundingClientRect();
        if (!rect) return;

        const startX = props.x + (e.clientX - rect.left) / props.zoom;
        const startY = props.y + (e.clientY - rect.top) / props.zoom;
        setTemporaryLink({ startX, startY, endX: startX, endY: startY });
        startLinking(props.id, fieldId);
    };

    const handleConnectorMouseUp = (fieldId: string) => {
        if (isLinking) {
            finishLinking(props.id, fieldId);
        }
        setTemporaryLink(null);
    };

    return (
        <div
            ref={blueprintRef}
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
                updateFieldValue={updateFieldValue}
            />
        </div>
    );
}
