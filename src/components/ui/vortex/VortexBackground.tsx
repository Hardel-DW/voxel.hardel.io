import { useEffect, useRef } from "react";
import { animateVortex, createVortexState, updateVortexCenter, type VortexState } from "./VortexAnimationUtils";

interface VortexBackgroundProps {
    className?: string;
}

const VortexBackground: React.FC<VortexBackgroundProps> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef<VortexState | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            if (stateRef.current) {
                updateVortexCenter(stateRef.current, canvas.width, canvas.height);
            }
        };

        resizeCanvas();
        stateRef.current = createVortexState(canvas.width, canvas.height);

        let animationFrameId: number;

        const animate = () => {
            if (stateRef.current) {
                animateVortex(ctx, canvas, stateRef.current);
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} id="vortex" className={className ?? ""} />;
};

export default VortexBackground;
