import { cn } from "@/lib/utils";

interface InnerGlowProps extends React.HTMLAttributes<HTMLDivElement> {}

function InnerGlow({ className, ...props }: InnerGlowProps) {
    return (
        <div className="overflow-hidden overflow-body absolute inset-0 starting:opacity-0 opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <div
                className={cn(
                    "absolute -inset-3 border-10 pointer-events-none blur-xl [border-image:conic-gradient(from_var(--hue-rotation)_in_hsl_longer_hue,var(--color-red-600),var(--color-red-600))_1] animate-inner-glow",
                    className
                )}
                {...props}
            />
        </div>
    );
}

export { InnerGlow };
