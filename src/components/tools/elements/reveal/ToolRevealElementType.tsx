import { useTranslate } from "@/components/TranslateContext";
import Button from "@/components/ui/react/Button.tsx";
import TranslateText from "@/components/tools/elements/text/TranslateText";
import type { TranslateTextType } from "@/lib/minecraft/core/schema/primitive/text";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";

export default function ToolRevealElement(props: {
    isSelect: boolean;
    title: TranslateTextType | string;
    soon?: boolean;
    image: string;
    href: string;
    logo: string;
    description: TranslateTextType | string;
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
            className={"transition-all stack group cursor-pointer rounded-2xl border border-zinc-800"}>
            <div className="relative z-50 self-start justify-self-end p-4">
                <Button
                    variant="white-shimmer"
                    href={props.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn({
                        "opacity-50 hover:opacity-50": props.soon
                    })}>
                    <TranslateText
                        content={{
                            type: "translate",
                            value: props.soon ? "generic.soon" : "generic.more"
                        }}
                    />
                </Button>
            </div>
            <div className="bg-shadow-bottom rounded-2xl relative z-10" />
            <div
                className={cn("h-48 w-full rounded-2xl bg-cover bg-center transition", {
                    "grayscale opacity-50 group-hover:opacity-60": !props.isSelect,
                    "opacity-100": props.isSelect
                })}
                style={{ backgroundImage: `url(${props.image})` }}
            />
            <div className="self-end justify-self-end pb-4 pr-4 w-16 z-20">
                <img className="self-center" src={props.logo} alt={typeof props.title === "string" ? props.title : "TranslateText"} />
            </div>
            <div
                className={cn("p-4 self-end relative z-20", {
                    "opacity-50": !props.isSelect
                })}>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold uppercase tracking-wider">
                        <TranslateText content={props.title} />
                    </h1>
                    <p className="text-zinc-400 font-semibold text-xs">
                        <TranslateText content={props.description} />
                    </p>
                </div>
            </div>
        </div>
    );
}
