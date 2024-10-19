import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import BlueprintsManager from "@/components/pages/tools/studio/elements/BlueprintsManager.tsx";
import Links from "@/components/pages/tools/studio/elements/Links.tsx";
import TemporaryLinkManager from "@/components/pages/tools/studio/elements/TemporaryLinkManager.tsx";
import { cn } from "@/lib/utils.ts";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Studio() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const startDragPosition = useRef({ x: 0, y: 0 });
    const startPosition = useRef({ x: 0, y: 0 });
    const {
        setCursorPosition,
        position,
        setPosition,
        zoom,
        setZoom,
        updateGridObject,
        draggingObjectId,
        setDraggingObjectId,
        objectOffset,
        isLinking,
        cancelLinking
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
            } else if (draggingObjectId !== null && canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const x = (event.clientX - rect.left - position.x) / zoom;
                const y = (event.clientY - rect.top - position.y) / zoom;
                updateGridObject(draggingObjectId, {
                    position: {
                        x: x - objectOffset.x,
                        y: y - objectOffset.y
                    }
                });
            }

            if (canvasRef.current) {
                const rect = canvasRef.current.getBoundingClientRect();
                const xOnCanvas = (event.clientX - rect.left - position.x) / zoom;
                const yOnCanvas = (event.clientY - rect.top - position.y) / zoom;
                setCursorPosition({ x: xOnCanvas, y: yOnCanvas });
            }
        },
        [isDragging, draggingObjectId, position, zoom, setCursorPosition, setPosition, updateGridObject, objectOffset]
    );

    const handleMouseUp = useCallback((event: MouseEvent) => {
        setIsDragging(false);
        setDraggingObjectId(null);
        if (isLinking && event.target === canvasRef.current) {
            cancelLinking();
        }
    }, [setDraggingObjectId, isLinking, cancelLinking]);

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
                className={cn("absolute w-dvw h-dvh bg-grid", {
                    "cursor-grabbing": isDragging,
                    "cursor-grab": !isDragging
                })}
                style={{
                    backgroundSize: `${50 * zoom}px ${50 * zoom}px`,
                    backgroundPosition: `${position.x}px ${position.y}px`
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <BlueprintsManager />
                <Links />
                <TemporaryLinkManager />
            </div>
        </div>
    );
}
