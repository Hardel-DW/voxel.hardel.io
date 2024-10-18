import type React from "react";
import { useRef } from "react";
import { useStudioContext } from "./StudioContext";

interface BlueprintField {
    id: string;
    name: string;
    value: string | number | null;
    type: "input" | "output" | "number";
}

interface BlueprintProps {
    id: string;
    x: number;
    y: number;
    zoom: number;
    position: { x: number; y: number };
    title: string;
    fields: BlueprintField[];
    onDragStart: (offsetX: number, offsetY: number) => void;
}

export const Blueprint: React.FC<BlueprintProps> = ({ id, x, y, zoom, position, title, fields, onDragStart }) => {
    const { startLinking, finishLinking, isLinking, setTemporaryLink, updateFieldValue } = useStudioContext();
    const blueprintRef = useRef<HTMLDivElement>(null);

    const style: React.CSSProperties = {
        position: 'absolute',
        left: `${x * zoom + position.x}px`,
        top: `${y * zoom + position.y}px`,
        transform: `scale(${zoom})`,
        transformOrigin: 'top left',
        width: '200px',  // Fixed width
        minHeight: '150px',  // Minimum height
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left) / zoom;
        const offsetY = (e.clientY - rect.top) / zoom;
        onDragStart(offsetX, offsetY);
    };

    const handleConnectorMouseDown = (e: React.MouseEvent, fieldId: string) => {
        e.stopPropagation();
        const rect = blueprintRef.current?.getBoundingClientRect();
        if (!rect) return;

        const startX = x + (e.clientX - rect.left) / zoom;
        const startY = y + (e.clientY - rect.top) / zoom;
        setTemporaryLink({ startX, startY, endX: startX, endY: startY });
        startLinking(id, fieldId);
    };

    const handleConnectorMouseUp = (fieldId: string) => {
        if (isLinking) {
            finishLinking(id, fieldId);
        }
        setTemporaryLink(null);
    };

    return (
        <div 
            ref={blueprintRef} 
            className="select-none bg-opacity-90 bg-gray-900 border border-gray-700 rounded-lg shadow-md overflow-visible font-sans text-gray-200 text-sm"
            style={style}
            onMouseDown={handleMouseDown}
        >
            <div className="bg-gray-800 p-3 font-bold cursor-move relative overflow-hidden">
                <div className="relative z-10 text-base">
                    {title}
                </div>
                <div className="absolute inset-0 -left-1/2 w-full h-full bg-radial-gradient from-black via-black to-transparent rounded-full filter blur-2xl pointer-events-none" />
            </div>
            <div className="p-3">
                {fields.map((field) => (
                    <div
                        key={field.id}
                        className={`flex items-center mb-1 ${field.type === "output" ? "justify-end" : "justify-start"}`}
                    >
                        {field.type !== "output" && (
                            <div className="flex items-center">
                                <div
                                    className={`w-3 h-3 rounded-full mr-2 cursor-pointer ${field.type === "input" ? "bg-blue-400" : "bg-green-400"}`}
                                    onMouseDown={(e) => handleConnectorMouseDown(e, field.id)}
                                    onMouseUp={() => handleConnectorMouseUp(field.id)}
                                />
                                <span>{field.name}</span>
                            </div>
                        )}
                        {field.type === "number" && (
                            <input
                                type="number"
                                value={field.value as number}
                                onChange={(e) => updateFieldValue(id, field.id, +e.target.value)}
                                className="w-16 text-sm p-1 bg-gray-700 bg-opacity-60 border-none rounded text-blue-400 text-right"
                            />
                        )}
                        {field.type === "output" && (
                            <div className="flex items-center">
                                <span>{field.name}</span>
                                <div
                                    className="w-3 h-3 rounded-full ml-2 bg-red-400 cursor-pointer"
                                    onMouseDown={(e) => handleConnectorMouseDown(e, field.id)}
                                    onMouseUp={() => handleConnectorMouseUp(field.id)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
