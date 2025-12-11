const newEnchantIcons = [
    { icon: "/icons/tools/max_level.svg", alt: "level" },
    { icon: "/icons/tools/anvil.svg", alt: "anvil" },
    { icon: "/icons/tools/weight.svg", alt: "weight" }
];

export function NewEnchant(props: { icon?: string; max_level?: number; anvil_cost?: number; rarity?: number }) {
    const values = [props.max_level, props.anvil_cost, props.rarity];

    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/30 px-6 my-6">
            <div className="flex flex-col md:flex-row items-center justify-between md:justify-evenly gap-6 md:gap-2 text-center md:text-left">
                <div className="flex items-center gap-3">
                    <img src={props.icon} alt="icon" className="size-10 md:size-8 bg-transparent! border-none! rounded-none!" />
                    <span className="text-zinc-400 font-bold text-lg md:text-xl">
                        {props.icon
                            ? (props.icon.split("/").pop()?.charAt(0).toUpperCase() ?? "") +
                              (props.icon.split("/").pop()?.slice(1).replace(".webp", "") ?? "")
                            : "Icon not found"}
                    </span>
                </div>
                <div className="hidden md:block w-px h-10 bg-white/10"></div>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                    {newEnchantIcons.map((item, index) => (
                        <span key={item.alt} className="text-zinc-400 font-bold text-lg md:text-xl flex items-center gap-2">
                            <img src={item.icon} alt={item.alt} className="size-6 md:size-8 bg-transparent! border-none! rounded-none!" />
                            {values[index]}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
