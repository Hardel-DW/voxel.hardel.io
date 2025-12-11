export function Changelog({ children }: { children?: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 my-6">
            <div className="flex justify-evenly gap-4 py-4 items-center flex-wrap">
                <div className="flex items-center gap-4">
                    <img src="/icons/tools/max_level.svg" alt="level" className="size-8 invert my-0!" />
                    <span className="text-zinc-400 font-bold text-xs"> The maximum level </span>
                </div>

                <div className="flex items-center gap-4">
                    <img src="/icons/tools/anvil.svg" alt="anvil" className="size-8 invert my-0!" />
                    <span className="text-zinc-400 font-bold text-xs">
                        The fusion cost in anvil
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <img src="/icons/tools/weight.svg" alt="weight" className="size-8 invert my-0!" />
                    <span className="text-zinc-400 font-bold text-xs">
                        Rarity higher value means more common
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {children}
            </div>
        </div>
    );
}