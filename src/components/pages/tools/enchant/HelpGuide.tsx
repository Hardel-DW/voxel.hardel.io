import { useTranslate } from "@/components/TranslateContext.tsx";
import { useConfigurator } from "@/components/tools/ConfiguratorContext.tsx";
import DatapackUploader from "@/components/tools/DatapackUploader.tsx";
import type { FaqType } from "@/content/config.ts";
import type React from "react";
import { parseDatapack } from "@/lib/minecraft/core/engine/Parser";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/shadcn/dropdown";

export default function HelpGuide(props: {
    faq?: FaqType[];
    children?: React.ReactNode;
}) {
    const { translate, lang } = useTranslate();
    const context = useConfigurator();

    const handleVanillaImport = async (version: number) => {
        try {
            const response = await fetch(`/api/preset/${version}`);
            if (!response.ok) throw new Error("Failed to fetch datapack");

            const blob = await response.blob();
            const file = new File([blob], `enchantment-${version}.zip`, { type: "application/zip" });

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            const fileList = dataTransfer.files;
            const result = await parseDatapack("enchantment", fileList);

            if (typeof result === "string") {
                console.error("Error parsing datapack:", result);
                return;
            }

            context.setName("Vanilla Enchantment - Voxel Configurator");
            context.setFiles(result.files);
            context.setElements(result.elements);
            context.setVersion(result.version);
            context.setToggleSection(result.toggleSection);
            context.setCurrentElementId(result.currentElementId);
            context.setLogger(result.logger);
            context.setIsJar(result.isJar);
            context.setConfiguration(result.configuration);
        } catch (error: unknown) {
            console.error("Failed to import vanilla datapack:", error);
            if (error instanceof Error) {
                console.error("Error stack:", error.stack);
            }
        }
    };

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
                }}>
                <div className="h-full w-[95%] md:w-full relative">
                    <div className="xl:invisible visible absolute flex justify-center items-center size-full -z-10">
                        <div className="absolute inset-0 top-1/2 -translate-y-1/2 shadow-2xl bg-linear-to-r from-pink-900 to-blue-900 opacity-50 rounded-full blur-[5rem]" />
                    </div>

                    <div className="size-full flex flex-col justify-center">
                        <small className="text-pink-700 font-bold tracking-wide text-[16px]">{translate["home.main.small"]}</small>
                        <h1 className="text-white text-4xl md:text-6xl font-bold mt-4 text-balance">
                            {translate["tools.enchantments.home"]}
                        </h1>
                        <p className="text-gray-300 mt-4">{translate["tools.enchantments.home.description"]}</p>

                        <div className="flex items-center flex-col sm:flex-row gap-4 mt-8">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <button
                                        type="button"
                                        className="h-10 px-4 py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap cursor-pointer truncate text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 animate-shimmer bg-[linear-gradient(110deg,#FCFCFC,45%,#d0d0d0,55%,#FCFCFC)] bg-[length:200%_100%] text-black font-medium border-t border-l border-zinc-900 hover:opacity-75 transition">
                                        {translate["tools.enchantments.import_vanilla"]}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleVanillaImport(48)}>Minecraft - Version 1.21.4</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleVanillaImport(57)}>
                                        Minecraft - Version 1.21.2 to 1.21.3
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleVanillaImport(61)}>
                                        Minecraft - Version 1.21 to 1.21.1
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <a
                                href={`/${lang}/update/enchant-configurator`}
                                className="inline-flex h-10 items-center justify-center rounded-md px-4 font-medium text-slate-400 transition-colors hover:text-zinc-300 text-sm">
                                {translate["timeline.see_latest_updates"]} &rarr;
                            </a>
                        </div>
                    </div>
                </div>
                <div className="relative w-full flex justify-center items-center">
                    <DatapackUploader />
                    <img className="absolute -z-10 opacity-10 select-none" src="/icons/circle.svg" alt="box" />
                </div>
            </section>

            <section className="my-32 min-h-[50dvh] w-11/12 md:w-3/4 mx-auto">
                <div className="max-w-5xl mx-auto relative">
                    <div className="absolute size-full bg-linear-to-r from-pink-950 to-blue-950 opacity-10 rounded-full shadow-2xl blur-[5rem]" />
                    <div className="mb-16 w-fit relative z-20">
                        <h1 className="text-4xl font-bold text-balance">{translate["generic.faq"]}</h1>
                        <div className="h-1 w-1/2 bg-linear-to-r from-rose-900 to-fuchsia-900 rounded-full mt-4" />
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
        </>
    );
}
