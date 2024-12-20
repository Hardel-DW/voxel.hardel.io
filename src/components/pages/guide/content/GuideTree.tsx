import { cn } from "@/lib/utils";

interface Props {
    image: {
        src: string;
        alt: string;
    };
    index: number;
    slug: string;
    selected?: boolean;
    locked?: boolean;
}

export default function GuideTree(props: Props) {
    return (
        <div
            style={{ "--tw-duration": `${(props.index + 5) * 50}ms` } as React.CSSProperties}
            className={cn("select-none relative group/card transition-all hover:opacity-100 starting:translate-x-50 translate-x-0", {
                "opacity-100": props.selected,
                "opacity-50": !props.selected,
                "hover:opacity-55": props.locked
            })}>
            {props.selected && (
                <div className="absolute inset-0 -z-10 hue-rotate-45 brightness-20">
                    <img src="/images/shine.avif" alt="Shine" />
                </div>
            )}

            {/* Card */}
            <a href={props.locked ? "#" : props.slug}>
                <div
                    className={cn(
                        "stack rounded-2xl w-full h-36 relative cursor-pointer border border-zinc-700 transition-all group-hover/card:border-zinc-600 bg-content",
                        {
                            "border-zinc-700": props.selected,
                            "border-zinc-800": !props.selected
                        }
                    )}>
                    <div
                        className={cn("size-full rounded-2xl relative -z-10 bg-cover bg-center bg-no-repeat", {
                            "opacity-50": props.locked
                        })}
                        style={{ backgroundImage: `url(${props.image.src})` }}
                    />
                    {props.locked && (
                        <>
                            <div className="absolute inset-0 -z-10 hue-rotate-45 brightness-50">
                                <img src="/images/shine.avif" alt="Shine" />
                            </div>

                            <div className="absolute left-0 right-0 h-1/2 top-1/2 -translate-y-1/2 -z-10 bg-linear-to-t blur-xl from-black to-fuchsia-950/75 rounded-2xl" />
                            <div className="size-full flex justify-center items-center rounded-2xl stack">
                                <div className="text-3xl uppercase tracking-wider font-bold text-white">Bientôt</div>
                            </div>
                        </>
                    )}
                </div>
            </a>
        </div>
    );
}
