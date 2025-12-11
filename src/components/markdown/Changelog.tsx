const changelogItems = [
    { icon: "/icons/tools/max_level.svg", alt: "level", label: "The maximum level" },
    { icon: "/icons/tools/anvil.svg", alt: "anvil", label: "The fusion cost in anvil" },
    { icon: "/icons/tools/weight.svg", alt: "weight", label: "Rarity higher value means more common" }
]

export function Changelog({ children, name }: { children?: React.ReactNode; name?: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/30 px-6 my-6">
            <div className="flex justify-between items-center p-0!">
                <h3 className="font-minecraft! font-extralight! text-base! text-white bg-transparent! border-none! rounded-none! m-0! p-0!">{name}</h3>

                <div className="flex justify-end gap-8 items-center flex-wrap" >
                    {changelogItems.map((item) => (
                        <div key={item.alt} className="flex items-center gap-2">
                            <img src={item.icon} alt={item.alt} className="size-5 bg-transparent! border-none! rounded-none!" />
                            <span className="text-zinc-400 font-bold text-[10px] whitespace-nowrap">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="mt-0! mb-4!" />

            {children}
        </div>
    );
}