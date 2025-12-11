import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Video({ src, className }: { children?: ReactNode; src?: string; className?: string }) {
    if (!src) return null;

    return (
        <div className={cn("group relative w-full mx-auto my-12 perspective-1000", className)}>
            <div
                className="absolute -z-10 -inset-1 bg-linear-to-r from-pink-600/30 via-purple-600/30 to-blue-600/30 
                rounded-4xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-700"
            />

            <div
                className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/50 
                shadow-[0_0_25px_-5px_rgb(0_0_0/0.5)]
                ring-1 ring-white/10 group-hover:ring-white/20 transition duration-500"
            >
                <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />

                <iframe
                    className="w-full aspect-video"
                    src={src}
                    title="Video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                />
            </div>
        </div>
    );
}
