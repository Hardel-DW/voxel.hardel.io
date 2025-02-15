import TextureRenderer from "@/components/minecraft/TextureRenderer";

export default function RewardLine(props: {
    chance: number;
    id: string;
}) {
    return (
        <li className="rounded-xl border-t border-l border-zinc-800 bg-[#0c0b0e] p-4 h-fit flex items-center justify-between gap-x-8">
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
                    <p className="text-sm text-zinc-400">{props.id}</p>
                </div>
            </div>
            <p className="text-white">{props.chance.toFixed(1)}%</p>
        </li>
    );
}
