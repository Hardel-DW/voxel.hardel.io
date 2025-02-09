// TriangleWave.tsx

import { animate } from "@/lib/triangle/AnimationTriangle.ts";
import { setupCanvas } from "@/lib/triangle/CanvasSetup.ts";
import { createTriangle } from "@/lib/triangle/TriangleUtils.ts";
import type React from "react";
import { useEffect, useRef } from "react";

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

const Triangle: React.FC<TriangleWaveProps> = ({ triangleCount, spiralSpeed }) => {
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

        return () => {
            cleanup();
        };
    }, [triangleCount, spiralSpeed]);

    return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
};

export default Triangle;
