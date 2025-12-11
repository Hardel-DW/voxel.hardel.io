import type { ContentEntry } from "@/lib/content/ContentCollection";
import type { UpdateData } from "@/lib/content/UpdateCollection";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Markdown from "../ui/markdown";

interface TimelineContentProps {
    entry: ContentEntry<UpdateData>;
}

const AUTHOR = {
    name: "Hardel",
    image: "/images/avatar/hardel.webp"
};

function formatDate(date: Date, lang: string): string {
    return new Intl.DateTimeFormat(lang, { year: "numeric", month: "long", day: "numeric" }).format(date);
}

export default function TimelineContent({ entry }: TimelineContentProps) {
    const { data, content } = entry;
    const lang = entry.slug.split("/")[1];
    const translate = t(lang);

    const isMajor = data.type?.toLowerCase().includes("major") || data.version.endsWith(".0");

    return (
        <article className="group relative grid md:grid-cols-[240px_48px_1fr] gap-x-0 md:gap-x-12 items-start">
            <div className="hidden md:flex flex-col items-end text-right sticky top-32 pt-2 transition-opacity duration-500 opacity-60 group-hover:opacity-100">
                <div className="flex items-center gap-3 mb-1">
                    <span
                        className={cn(
                            "text-4xl font-bold font-minecraft tracking-tight transition-colors",
                            isMajor ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "text-zinc-500 group-hover:text-zinc-300"
                        )}>
                        v{data.version}
                    </span>
                    {data.draft && (
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-red-500/10 text-red-500 border border-red-500/20">
                            {translate("timeline.draft")}
                        </span>
                    )}
                </div>
                <time className="text-sm font-medium text-zinc-500 font-rubik">{formatDate(data.publishDate, lang)}</time>
                <div className="mt-2 text-xs font-mono text-zinc-600 uppercase tracking-widest">{data.type}</div>
            </div>

            <div className="hidden md:flex flex-col items-center self-stretch relative w-12">
                <div className="absolute inset-y-0 left-1/2 w-px -ml-[0.5px] bg-linear-to-b from-zinc-800 via-zinc-700 to-zinc-800 group-hover:via-zinc-500 transition-colors duration-700" />
                <div className="sticky top-40 z-10 flex justify-center w-full">
                    <div
                        className={cn(
                            "relative z-20 size-3 rounded-full border-2 transition-all duration-500",
                            isMajor
                                ? "bg-white border-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-125"
                                : "bg-zinc-950 border-zinc-600 group-hover:border-zinc-400 group-hover:scale-110"
                        )}
                    />
                </div>
            </div>

            <div className="col-span-3 md:col-span-1 pl-4 md:pl-0 pt-0 pb-32 md:pb-40 relative w-full min-w-0">
                <div className="flex md:hidden items-center justify-between mb-8 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-white font-minecraft">v{data.version}</span>
                    </div>
                    <time className="text-xs text-zinc-500">{formatDate(data.publishDate, lang)}</time>
                </div>

                <Markdown content={content} />

                <div className="mt-16 flex items-center gap-4 border-t border-white/5 pt-6 opacity-60 hover:opacity-100 transition-opacity">
                    <img src={AUTHOR.image} alt={AUTHOR.name} className="size-8 rounded-full ring-2 ring-white/10" />
                    <div className="flex flex-col">
                        <span className="text-sm text-zinc-300 font-medium">{AUTHOR.name}</span>
                        <span className="text-xs text-zinc-600 font-mono uppercase tracking-wider">{translate("timeline.maintainer")}</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
