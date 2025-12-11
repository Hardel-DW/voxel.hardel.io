import type { HTMLAttributes } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MarketplaceCardProps extends HTMLAttributes<HTMLDivElement> {
    packId: string;
    packName: string;
    text: string;
    lang: string;
}

export default function MarketplaceCard({ packId, packName, text, lang, className, ...rest }: MarketplaceCardProps) {
    return (
        <div
            className={cn(
                "relative opacity-85 hover:opacity-100 group border-t-2 border-r border-zinc-800 rounded-3xl transition-all duration-200 hover:before:opacity-100 before:opacity-0 before:absolute before:inset-0 before:-z-10 before:transition-opacity before:rounded-3xl before:duration-200 before:blur-xl before:bg-(image:--hover-image)",
                className
            )}
            style={{ "--hover-image": `url('/images/marketplace/card/${packId}.webp')` } as React.CSSProperties}
            {...rest}>
            <div className="relative w-full h-64">
                <img src={`/images/marketplace/card/${packId}.webp`} alt={packName} className="w-full h-full object-cover rounded-3xl" />

                <div className="absolute top-0 left-0 p-4">
                    <img height="113" src={`/images/marketplace/title/${packId}.webp`} alt={packName} className="h-16" />
                </div>

                <div className="absolute bottom-0 left-0 p-4 w-full">
                    <Button className="border-0" to="/$lang/resources/$id" params={{ lang, id: packId }}>
                        {text}
                    </Button>
                </div>

                <div className="hidden sm:block absolute right-0 bottom-0 h-3/4 md:h-1/2 lg:h-3/4 p-4">
                    <img
                        loading="lazy"
                        width="678"
                        height="769"
                        src={`/images/marketplace/feature/${packId}.webp`}
                        alt="Preview"
                        className="size-16 pixelated select-none h-full w-fit"
                    />
                </div>
            </div>
        </div>
    );
}
