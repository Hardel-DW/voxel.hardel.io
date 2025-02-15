import type { IdentifierObject } from "@voxelio/breeze";
import EnchantmentElement from "@/components/pages/tools/copilot/sidebar/enchant/EnchantmentElement";
import EnchantmentLabel from "@/components/pages/tools/copilot/sidebar/enchant/EnchantmentLabel";
import { useRef, useEffect, useState } from "react";

export default function EnchantmentCard(props: { item: string; value: IdentifierObject[] }) {
    const reveal = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLUListElement>(null);
    const [contentHeight, setContentHeight] = useState("0px");

    useEffect(() => {
        if (contentRef.current) setContentHeight(`${contentRef.current.scrollHeight}px`);
    }, []);

    const handleClick = () => reveal.current?.toggleAttribute("data-revealed");

    return (
        <div
            onClick={handleClick}
            onKeyDown={handleClick}
            ref={reveal}
            className="bg-zinc-950 rounded-xl p-4 relative border-t-2 border-l-2 border-zinc-900 select-none cursor-pointer">
            <div className="absolute inset-0 z-0 hue-rotate-45 starting:opacity-0 transition-all duration-500 brightness-20">
                <img src="/images/shine.avif" alt="Shine" />
            </div>
            <div className="absolute inset-0 z-0 hue-rotate-45 rotate-180 starting:opacity-0 transition-all duration-500 brightness-10">
                <img src="/images/shine.avif" alt="Shine" />
            </div>

            <EnchantmentLabel item={props.item} />
            <ul
                ref={contentRef}
                style={{ "--content-height": contentHeight } as React.CSSProperties}
                className="grid gap-2 p-px *:even:bg-white/5 relative z-20 transition-all duration-500 ease-in-out overflow-hidden max-h-[var(--content-height)] in-data-revealed:max-h-0">
                <hr />
                {props.value.map((item) => (
                    <EnchantmentElement key={item.toString()} identifier={item} />
                ))}
            </ul>
        </div>
    );
}
