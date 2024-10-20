import type { BlueprintFieldType } from "@/components/pages/tools/studio/fields/Field.tsx";
import FieldManager from "@/components/pages/tools/studio/fields/FieldManager.tsx";
import type { Position } from "@/components/pages/tools/studio/types";
import type React from "react";
import { forwardRef } from "react";

interface BlueprintProps {
    id: string;
    x: number;
    y: number;
    zoom: number;
    position: Position;
    title: string;
    fields: BlueprintFieldType[];
    onDragStart: (offsetX: number, offsetY: number) => void;
}

const Blueprint = forwardRef<HTMLDivElement, BlueprintProps>((props, ref) => {
    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left) / props.zoom;
        const offsetY = (e.clientY - rect.top) / props.zoom;
        props.onDragStart(offsetX, offsetY);
    };

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
            <FieldManager fields={props.fields} blueprintId={props.id} />
        </div>
    );
});

Blueprint.displayName = "Blueprint";
export default Blueprint;
