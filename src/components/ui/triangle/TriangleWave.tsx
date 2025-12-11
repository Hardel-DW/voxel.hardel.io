import Triangle from "@/components/ui/triangle/Triangle";

export default function TriangleWave() {
    return (
        <div className="relative">
            <div className="absolute w-full h-dvh inset-0">
                <Triangle triangleCount={100} spiralSpeed={1} />
            </div>
        </div>
    );
}
