import VortexBackground from "./VortexBackground";

export default function VortexSetup() {
    return (
        <div className="relative h-full w-full">
            <div className="absolute h-full w-full inset-0 z-0 bg-transparent flex items-center justify-center">
                <VortexBackground />
            </div>
            <div className="relative z-10 size-full" />
        </div>
    );
}
