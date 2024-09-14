import { useTranslate } from "@/components/TranslateContext.tsx";
import type { FormComponent } from "@/lib/minecraft/core/engine";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";

export type ToolRevealElementType = {
    id: string;
    title: string;
    soon?: boolean;
    image: string;
    logo: string;
    href: string;
    description: string;
    children: FormComponent[];
};

export default function ToolRevealElement(props: {
    isSelect: boolean;
    title: string;
    soon?: boolean;
    image: string;
    href: string;
    logo: string;
    description: string;
    onClick: () => void;
}) {
    const { translate } = useTranslate();

    const handleClick = () => {
        if (props.soon) {
            toast.message(translate["generic.soon"], {
                description: translate["tools.toast.soon"]
            });

            return;
        }

        props.onClick();
    };

    return (
        <div
            onClick={handleClick}
            onKeyDown={handleClick}
            className={"transition-all stack group cursor-pointer rounded-2xl border border-zinc-800"}
        >
            <div className="relative z-50 self-start justify-self-end p-4">
                <a
                    href="https://www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        "items-center justify-center whitespace-nowrap cursor-pointer truncate text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 animate-shimmer transition bg-white hover:bg-zinc-300 text-black border-0 h-10 px-4 py-2 rounded-xl ring-0 shadow-2xl shadow-black",
                        {
                            "bg-zinc-700 text-white": props.soon
                        }
                    )}
                >
                    {props.soon ? translate["generic.soon"] : translate["generic.more"]}
                </a>
            </div>
            <div className="shadow-bottom rounded-2xl relative z-10" />
            <div
                className={cn("h-48 w-full rounded-2xl bg-cover bg-center transition", {
                    "grayscale opacity-50 group-hover:opacity-60": !props.isSelect,
                    "opacity-100": props.isSelect
                })}
                style={{ backgroundImage: `url(${props.image})` }}
            />
            <div className="self-end justify-self-end pb-4 pr-4 w-16 z-20">
                <img className="self-center" src={props.logo} alt={props.title} />
            </div>
            <div
                className={cn("p-4 self-end relative z-20", {
                    "opacity-50": !props.isSelect
                })}
            >
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold uppercase tracking-wider">{translate[props.title]}</h1>
                    <p className="text-zinc-400 font-semibold text-xs">{translate[props.description]}</p>
                </div>
            </div>
        </div>
    );
}
