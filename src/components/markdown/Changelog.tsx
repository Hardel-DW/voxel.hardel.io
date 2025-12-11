const changelogItems = [
    { icon: "/icons/tools/max_level.svg", alt: "level", label: "The maximum level" },
    { icon: "/icons/tools/anvil.svg", alt: "anvil", label: "The fusion cost in anvil" },
    { icon: "/icons/tools/weight.svg", alt: "weight", label: "Rarity higher value means more common" }
];

export function Changelog({ children, name }: { children?: React.ReactNode; name?: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/30 px-6 my-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-0! my-4">
                <h3 className="text-base text-white m-0! p-0!">
                    {name}
                </h3>

                <div className="flex justify-start md:justify-end gap-x-6 gap-y-2 items-center flex-wrap w-full md:w-auto">
                    {changelogItems.map((item) => (
                        <div key={item.alt} className="flex items-center gap-2">
                            <img src={item.icon} alt={item.alt} className="size-5 m-0! bg-transparent! border-none! rounded-none!" />
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
