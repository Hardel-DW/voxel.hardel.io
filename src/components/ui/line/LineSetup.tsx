import LineBackground from "@/components/ui/line/LineBackground";

export default function LineSetup({ delay = 5000 }: { delay?: number }) {
    return (
        <div className="absolute inset-0 -z-10">
            <LineBackground delay={delay} />
        </div>
    );
}
