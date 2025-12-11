import type { ReactNode } from "react";

export function Video({ src }: { children?: ReactNode; src?: string }) {
    if (!src) return null;
    return (
        <div className="relative">
            <div className="absolute -z-10 size-full inset-0 bg-linear-to-r from-pink-900 to-blue-900 opacity-50 rounded-full blur-[10rem]" />
            <div className="border-line" />
            <div className="border-corner" />
            <iframe
                className="w-full aspect-video rounded-3xl"
                src={src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
}