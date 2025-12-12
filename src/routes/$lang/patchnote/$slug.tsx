import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import LineSetup from "@/components/ui/line/LineSetup";
import Markdown from "@/components/ui/markdown";
import TableOfContents from "@/components/ui/TableOfContents";
import { patchnote } from "@/lib/content/PatchNoteCollection";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$lang/patchnote/$slug")({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>) => ({
        version: typeof search.version === "string" ? search.version : undefined
    }),
    head: ({ params }) => {
        const translate = t(params.lang);
        return {
            meta: [
                { title: translate(`${params.slug}.seo.title`) },
                { name: "description", content: translate(`${params.slug}.seo.description`) }
            ]
        };
    }
});

function formatDate(date: Date, lang: string): string {
    return new Intl.DateTimeFormat(lang, { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function RouteComponent() {
    const { lang, slug } = Route.useParams();
    const { version } = Route.useSearch();
    const navigate = useNavigate({ from: Route.fullPath });
    const translate = t(lang);
    const entries = patchnote.byLang(lang, slug);
    const selectedVersionId = version ?? entries[0]?.data.version ?? "";
    const selectedEntry = entries.find((e) => e.data.version === selectedVersionId) ?? entries[0];
    const contentRef = useRef<HTMLDivElement>(null);
    const selectVersion = (newVersion: string) => navigate({ search: { version: newVersion } });

    return (
        <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-200 font-rubik overflow-clip selection:bg-pink-500/30">
            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="absolute -top-16 -right-16 size-96 rounded-full blur-3xl bg-linear-to-br from-red-900/20 to-blue-900/20" />
                <LineSetup />

                <div className="-z-10 absolute inset-0 scale-110">
                    <svg
                        className="size-full stroke-white/10 [stroke-dasharray:5_6] [stroke-dashoffset:10] stroke-2"
                        style={{ transform: "skewY(-12deg)" }}>
                        <defs>
                            <pattern id="grid" viewBox="0 0 64 64" width="32" height="32" patternUnits="userSpaceOnUse" x="0" y="0">
                                <path d="M64 0H0V64" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
                <Navbar />

                <main className="flex-1 container mx-auto px-4 py-20 md:py-32 flex flex-col lg:flex-row gap-12">
                    <aside className="lg:w-64 shrink-0 max-md:hidden">
                        <div className="space-y-8">
                            <h3 className="text-zinc-500 font-medium text-sm tracking-wider uppercase mb-4">
                                {translate("patchnote.version_history")}
                            </h3>
                            <div className="relative border-l-2 border-zinc-800 ml-3 space-y-0">
                                {entries.map((entry) => {
                                    const isActive = entry.data.version === selectedVersionId;
                                    return (
                                        <div key={entry.data.version} className="relative pl-6 pb-6 last:pb-0">
                                            <button
                                                type="button"
                                                onClick={() => selectVersion(entry.data.version)}
                                                className={cn(
                                                    "absolute -left-[5px] top-1.5 size-2.5 rounded-full transition-all duration-300 ring-4 ring-zinc-950 cursor-pointer",
                                                    isActive
                                                        ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                                        : "bg-zinc-700 hover:bg-zinc-500"
                                                )}
                                                aria-label={`Select version ${entry.data.version}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => selectVersion(entry.data.version)}
                                                className={cn(
                                                    "text-left transition-all duration-200 group w-full cursor-pointer",
                                                    isActive ? "opacity-100 translate-x-1" : "opacity-50 hover:opacity-80"
                                                )}>
                                                <div
                                                    className={cn(
                                                        "font-bold text-lg leading-none",
                                                        isActive ? "text-white" : "text-zinc-400"
                                                    )}>
                                                    v{entry.data.version}
                                                </div>
                                                <div className="text-xs text-zinc-500 mt-1 font-mono">
                                                    {formatDate(entry.data.publishDate, lang)}
                                                </div>
                                                {isActive && (
                                                    <div className="text-xs text-zinc-400 mt-1 font-medium truncate animate-fadein">
                                                        {entry.data.title}
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md">
                                <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
                                    {translate("patchnote.latest_stable")}
                                </h4>
                                <div className="text-2xl font-bold text-white mb-4">v{entries[0]?.data.version}</div>
                                <div className="flex flex-col gap-2">
                                    <Button
                                        href={selectedEntry.data.modrinth ?? ""}
                                        variant="default"
                                        className="w-full justify-center gap-2 text-white transition flex items-center rounded-xl bg-transparent hover:bg-green-900/10 border-green-900 hover:border-green-800">
                                        <img src="/icons/company/modrinth.svg" alt="Modrinth" className="size-4 invert" />
                                        {translate("patchnote.download_modrinth")}
                                    </Button>
                                    <Button
                                        href={selectedEntry.data.curseforge ?? ""}
                                        variant="default"
                                        className="w-full justify-center gap-2 text-white transition flex items-center rounded-xl bg-transparent hover:bg-orange-900/10 border-orange-900 hover:border-orange-800">
                                        <img src="/icons/company/curseforge.svg" alt="CurseForge" className="size-4 invert" />
                                        {translate("patchnote.download_curseforge")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0 mt-12 md:mt-0">
                        {selectedEntry && (
                            <div key={selectedVersionId} className="space-y-12 animate-fadein px-2 md:px-0">
                                <div className="space-y-8">
                                    <div className="flex flex-row items-center gap-4 text-zinc-200 font-mono text-sm tracking-widest uppercase">
                                        <span className="bg-zinc-200/10 px-3 py-1 rounded-full border border-zinc-200/20 w-fit">
                                            {selectedEntry.data.type}
                                        </span>
                                        <span className="text-zinc-500">{formatDate(selectedEntry.data.publishDate, lang)}</span>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                                            <span className="block text-transparent bg-clip-text bg-linear-to-r from-zinc-100 to-zinc-500">
                                                {selectedEntry.data.title}
                                            </span>
                                        </h1>

                                        {selectedEntry.data.description && (
                                            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
                                                {selectedEntry.data.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <hr className="shrink-0 h-px opacity-25 w-full bg-transparent beam-zinc-700 border-t-0 border-t-black/1 border-b-[none] border-x-0 border-x-black/1 border-solid" />

                                <div ref={contentRef}>
                                    <Markdown content={selectedEntry.content} />
                                </div>
                            </div>
                        )}

                        {!selectedEntry && (
                            <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center bg-white/2">
                                <p className="text-zinc-500 font-mono">{translate("patchnote.no_updates")}</p>
                            </div>
                        )}
                    </div>

                    <aside className="hidden xl:block w-56 shrink-0">
                        <div className="sticky top-32">
                            <TableOfContents content={selectedEntry?.content} containerRef={contentRef} />
                        </div>
                    </aside>
                </main>
                <Footer />
            </div>
        </div>
    );
}
