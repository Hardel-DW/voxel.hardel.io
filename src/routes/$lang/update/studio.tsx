import { createFileRoute } from "@tanstack/react-router";
import CompoundLayout from "@/components/layout/CompoundLayout";
import TimelineContent from "@/components/layout/TimelineContent";
import { updates } from "@/lib/content/UpdateCollection";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/update/studio")({
    component: StudioUpdatePage,
    head: ({ params }) => {
        const translate = t(params.lang);
        return {
            meta: [
                { title: translate("timeline.opengraph.title") },
                { name: "description", content: translate("timeline.opengraph.description") },
                { property: "og:image", content: "/opengraph/timeline.webp" }
            ]
        };
    }
});

function StudioUpdatePage() {
    const { lang } = Route.useParams();
    const translate = t(lang);
    const updatesEntries = updates.byLangAndTimeline(lang, "studio");

    return (
        <CompoundLayout>
            <div className="fixed inset-0 pointer-events-none -z-10 bg-[#020202] overflow-hidden">
                <div className="absolute -top-16 -right-16 size-72 rounded-full blur-3xl bg-linear-to-br from-red-900/20 to-blue-900/20" />
                <div className="absolute top-0 bottom-0 translate-y-1/2 -left-8 w-64 h-full rounded-full blur-3xl bg-linear-to-br from-pink-900/20 to-blue-900/20" />
                <div className="absolute -bottom-24 -right-24 size-60 rounded-full blur-3xl bg-linear-to-br from-purple-900/20 to-red-900/20" />
                <div className="absolute -top-16 -left-16 size-100 rounded-full blur-3xl bg-linear-to-br from-pink-900/20 to-blue-900/20" />

                <div className="absolute inset-0 scale-110 opacity-40">
                    <svg
                        className="size-full stroke-white/30 [stroke-dasharray:5_6] [stroke-dashoffset:10] stroke-2"
                        style={{ transform: "skewY(-12deg)" }}>
                        <defs>
                            <pattern id="grid" viewBox="0 0 64 64" width="32" height="32" patternUnits="userSpaceOnUse" x="0" y="0">
                                <path d="M64 0H0V64" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="absolute inset-0 bg-radial-[circle_at_center_transparent_0%,#000000_100%] opacity-40" />
            </div>

            <main className="min-h-screen relative z-10">
                <section className="pt-40 pb-20 px-6">
                    <div className="max-w-7xl mx-auto md:grid md:grid-cols-[240px_48px_1fr] md:gap-x-12">
                        <div className="md:col-span-3">
                            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-medium text-zinc-300 uppercase tracking-wide">
                                    {translate("timeline.changelog")}
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white via-white to-zinc-500 tracking-tighter mb-6 font-rubik leading-[0.9]">
                                {translate("timeline.updates")}
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-4xl leading-relaxed">
                                {translate("timeline.updates.title")}
                            </p>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-6 pb-40">
                    <div className="flex flex-col">
                        {updatesEntries.map((update) => (
                            <TimelineContent key={update.slug} entry={update} />
                        ))}

                        {updatesEntries.length === 0 && (
                            <div className="md:pl-[300px] py-20">
                                <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center bg-white/2">
                                    <p className="text-zinc-500 font-mono">{translate("timeline.no_updates")}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </CompoundLayout>
    );
}
