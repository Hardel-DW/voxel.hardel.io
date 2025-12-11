import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import DatapackCard from "@/components/DatapackCard";
import GallerySection, { type ImageItem } from "@/components/GallerySection";
import CompoundLayout from "@/components/layout/CompoundLayout";
import VideoSection from "@/components/VideoSection";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/$lang/packs/yggdrasil")({
    component: YggdrasilPage
});

interface Structure {
    id: string;
    name: string;
    image: string;
    icon: string;
}

const images: ImageItem[] = [
    { rows: 2, cols: 2, path: "/images/addons/card/yggdrasil/alfheim.webp" },
    { rows: 1, cols: 2, path: "/images/addons/card/yggdrasil/another_street.webp" },
    { rows: 1, cols: 2, path: "/images/addons/card/yggdrasil/elf_house.webp" },
    { rows: 2, cols: 2, path: "/images/addons/card/yggdrasil/fight.webp" },
    { rows: 2, cols: 2, path: "/images/addons/card/yggdrasil/fountain.webp" },
    { rows: 1, cols: 2, path: "/images/addons/card/yggdrasil/house.webp" },
    { rows: 1, cols: 1, path: "/images/addons/card/yggdrasil/lac.webp" },
    { rows: 1, cols: 1, path: "/images/addons/card/yggdrasil/lock.webp" },
    { rows: 1, cols: 1, path: "/images/addons/card/yggdrasil/mystic_house.webp" },
    { rows: 2, cols: 1, path: "/images/addons/card/yggdrasil/quest.webp" },
    { rows: 1, cols: 2, path: "/images/addons/card/yggdrasil/runic_fracture.webp" },
    { rows: 1, cols: 1, path: "/images/addons/card/yggdrasil/street.webp" },
    { rows: 2, cols: 1, path: "/images/addons/card/yggdrasil/sword.webp" },
    { rows: 1, cols: 1, path: "/images/addons/card/yggdrasil/asflors.webp" },
    { rows: 1, cols: 2, path: "/images/addons/card/yggdrasil/table.webp" },
    { rows: 1, cols: 1, path: "/images/addons/card/yggdrasil/underground.webp" }
];

const structuresData = {
    alfheim: "Alfheim",
    asflors: "Asflors",
    cubeoid: "Cubeoid",
    dokkalfar_ruins: "Dokkalfar Ruins",
    glaosheimr: "Glaosheimr Village",
    runic_fracture: "Runic Fracture",
    runic_labyrinth: "Runic Labyrinth",
    runic_alfheim_tree: "Runic Alfheim Tree"
};

function YggdrasilPage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { lang } = Route.useParams();
    const translate = t(lang);
    const structures: Structure[] = Object.entries(structuresData).map(([id, name]) => ({
        id,
        name,
        image: `/images/addons/card/yggdrasil/${id}.webp`,
        icon: `/images/addons/icon/yggdrasil/${id}.webp`
    }));
    const currentStructure = structures[selectedIndex];
    const handleStructureSelect = (index: number) => setSelectedIndex(index);

    return (
        <CompoundLayout>
            <section className="h-[90vh] relative z-20 flex flex-col items-center justify-end">
                <div className="absolute inset-0 bg-linear-to-b from-black/50 from-5% to-transparent" />
                <div className="absolute bottom-0 h-1/2 w-full bg-linear-to-t from-black to-transparent" />

                <img
                    src={currentStructure.image}
                    alt={currentStructure.id}
                    width="1920"
                    height="1080"
                    loading="eager"
                    className="absolute inset-0 size-full object-cover object-center -z-10 transition-all duration-500"
                />

                <div className="relative flex flex-col items-center gap-y-4 pb-24 select-none">
                    <span style={{ fontFamily: "fantasy" }} className="text-4xl md:text-6xl uppercase tracking-widest text-white">
                        {currentStructure.name}
                    </span>

                    <div className="w-full flex items-center gap-x-4">
                        <div className="h-px flex-1 bg-linear-to-l from-zinc-700 to-transparent" />
                        <img src="/icons/star.svg" alt="star" className="size-6 invert" />
                        <div className="h-px flex-1 bg-linear-to-r from-zinc-700 to-transparent" />
                    </div>

                    <div className="flex items-center gap-x-4">
                        {structures.map((structure, index) => (
                            <button
                                key={structure.id}
                                type="button"
                                onClick={() => handleStructureSelect(index)}
                                className={cn(
                                    "relative size-24 transition-transform grayscale hover:grayscale-0 duration-300 hover:scale-110 cursor-pointer",
                                    index === selectedIndex && "scale-125 grayscale-0"
                                )}>
                                <img src={structure.icon} alt={structure.id} className="w-full h-full object-contain p-1" />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <VideoSection
                url="https://www.youtube.com/embed/UNYxJkHhb8w"
                title={translate("datapacks.yggdrasil.video.title")}
                description={translate("datapacks.yggdrasil.video.description")}
                section={translate("datapacks.yggdrasil.video")}
            />

            <GallerySection images={images} title={translate("datapacks.yggdrasil.gallery")} />

            <section className="relative mt-40">
                <div className="w-3/4 mx-auto gap-8">
                    <div className="mb-24">
                        <h1 className="text-4xl md:text-6xl wrap-break-words font-bold text-white text-center w-full md:w-1/2 mx-auto">
                            {translate("datapacks.neoenchant.ecosystem")}
                        </h1>
                        <hr className="shrink-0 h-px opacity-25 w-full bg-transparent beam-white border-t-0 border-t-black/2 border-b-[none] border-x-0 border-x-black/2 border-solid" />
                    </div>
                    <div className="grid md:grid-cols-2 items-center w-full gap-y-36 gap-x-16 min-h-[568px] py-24 mb-24">
                        <DatapackCard
                            href="https://modrinth.com/datapack/beyondenchant"
                            asset="/images/background/datapacks/beyond.webp"
                            title={translate("datapacks.beyondenchant.short")}
                            description={translate("datapacks.beyondenchant.description")}
                            buttonText={translate("datapacks.modrinth.download")}
                            buttonTextMobile={translate("generic.more")}
                        />

                        <DatapackCard
                            href="https://modrinth.com/datapack/neoenchant"
                            asset="/images/background/datapacks/neoenchant.webp"
                            title={translate("datapacks.neoenchant.short")}
                            description={translate("datapacks.neoenchant.description")}
                            buttonText={translate("datapacks.modrinth.download")}
                            buttonTextMobile={translate("generic.more")}
                        />

                        <DatapackCard
                            href="https://modrinth.com/datapack/better-furnace"
                            asset="/images/background/datapacks/better_furnace.webp"
                            title={translate("datapacks.better_furnace.short")}
                            description={translate("datapacks.better_furnace.description")}
                            buttonText={translate("datapacks.modrinth.download")}
                            buttonTextMobile={translate("generic.more")}
                        />
                    </div>
                </div>
            </section>
        </CompoundLayout>
    );
}
