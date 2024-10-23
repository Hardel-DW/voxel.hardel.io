import type { LevelBasedValue as LevelBasedValueType } from "@voxel/definitions";

interface Props {
    element: LevelBasedValueType | number;
    title: string;
}

export default function LevelBasedValue({ element, title }: Props) {
    if (typeof element === "number") {
        return (
            <div className="flex items-center gap-4">
                <span className="text-gray-300 font-semibold">Constant</span>
                <input type="number" value={element} />
            </div>
        );
    }

    if ("type" in element && element.type === "minecraft:constant") {
        return (
            <div className="flex items-center gap-4">
                <span className="text-gray-300 font-semibold">Constant</span>
                <input type="number" value={element.value} />
            </div>
        );
    }

    if ("type" in element && element.type === "minecraft:clamped") {
        return (
            <div className="flex items-center gap-4">
                <span className="text-gray-300 font-semibold">Clamped</span>
                <LevelBasedValue element={element.value} title={title} />
                <span className="text-gray-500 flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300">Min</span>
                        <input type="number" value={element.min} />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-300">Max</span>
                        <input type="number" value={element.max} />
                    </div>
                </span>
            </div>
        );
    }

    if ("type" in element && element.type === "minecraft:fraction") {
        return (
            <div className="flex items-center gap-4">
                <span className="text-gray-300 font-semibold">Fraction</span>
                <div className="flex items-center gap-4">
                    <LevelBasedValue element={element.numerator} title={title} />
                </div>
                <div className="flex items-center gap-4">
                    <LevelBasedValue element={element.denominator} title={title} />
                </div>
            </div>
        );
    }

    if ("type" in element && element.type === "minecraft:levels_squared") {
        return (
            <div className="flex items-center gap-4">
                <span className="text-gray-300 font-semibold">Levels Squared</span>
                <div className="flex items-center gap-4">
                    <span className="text-gray-300">Added</span>
                    <input type="number" value={element.added} />
                </div>
            </div>
        );
    }

    if ("base" in element && "per_level_above_first" in element) {
        return (
            <div className="flex flex-col w-full">
                <span className="text-gray-300 font-semibold text-sm w-fit bg-black/50 p-2 rounded-t-xl">{title} - Linear Value</span>
                <div className="grid items-center gap-4 bg-black/50 p-2 rounded-xl rounded-tl-none w-full">
                    <div className="flex items-center gap-4 relative">
                        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center p-1">
                            <span className="text-gray-300 text-nowrap flex items-center justify-center  rounded-md bg-zinc-950 px-4 h-full">
                                First Level
                            </span>
                        </div>
                        <input className="w-96" type="number" value={element.base} />
                    </div>
                    <div className="flex items-center gap-4 relative">
                        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center p-1">
                            <span className="text-gray-300 text-nowrap flex items-center justify-center rounded-md bg-zinc-950 px-4 h-full">
                                Per Level Above First
                            </span>
                        </div>
                        <input type="number" value={element.per_level_above_first} />
                    </div>
                </div>
            </div>
        );
    }

    if ("type" in element && element.type === "minecraft:lookup") {
        return (
            <div className="flex flex-col w-full">
                <span className="text-gray-300 font-semibold text-sm w-fit bg-black/50 p-2 rounded-t-xl">{title} - Hardcoded values</span>
                <div className="grid items-center gap-4 bg-black/50 p-2 rounded-xl rounded-tl-none w-full">
                    <div className="flex flex-col gap-4 relative">
                        <div className="flex flex-col gap-4 w-full">
                            {element.values.map((value, index) => (
                                <div className="flex items-center gap-4 text-nowrap relative" key={index.toString()}>
                                    <input key={index.toString()} type="number" value={value} />
                                    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center p-1">
                                        <span className="text-gray-300 text-nowrap flex items-center justify-center  rounded-md bg-zinc-950 px-4 h-full">
                                            Level {index + 1}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-zinc-700 pt-4 border-t">
                            {element.fallback && (
                                <div className="flex items-center gap-4 text-nowrap relative">
                                    <LevelBasedValue element={element.fallback} title={title} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 ring-0 ring-gray-700 transition-all hover:ring-1 p-6 rounded-xl text-red-400">Unknown Value Type</div>
    );
}
