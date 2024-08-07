import type { TriangleType } from "@/components/ui/object/Triangle.tsx";

export const createTriangle = (centerX: number, centerY: number, maxDistance: number, centralRadius: number): TriangleType => {
    const angle = Math.random() * Math.PI * 2;
    const distance = maxDistance * (1.1 + Math.random() * 0.9);
    const targetAngle = Math.random() * Math.PI * 2;
    const targetDistance = centralRadius * Math.random();
    return {
        angle,
        distance,
        color: `hsl(${Math.random() * 360}, 70%, 90%)`,
        rotationPhase: Math.random() * Math.PI * 0.1,
        spiralFactor: 0.1 + Math.random() * 0.2,
        speed: 0.05 + Math.random() * 0.015,
        size: 1,
        isFilled: Math.random() < 0.5,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        initialVelocityX: 1 + Math.random() * 2,
        initialVelocityY: 1 + Math.random() * 2,
        targetX: centerX + Math.cos(targetAngle) * targetDistance,
        targetY: centerY + Math.sin(targetAngle) * targetDistance
    };
};
