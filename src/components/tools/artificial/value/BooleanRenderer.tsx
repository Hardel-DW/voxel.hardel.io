import { cn } from "@/lib/utils";

type BooleanRendererProps = {
    old: boolean;
    new: boolean;
    isTriggered: boolean;
};

export function BooleanRenderer(props: BooleanRendererProps) {
    if (props.isTriggered) {
        return (
            <div className="grid items-center justify-items-center shrink-0">
                <span className="text-xl font-bold">{props.new ? "On" : "Off"}</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 items-center justify-items-center shrink-0">
            <span className="text-xl line-through text-gray-500">{props.old ? "On" : "Off"}</span>
            <img src="/icons/chevron-right.svg" alt="Arrow up" className="size-8 invert" />
            <span className={cn("text-xl font-bold", props.new ? "text-green-700" : "text-red-700")}>{props.new ? "On" : "Off"}</span>
        </div>
    );
}
