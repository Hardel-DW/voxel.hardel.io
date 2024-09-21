import { useTranslate } from "@/components/TranslateContext.tsx";
import type { FaqType } from "@/content/config.ts";
import { useConfigurator } from "@/lib/minecraft/components/ConfiguratorContext.tsx";
import DatapackUploader from "@/lib/minecraft/components/DatapackUploader.tsx";
import type React from "react";

export default function HelpGuide(props: {
    faq?: FaqType[];
    children?: React.ReactNode;
}) {
    const { translate, lang } = useTranslate();
    const context = useConfigurator();

    if (context.elements.length > 0) return null;

    return (
        <>
            <div className="mt-8 xl:mt-0 w-full flex justify-center">
                <div className="mx-auto w-11/12 md:w-3/4">{props.children}</div>
            </div>
            <section
                className="w-11/12 md:w-3/4 mx-auto flex flex-col justify-evenly xl:grid grid-cols-2 items-center relative gap-8"
                style={{
                    minHeight: "calc(100vh - 8rem)"
                }}
            >
                <div className="h-full w-[95%] md:w-full relative">
                    <div className="xl:invisible visible absolute flex justify-center items-center size-full -z-10">
                        <div className="absolute inset-0 top-1/2 -translate-y-1/2 shadow-2xl bg-gradient-to-r from-pink-900 to-blue-900 opacity-50 rounded-full blur-[5rem]" />
                    </div>

                    <div className="size-full flex flex-col justify-center">
                        <small className="text-pink-700 font-bold tracking-wide text-[16px]">{translate["home.main.small"]}</small>
                        <h1 className="text-white text-4xl md:text-6xl font-bold mt-4 text-balance">
                            {translate["tools.enchantments.home"]}
                        </h1>
                        <p className="text-gray-300 mt-4">{translate["tools.enchantments.home.description"]}</p>

                        <a
                            href={`/${lang}/update/enchant-configurator`}
                            className="inline-flex w-fit h-12 mt-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors hover:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        >
                            {translate["timeline.see_latest_updates"]} &rarr;
                        </a>
                    </div>
                </div>
                <div className="relative w-full flex justify-center items-center">
                    <DatapackUploader />
                    <img className="absolute -z-10 opacity-10 drag-none" src="/icons/circle.svg" alt="box" />
                </div>
            </section>

            <section className="my-32 min-h-[50dvh] w-11/12 md:w-3/4 mx-auto">
                <div className="max-w-5xl mx-auto relative">
                    <div className="absolute size-full bg-gradient-to-r from-pink-950 to-blue-950 opacity-10 rounded-full shadow-2xl blur-[5rem]" />
                    <div className="mb-16 w-fit relative z-20">
                        <h1 className="text-4xl font-bold text-balance">{translate["generic.faq"]}</h1>
                        <div className="h-1 w-1/2 bg-gradient-to-r from-rose-900 to-fuchsia-900 rounded-full mt-4" />
                    </div>
                    <div className="grid divide-y divide-zinc-700 z-20">
                        {!props.faq && (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-400" />
                            </div>
                        )}
                        {props.faq?.map((item: { question: string; answer: string }) => (
                            <div className="py-5" key={item.question}>
                                <details className="group relative">
                                    <summary className="flex justify-between items-center gap-x-10 font-medium cursor-pointer list-none group-open:before:absolute group-open:before:inset-0 group-open:before:cursor-pointer">
                                        <span className="select-none text-zinc-200 text-base">{item.question}</span>
                                        <span className="select-none transition group-open:rotate-180 flex-shrink-0">
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
        </>
    );
}
