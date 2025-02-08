import { useTranslate } from "@/lib/hook/useTranslate";
import { cn } from "@/lib/utils.ts";
import { type CategorySound, getCategory, searchSound } from "@voxelio/breeze/net";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export default function ToolSound() {
    const { t } = useTranslate();
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<CategorySound[]>([]);
    const [result, setResult] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [sound, setSound] = useState<string>("");
    const [currentCategory, setCurrentCategory] = useState<CategorySound | null>(null);
    const [scroll, setScroll] = useState<number>(0);
    const refOuter = useRef<HTMLUListElement>(null);
    const refInner = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLoading(true);
        const soundPromise = searchSound();
        const categoryPromise = getCategory();
        const promise = Promise.all([soundPromise, categoryPromise]);
        promise.then(([result, category]) => {
            setResult(result);
            setCategory(category);
        });
        promise.finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        const entries = Object.entries(result);

        const filteredByCategory = entries.filter(([name]) => {
            const value = name.split("/").slice(0, -1).join("/");
            if (!currentCategory) return true;
            const category = currentCategory.category.split("/").slice(1).join("/");

            return currentCategory ? value.includes(category) : true;
        });

        const filteredBySearch = filteredByCategory.filter(([key]) => key.includes(search));

        const limitedResults = filteredBySearch.slice(0, 30);

        return Object.fromEntries(limitedResults);
    }, [result, currentCategory, search]);

    const handlePlaySound = (song: string) => {
        setSound(song);
        const baseSongUrl = "https://resources.download.minecraft.net";
        const songUrl = `${baseSongUrl}/${song.substring(0, 2)}/${song}`;

        const audio = new Audio(songUrl);
        audio.play().catch((error) => {
            toast.error(t("tools.sound.error"));
            console.error("Error playing sound:", error);
        });
    };

    const handleScroll = (direction: string) => {
        const scrollWidth = 200;
        if (direction === "left") {
            if (scroll <= 0) return;
            setScroll(scroll - scrollWidth);
        } else {
            const container = refOuter.current;
            const element = refInner.current;
            if (!element || !container) return;

            if (container.scrollWidth - element.clientWidth < scrollWidth) return;
            setScroll(scroll + scrollWidth);
        }
    };

    const handleCategory = (value: CategorySound) => {
        if (value.name === currentCategory?.name) {
            setCurrentCategory(null);
            return;
        }

        setCurrentCategory(value);
    };

    return (
        <div>
            <h1 className="text-xl font-semibold pb-4">{t("tools.sound.search")}</h1>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-400" />
                </div>
            ) : (
                <div className="grid gap-8 py-8 relative">
                    <img
                        src="/icons/chevron-right.svg"
                        alt="Right"
                        className="absolute cursor-pointer top-9 invert size-8 -right-12"
                        onClick={() => handleScroll("right")}
                        onKeyUp={() => handleScroll("right")}
                    />
                    <img
                        src="/icons/chevron-left.svg"
                        alt="Left"
                        className="absolute cursor-pointer top-9 invert size-8 -left-12"
                        onClick={() => handleScroll("left")}
                        onKeyUp={() => handleScroll("left")}
                    />
                    <ul className="overflow-hidden" ref={refOuter}>
                        <div
                            ref={refInner}
                            className="flex gap-4 transition-[translate]"
                            style={{
                                translate: `-${scroll}px`
                            }}>
                            {category.map((sound) => (
                                <li
                                    key={sound.name}
                                    className={cn("cursor-pointer px-4 py-2 rounded-xl bg-zinc-800 transition", {
                                        "bg-rose-900": sound.name === currentCategory?.name,
                                        "hover:bg-zinc-900": sound.name !== currentCategory?.name
                                    })}
                                    onClick={() => handleCategory(sound)}
                                    onKeyUp={() => handleCategory(sound)}>
                                    {sound.name}
                                </li>
                            ))}
                        </div>
                    </ul>
                    <ul className="grid grid-cols-3 gap-4 items-center">
                        {filtered &&
                            Object.entries(filtered).map(([name, song], index) => (
                                <li
                                    key={name}
                                    className={cn("w-full flex justify-between items-center odd:bg-black/35 py-2 px-4 rounded-xl", {
                                        "ring-2 ring-rose-900": song === sound
                                    })}>
                                    <div className="flex items-center gap-4">
                                        <p>{index + 1}</p>
                                        <div>
                                            <p className="text-lg font-bold">{parseName(name)}</p>
                                            <p className="text-sm text-gray-400">{name.replace("/sounds/", ":").replace(".ogg", "")}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="size-12 rounded-full bg-white hover:bg-gray-200 cursor-pointer"
                                        onClick={() => handlePlaySound(song)}
                                        onKeyUp={() => handlePlaySound(song)}
                                        type="button"
                                        tabIndex={0}>
                                        <img src="/icons/play.svg" alt="Play" className="p-3" />
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

function parseName(name: string) {
    const filteredName = name.split("/").pop();
    if (filteredName === undefined) {
        return null;
    }

    const displayName = filteredName
        .replace(".ogg", "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

    return displayName.replace(/([a-zA-Z])([0-9])/g, "$1 $2");
}
