import { cn } from "@/lib/utils";
import TextureRenderer from "../minecraft/TextureRenderer";

const RewardCard = (props: {
    id: string;
    description: string;
    selected?: boolean;
    onClick?: (id: string) => void;
}) => {
    return (
        <div
            className={cn(
                "flex items-center gap-x-4 rounded-lg p-4 transition-all duration-200 cursor-pointer",
                "hover:bg-black/10",
                props.selected ? "bg-black/20 ring-1 ring-zinc-800" : "bg-black/10"
            )}
            onClick={() => props.onClick?.(props.id)}
            onKeyDown={(e) => e.key === "Enter" && props.onClick?.(props.id)}
        >
            <TextureRenderer id={props.id} />
            <div>
                <h2 className="text-xl font-bold text-white">
                    {props.id
                        .replace(/^[^:]+:/, "")
                        .split("_")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                </h2>
                <p className="text-sm text-zinc-400">{props.description}</p>
            </div>
        </div>
    );
};

export default RewardCard;
