import Triangle from "@/components/ui/pattern/Triangle.tsx";
import type React from "react";

const TriangleWave: React.FC = () => {
    return (
        <div style={{ position: "relative" }}>
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100dvh",
                    inset: 0,
                    zIndex: -0
                }}
            >
                <Triangle triangleCount={100} spiralSpeed={1} />
            </div>
        </div>
    );
};

export default TriangleWave;
