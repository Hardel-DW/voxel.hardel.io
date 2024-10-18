import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Blueprint } from "./Blueprint";
import { useStudioContext } from "./StudioContext";
import Links from "./Links";

export default function Studio() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [draggingBlueprintId, setDraggingBlueprintId] = useState<string | null>(null);
    const startDragPosition = useRef({ x: 0, y: 0 });
    const startPosition = useRef({ x: 0, y: 0 });
    const blueprintOffset = useRef({ x: 0, y: 0 });
    const { 
        setCursorPosition, 
        position, 
        setPosition, 
        zoom, 
        setZoom, 
        blueprints, 
        setBlueprints, 
        temporaryLink, 
        setTemporaryLink 
    } = useStudioContext();

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === canvasRef.current) {
            setIsDragging(true);
            startDragPosition.current = {
                x: event.clientX,
                y: event.clientY
            };
            startPosition.current = { ...position };
        }
        event.preventDefault();
    };

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (isDragging) {
                const dx = event.clientX - startDragPosition.current.x;
                const dy = event.clientY - startDragPosition.current.y;
                setPosition({
                    x: startPosition.current.x + dx,
                    y: startPosition.current.y + dy
                });
            } else if (draggingBlueprintId !== null && canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const x = (event.clientX - rect.left - position.x) / zoom;
                const y = (event.clientY - rect.top - position.y) / zoom;
                setBlueprints(prev => prev.map(bp => 
                    bp.id === draggingBlueprintId ? { 
                        ...bp, 
                        x: x - blueprintOffset.current.x, 
                        y: y - blueprintOffset.current.y 
                    } : bp
                ));
            }

            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const xOnCanvas = (event.clientX - rect.left - position.x) / zoom;
                const yOnCanvas = (event.clientY - rect.top - position.y) / zoom;
                setCursorPosition({ x: xOnCanvas, y: yOnCanvas });

                if (temporaryLink) {
                    setTemporaryLink(prev => prev ? { 
                        ...prev, 
                        endX: xOnCanvas, 
                        endY: yOnCanvas 
                    } : null);
                }
            }
        },
        [isDragging, draggingBlueprintId, position, zoom, setCursorPosition, setPosition, setBlueprints, temporaryLink, setTemporaryLink]
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setDraggingBlueprintId(null);
    }, []);

    const handleWheel = useCallback(
        (event: WheelEvent) => {
            if (canvasRef.current) {
                event.preventDefault();
                const scale = 0.001;
                const rect = canvasRef.current.getBoundingClientRect();
                const cursorX = event.clientX - rect.left;
                const cursorY = event.clientY - rect.top;

                const delta = event.deltaY * -scale;
                const newZoom = Math.exp(Math.log(zoom) + delta);
                const clampedZoom = Math.min(Math.max(newZoom, 0.1), 5);

                const scaleFactor = clampedZoom / zoom;

                const newX = cursorX - (cursorX - position.x) * scaleFactor;
                const newY = cursorY - (cursorY - position.y) * scaleFactor;

                setZoom(clampedZoom);
                setPosition({ x: newX, y: newY });
            }
        },
        [zoom, position, setPosition, setZoom]
    );

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("wheel", handleWheel);
        };
    }, [handleMouseMove, handleMouseUp, handleWheel]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div
                ref={canvasRef}
                className={`absolute w-[10000px] h-[10000px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                    backgroundSize: `${50 * zoom}px ${50 * zoom}px`,
                    backgroundImage:
                        "linear-gradient(to right, #272727 1px, transparent 1px), linear-gradient(to bottom, #272727 1px, transparent 1px)",
                    backgroundPosition: `${position.x}px ${position.y}px`,
                }}
                onMouseDown={handleMouseDown}
            >
                {blueprints.map((blueprint) => (
                    <Blueprint
                        key={blueprint.id}
                        id={blueprint.id}
                        x={blueprint.x}
                        y={blueprint.y}
                        zoom={zoom}
                        position={position}
                        title={blueprint.title}
                        fields={blueprint.fields}
                        onDragStart={(offsetX, offsetY) => {
                            setDraggingBlueprintId(blueprint.id);
                            blueprintOffset.current = { x: offsetX, y: offsetY };
                        }}
                    />
                ))}
                <Links />
                {temporaryLink && (
                    <svg
                        role="presentation"
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={{ zIndex: 1001 }}
                    >
                        <line
                            x1={temporaryLink.startX * zoom + position.x}
                            y1={temporaryLink.startY * zoom + position.y}
                            x2={temporaryLink.endX * zoom + position.x}
                            y2={temporaryLink.endY * zoom + position.y}
                            stroke="#66c0f4"
                            strokeWidth={2 / zoom}
                        />
                    </svg>
                )}
            </div>
        </div>
    );
}
