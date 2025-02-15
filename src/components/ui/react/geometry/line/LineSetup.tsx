import LineBackground from "@/components/ui/react/geometry/line/LineBackground";

export default function LineSetup() {
    return (
        <div id="test" style={{ position: "absolute", width: "100%", height: "100%", inset: 0, zIndex: -10 }}>
            <LineBackground />
        </div>
    );
}
