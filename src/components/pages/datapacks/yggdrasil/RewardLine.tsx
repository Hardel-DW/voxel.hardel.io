import TextureRenderer from "@/components/minecraft/TextureRenderer";

export default function RewardLine(props: {
    count?: number | { min: number; max: number };
    description?: string;
    id: string;
}) {
    return (
        <li className="rounded-lg border-t border-l border-zinc-800 bg-black/10 p-4 h-fit flex items-center justify-between gap-x-8">
            <div className="flex items-center gap-x-4">
                <TextureRenderer id={props.id} />
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white">
                        {props.id
                            .replace(/^[^:]+:/, "")
                            .split("_")
                            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                    </h2>
                    {props.description ? (
                        <p className="text-sm text-zinc-400">{props.description}</p>
                    ) : (
                        <p className="text-sm text-zinc-400">{props.id}</p>
                    )}
                </div>
            </div>
            {props.count ? (
                <p className="text-white">
                    {typeof props.count === "number" ? props.count : `${props.count.min} - ${props.count.max}`} items
                </p>
            ) : null}
        </li>
    );
}
