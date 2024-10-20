import { useStudioContext } from "@/components/pages/tools/studio/StudioContext.tsx";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";
import type { BlueprintObject, LinkObject, TemporaryLinkObject } from "./types";

export default function Sidebar() {
    const [width, setWidth] = useState(350);
    const { position, gridObjects, zoom } = useStudioContext();
    const blueprints = gridObjects.filter((obj): obj is BlueprintObject => obj.type === "blueprint");
    const links = gridObjects.filter((obj): obj is LinkObject => obj.type === "link");
    const tmpLinks = gridObjects.filter((obj): obj is TemporaryLinkObject => obj.type === "tmp_link");

    return (
        <>
            <div
                style={{ width: width }}
                className={cn("flex-shrink-0 overflow-hidden relative z-20 h-full container-type transition-[width] ease-in-out xl:py-4", {
                    "pl-4": width > 0
                })}
            >
                <div style={{ width: "350px" }} className="flex flex-col h-full z-10 px-4 md:pl-0 md:pt-0 pt-4 backdrop-blur-sm">
                    <div className="overflow-hidden -mr-2 pr-2" style={{ flex: 1 }}>
                        <div className="relative size-full px-2 border-zinc-800 border-t border-b bg-header-translucent rounded-2xl shadow-black">
                            <div className="overflow-y-auto mt-2" style={{ flex: 1, height: "calc(100% - 56px)" }}>
                                <div className="flex flex-col gap-x-8 px-2 justify-between">
                                    <h2 className="text-2xl py-2 font-semibold text-center">Voxel Studio</h2>
                                    <div className="h-1 w-full bg-zinc-800 rounded-full" />
                                    <p className="mt-4">
                                        Canvas Position: X: {Math.round(position.x)}, Y: {Math.round(position.y)}
                                    </p>
                                    <p>Zoom: {zoom}</p>
                                    <h3 className="mt-4 text-lg font-semibold">Blueprints:</h3>
                                    <ul>
                                        {blueprints.map((bp) => (
                                            <li key={bp.id}>
                                                Blueprint {bp.id}: X: {Math.round(bp.position.x)}, Y: {Math.round(bp.position.y)}
                                            </li>
                                        ))}
                                    </ul>

                                    <h3 className="mt-4 text-lg font-semibold">Links:</h3>
                                    <ul>
                                        {links.map((link) => (
                                            <li key={link.id}>
                                                {link.sourceId} - {link.targetId} With Positions: {link.position.x}, {link.position.y} -{" "}
                                                {link.endPosition.x}, {link.endPosition.y}
                                            </li>
                                        ))}
                                    </ul>

                                    <h3 className="mt-4 text-lg font-semibold">Temporary Links:</h3>
                                    <ul>
                                        {tmpLinks.map((link) => (
                                            <li key={link.id}>
                                                Temporary Link {link.sourceId} - {link.position.x}, {link.position.y}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed p-4 bottom-0 right-0 flex flex-col gap-4">
                <button
                    type="button"
                    onClick={() => setWidth(width === 350 ? 0 : 350)}
                    className="bg-header-cloudy text-white p-2 size-12 rounded-xl border-zinc-700 border-t border-l"
                >
                    {width === 350 ? "<<" : ">>"}
                </button>
            </div>
        </>
    );
}
