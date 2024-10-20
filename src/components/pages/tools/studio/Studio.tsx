import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import BlueprintsManager from "@/components/pages/tools/studio/elements/BlueprintsManager.tsx";
import LinkManager from "@/components/pages/tools/studio/elements/LinkManager.tsx";
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
        position,
        setPosition,
        zoom,
        setZoom,
        updateGridObject,
        draggingObjectId,
        setDraggingObjectId,
        objectOffset,
        isLinking,
        cancelLinking,
        updateTemporaryLink
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
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                updateGridObject(draggingObjectId, {
                    position: {
                        x: (x - position.x) / zoom - objectOffset.x,
                        y: (y - position.y) / zoom - objectOffset.y
                    }
                });
            }

            if (isLinking) {
                updateTemporaryLink({ x: event.clientX, y: event.clientY });
            }
        },
        [isDragging, draggingObjectId, position, zoom, isLinking, setPosition, updateGridObject, updateTemporaryLink, objectOffset]
    );

    const handleMouseUp = useCallback(
        (event: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
            setIsDragging(false);
            setDraggingObjectId(null);
            if (isLinking && (event.target as Node).isEqualNode(canvasRef.current)) {
                cancelLinking();
            }
        },
        [setDraggingObjectId, isLinking, cancelLinking]
    );

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
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
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

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
                onWheel={handleWheel}
            >
                <div
                    style={{
                        position: "absolute",
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        transform: `scale(${zoom})`,
                        transformOrigin: "top left"
                    }}
                >
                    <BlueprintsManager />
                    <LinkManager />
                    <TemporaryLinkManager />
                </div>
            </div>
        </div>
    );
}
