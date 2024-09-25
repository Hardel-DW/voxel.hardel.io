import type { TriangleType } from "@/components/ui/pattern/Triangle.tsx";
import { drawTriangle } from "@/lib/triangle/DrawUtils.ts";
import { createTriangle } from "@/lib/triangle/TriangleUtils.ts";

export const animate = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    triangles: TriangleType[],
    spiralSpeed: number,
    centerX: number,
    centerY: number,
    maxDistance: number,
    centralRadius: number
) => {
    const animateFrame = (time: number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const triangle of triangles) {
            triangle.angle += spiralSpeed * 0.01 * triangle.speed;
            triangle.distance -= spiralSpeed * 0.5 * triangle.spiralFactor;

            triangle.rotationX += 0.01;
            triangle.rotationY += 0.01;
            triangle.rotationZ += 0.01;

            const size = triangle.distance * 0.1;

            if (triangle.distance < 10 || size < 1) {
                Object.assign(triangle, createTriangle(centerX, centerY, maxDistance, centralRadius));
            }

            const x = triangle.targetX + Math.cos(triangle.angle) * triangle.distance + triangle.initialVelocityX * time * 0.001;
            const y = triangle.targetY + Math.sin(triangle.angle) * triangle.distance + triangle.initialVelocityY * time * 0.001;

            ctx.fillStyle = triangle.color;
            ctx.strokeStyle = triangle.color;
            drawTriangle(ctx, x, y, size, triangle.rotationX, triangle.rotationY, triangle.rotationZ, triangle.isFilled);
        }

        requestAnimationFrame(animateFrame);
    };

    animateFrame(0);
};
