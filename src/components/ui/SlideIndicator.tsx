import { cn } from "@/lib/utils";

interface SlideIndicatorProps {
    count: number;
    currentIndex: number;
    onSelect: (index: number) => void;
    direction?: "vertical" | "horizontal";
    interval?: number;
    hideOnScroll?: boolean;
    className?: string;
}

export default function SlideIndicator({ count, currentIndex, onSelect, direction = "horizontal", interval = 5000, className }: SlideIndicatorProps) {
    const isVertical = direction === "vertical";

    return (
        <div className={cn("flex gap-2", isVertical ? "flex-col" : "flex-row", className)}>
            {Array.from({ length: count }, (_, index) => {
                const isActive = index === currentIndex;

                return (
                    <button
                        key={`slide-indicator-${index.toString()}`}
                        type="button"
                        onClick={() => onSelect(index)}
                        className={cn(
                            "relative rounded-full bg-white/10 border-2 border-zinc-900 cursor-pointer overflow-hidden transition-all duration-300",
                            isVertical ? "h-6 w-2" : "h-2 w-6",
                            isActive && (isVertical ? "h-16" : "w-16")
                        )}>
                        {isActive && (
                            <span
                                className={cn("absolute inset-0 rounded-full bg-pink-700", isVertical ? "origin-top animate-fill-vertical" : "origin-left animate-fill-horizontal")}
                                style={{ animationDuration: `${interval}ms` }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
