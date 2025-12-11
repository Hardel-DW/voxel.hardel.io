import { useEffect, useRef } from "react";
import { animateLines, createLine, type Line } from "@/components/ui/line/LineAnimationUtils";

interface LineBackgroundProps {
    className?: string;
    delay: number;
}

export default function LineBackground({ className, delay }: LineBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const linesRef = useRef<Line[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let animationFrameId: number;
        let timeoutId: NodeJS.Timeout;
        let isVisible = true;

        const handleVisibilityChange = () => {
            isVisible = !document.hidden;
            if (!isVisible) {
                clearTimeout(timeoutId);
                cancelAnimationFrame(animationFrameId);
                linesRef.current = [];
            } else {
                animate();
                createNewLine();
            }
        };

        const animate = () => {
            if (!isVisible) return;
            animateLines(ctx, canvas, linesRef.current);
            animationFrameId = requestAnimationFrame(animate);
        };

        const createNewLine = () => {
            if (!isVisible) return;
            const delayRange = Math.random() * delay;
            const newLine = createLine(canvas.width, canvas.height);
            linesRef.current.push(newLine);
            timeoutId = setTimeout(createNewLine, delayRange);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        animate();
        createNewLine();

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(timeoutId);
        };
    }, [delay]);

    return <canvas ref={canvasRef} className={`w-full h-full absolute inset-0 ${className ?? ""}`} />;
}
