import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";;
import { cn } from "@/lib/utils";
import { neoenchant } from "@/lib/content/NeoEnchantCollection";
import LineSetup from "@/components/ui/line/LineSetup";
import Markdown from "@/components/ui/markdown";

export const Route = createFileRoute("/$lang/update/neoenchant")({
    component: RouteComponent,
});

function formatDate(date: Date, lang: string): string {
    return new Intl.DateTimeFormat(lang, { year: "numeric", month: "short", day: "numeric" }).format(date);
}

function RouteComponent() {
    const { lang } = Route.useParams();
    const entries = neoenchant.byLang(lang);
    const [selectedVersionId, setSelectedVersionId] = useState<string>(entries[0]?.data.version ?? "");
    const selectedEntry = entries.find((e) => e.data.version === selectedVersionId) ?? entries[0];

    return (
        <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-200 font-rubik overflow-hidden selection:bg-pink-500/30">
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
                    <aside className="lg:w-64 shrink-0">
                        <div className="lg:sticky lg:top-32 space-y-8">
                            <div>
                                <h3 className="text-zinc-500 font-medium text-sm tracking-wider uppercase mb-4">Version History</h3>
                                <div className="relative border-l-2 border-zinc-800 ml-3 space-y-0">
                                    {entries.map((entry) => {
                                        const isActive = entry.data.version === selectedVersionId;
                                        return (
                                            <div key={entry.data.version} className="relative pl-6 pb-6 last:pb-0">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedVersionId(entry.data.version)}
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
                                                    onClick={() => setSelectedVersionId(entry.data.version)}
                                                    className={cn(
                                                        "text-left transition-all duration-200 group w-full cursor-pointer",
                                                        isActive ? "opacity-100 translate-x-1" : "opacity-50 hover:opacity-80"
                                                    )}
                                                >
                                                    <div className={cn("font-bold text-lg leading-none", isActive ? "text-white" : "text-zinc-400")}>
                                                        v{entry.data.version}
                                                    </div>
                                                    <div className="text-xs text-zinc-500 mt-1 font-mono">{formatDate(entry.data.publishDate, lang)}</div>
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
                            </div>

                            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-md">
                                <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Latest Stable</h4>
                                <div className="text-2xl font-bold text-white mb-4">v{entries[0]?.data.version}</div>
                                <div className="flex flex-col gap-2">
                                    <Button variant="default" className="w-full justify-center gap-2 text-white transition flex items-center rounded-xl bg-transparent hover:bg-green-900/10 border-green-900 hover:border-green-800">
                                        <img src="/icons/company/modrinth.svg" alt="Modrinth" className="size-4 invert" />
                                        Download on Modrinth
                                    </Button>
                                    <Button variant="default" className="w-full justify-center gap-2 text-white transition flex items-center rounded-xl bg-transparent hover:bg-orange-900/10 border-orange-900 hover:border-orange-800">
                                        <img src="/icons/company/curseforge.svg" alt="CurseForge" className="size-4 invert" />
                                        Download on CurseForge
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {selectedEntry && (
                            <div key={selectedVersionId} className="space-y-12 animate-fadein">
                                <div className="space-y-8">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-zinc-200 font-mono text-sm tracking-widest uppercase">
                                        <span className="bg-zinc-200/10 px-3 py-1 rounded-full border border-zinc-200/20">
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

                                <div className="border border-zinc-800/50 rounded-3xl p-8 mt-16 backdrop-blur-md">
                                    <Markdown content={selectedEntry.content} />
                                </div>
                            </div>
                        )}

                        {!selectedEntry && (
                            <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center bg-white/2">
                                <p className="text-zinc-500 font-mono">No updates available</p>
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}
