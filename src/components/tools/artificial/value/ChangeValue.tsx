import { cn } from "@/lib/utils";

type ChangeValueProps = {
    old: number;
    new: number;
    isTriggered: boolean;
};

export function ChangeValue(props: ChangeValueProps) {
    if (props.isTriggered) {
        return (
            <div className="grid items-center justify-items-center shrink-0">
                <span className="text-xl font-bold">{props.new}</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 items-center justify-items-center shrink-0">
            <span className="text-xl line-through text-gray-500">{props.old}</span>
            <img src="/icons/chevron-right.svg" alt="Arrow up" className="size-8 invert" />
            <span className={cn("text-xl font-bold", props.new > props.old ? "text-green-700" : "text-red-700")}>{props.new}</span>
        </div>
    );
}
