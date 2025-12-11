import { createFileRoute, Link } from "@tanstack/react-router";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import ShiningStars from "@/components/ui/ShiningStars";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/studio")({
    component: StudioLayout
});

const questions = [
    {
        question: "What is this tool for?",
        answer: "This tool is designed to modify enchantments of existing content, such as NeoEnchant+, Dungeons & Taverns, or any other pack, with the simplest and most intuitive interface that requires no development knowledge."
    },
    {
        question: "Minecraft Java Edition or Bedrock Edition?",
        answer: "This tool is designed for Minecraft Java Edition. Bedrock Edition is not supported."
    },
    {
        question: "How do I get started?",
        answer: "Simply drop existing content into the gray area. You can also modify Minecraft's base content using the white button."
    },
    {
        question: "Mods or Datapacks?",
        answer: "This tool is designed to support both datapacks and mods (Forge, Fabric, NeoForge, Quilt)."
    },
    {
        question: "How do I download the modified content?",
        answer: "When you are in the configuration interface, in the bottom left, you will find a white download button."
    },
    {
        question: "If the content gets updated, will I have to redo everything?",
        answer: "If you want to update your configuration to a different version of the original work, there is a migration tool available."
    }
];

function StudioLayout() {
    const { lang } = Route.useParams();
    const translate = t(lang);

    return (
        <div className="flex relative h-dvh">
            <div className="fixed -z-50 -top-16 -right-16 size-72 rounded-full blur-3xl bg-linear-to-br from-red-900/20 to-blue-900/20" />
            <div className="fixed -z-50 top-0 bottom-0 translate-y-1/2 -left-8 w-64 h-full rounded-full blur-3xl bg-linear-to-br from-pink-900/20 to-blue-900/20" />
            <div className="fixed -z-50 -bottom-24 -right-24 size-60 rounded-full blur-3xl bg-linear-to-br from-purple-900/20 to-red-900/20" />
            <div className="fixed -z-50 -top-16 -left-16 size-100 rounded-full blur-3xl bg-linear-to-br from-pink-900/20 to-blue-900/20" />

            <div className="fixed inset-0 -z-10">
                <ShiningStars />
            </div>

            <main className="w-full">
                <Navbar />
                <section className="w-11/12 md:w-3/4 mx-auto flex flex-col justify-evenly xl:grid grid-cols-2 items-center relative gap-8 min-h-screen">
                    <div className="h-full w-[95%] md:w-full relative">
                        <div className="xl:invisible visible absolute flex justify-center items-center size-full -z-10">
                            <div className="absolute inset-0 top-1/2 -translate-y-1/2 shadow-2xl bg-linear-to-r from-pink-900 to-blue-900 opacity-50 rounded-full blur-[5rem]" />
                        </div>

                        <div className="size-full flex flex-col justify-center">
                            <small className="text-zinc-400 font-bold tracking-wide text-[16px]">
                                {translate("studio.label.voxel_labs")}
                            </small>
                            <h1 className="text-white text-4xl md:text-6xl font-bold mt-4 text-balance">
                                {translate("studio.label.voxel_studio")}
                            </h1>
                            <p className="text-gray-300 mt-4">{translate("studio.label.voxel_studio_description")}</p>

                            <div className="flex items-center flex-col sm:flex-row gap-4 mt-8">
                                <Button variant="shimmer">{translate("studio.label.import_vanilla")}</Button>
                                <Button variant="aurora">{translate("studio.label.restore_last_session")}</Button>
                                <Link
                                    to="/$lang/update/studio"
                                    params={{ lang }}
                                    className="inline-flex h-10 items-center justify-center rounded-md px-4 font-medium text-slate-400 transition-colors hover:text-zinc-300 text-sm">
                                    {translate("studio.label.latest_update")} &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full flex justify-center items-center">
                        <div className="w-full max-w-md">
                            <label className="group relative flex flex-col items-center justify-center w-full h-full transition-all duration-300 rounded-3xl border-2 border-dashed cursor-pointer border-zinc-700/50 bg-zinc-900/20 backdrop-blur-sm hover:bg-zinc-800/30 hover:border-zinc-500 gap-6 p-12 min-h-[300px]">
                                <div className="size-20 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src="/icons/upload.svg"
                                        className="size-10 opacity-50 group-hover:opacity-100 transition-opacity invert"
                                        alt="Upload"
                                    />
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-zinc-200 font-medium text-xl group-hover:text-white transition-colors">
                                        {translate("studio.label.click_to_upload")}
                                    </p>
                                    <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                                        {translate("studio.label.drop_your_datapack_or_mod_here_to_start_configuring")}
                                    </p>
                                </div>
                                <input type="file" className="hidden" disabled={true} />
                            </label>

                            <Button className="w-full mt-8 flex items-center gap-x-2 shimmer-zinc-950 border border-zinc-800 text-white">
                                <img src="/icons/company/github.svg" alt="GitHub" className="size-4 invert" />
                                <span className="text-sm">{translate("studio.label.login_to_github")}</span>
                            </Button>
                        </div>
                        <img className="absolute -z-10 opacity-10 select-none" src="/icons/circle.svg" alt="box" />
                    </div>
                </section>

                <section className="my-32 min-h-[50dvh] w-11/12 md:w-3/4 mx-auto">
                    <div className="max-w-5xl mx-auto relative">
                        <div className="absolute size-full bg-linear-to-r from-pink-950 to-blue-950 opacity-10 rounded-full shadow-2xl blur-[5rem]" />
                        <div className="mb-16 w-fit relative z-20">
                            <h1 className="text-4xl font-bold text-balance">{translate("studio.label.faq")}</h1>
                            <div className="h-1 w-1/2 bg-linear-to-r from-rose-900 to-fuchsia-900 rounded-full mt-4" />
                        </div>
                        <div className="grid divide-y divide-zinc-700 z-20">
                            {questions.map((item: { question: string; answer: string }) => (
                                <div className="py-5" key={item.question}>
                                    <details className="group relative">
                                        <summary className="flex justify-between items-center gap-x-10 font-medium cursor-pointer list-none group-open:before:absolute group-open:before:inset-0 group-open:before:cursor-pointer">
                                            <span className="select-none text-zinc-200 text-base">{item.question}</span>
                                            <span className="select-none transition group-open:rotate-180 shrink-0">
                                                <img loading="eager" src="/icons/chevron-down.svg" alt="arrow" className="size-6 invert" />
                                            </span>
                                        </summary>
                                        <p className="select-none text-zinc-400 mt-4 group-open:animate-fadein">{item.answer}</p>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
            <div className="fixed bottom-4 inset-x-4 z-50 max-w-5xl mx-auto">
                <div className="bg-zinc-950/80 backdrop-blur-xl py-6 px-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 shadow-2xl rounded-xl border border-zinc-800">
                    <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 shadow-[0_0_15px_-3px_rgba(234,179,8,0.3)]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                            <path
                                fillRule="evenodd"
                                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="space-y-1 text-center md:text-left">
                        <h3 className="font-semibold text-zinc-100 text-lg tracking-tight">{translate("studio.maintenance.title")}</h3>
                        <p className="text-zinc-400 font-medium text-sm md:text-base">{translate("studio.maintenance.description")}</p>
                        <p className="text-zinc-500 text-xs">
                            {translate("studio.maintenance.date", {
                                date: new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(new Date("2025-12-15"))
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
