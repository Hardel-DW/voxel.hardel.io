import ShiningStars from "@/components/ui/object/ShiningStars.tsx";
import type React from "react";

const NightStar: React.FC = () => {
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
                <ShiningStars />
            </div>
        </div>
    );
};

export default NightStar;
