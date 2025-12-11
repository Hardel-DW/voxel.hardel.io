import { useEffect, useRef } from "react";
import { animate } from "@/components/ui/triangle/AnimationTriangle";
import { setupCanvas } from "@/components/ui/triangle/CanvasSetup";
import { createTriangle } from "@/components/ui/triangle/TriangleUtils";

export interface TriangleType {
    angle: number;
    distance: number;
    color: string;
    rotationPhase: number;
    spiralFactor: number;
    speed: number;
    size: number;
    isFilled: boolean;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    initialVelocityX: number;
    initialVelocityY: number;
    targetX: number;
    targetY: number;
}

interface TriangleWaveProps {
    triangleCount: number;
    spiralSpeed: number;
}

export default function Triangle({ triangleCount, spiralSpeed }: TriangleWaveProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const cleanup = setupCanvas(canvas);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxDistance = Math.sqrt(centerX ** 1.8 + centerY ** 1.8);
        const centralRadius = 50;

        const triangles: TriangleType[] = Array.from({ length: triangleCount }, () =>
            createTriangle(centerX, centerY, maxDistance, centralRadius)
        );

        animate(ctx, canvas, triangles, spiralSpeed, centerX, centerY, maxDistance, centralRadius);

        return () => cleanup();
    }, [triangleCount, spiralSpeed]);

    return <canvas ref={canvasRef} className="size-full overflow-hidden" />;
}
