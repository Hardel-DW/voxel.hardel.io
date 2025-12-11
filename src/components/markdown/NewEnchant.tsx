const newEnchantIcons = [
    { icon: "/icons/tools/max_level.svg", alt: "level" },
    { icon: "/icons/tools/anvil.svg", alt: "anvil" },
    { icon: "/icons/tools/weight.svg", alt: "weight" }
]

export function NewEnchant({ icon, max_level, anvil_cost, rarity }: { icon?: string; max_level?: number; anvil_cost?: number; rarity?: number }) {
    const values = [max_level, anvil_cost, rarity];

    return (
        <div className="rounded-2xl border border-white/10 bg-zinc-900/30 px-6 my-6">
            <div className="flex items-center justify-evenly gap-2">
                <div className="flex items-center gap-2">
                    <img src={icon} alt="icon" className="size-8 bg-transparent! border-none! rounded-none!" />
                    <span className="text-zinc-400 font-bold text-xl">
                        {icon ? (icon.split('/').pop()?.charAt(0).toUpperCase() ?? '') + (icon.split('/').pop()?.slice(1).replace('.webp', '') ?? '') : 'Icon not found'}
                    </span>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                {newEnchantIcons.map((item, index) => (
                    <span key={item.alt} className="text-zinc-400 font-bold text-xl flex items-center gap-2">
                        <img src={item.icon} alt={item.alt} className="size-8 bg-transparent! border-none! rounded-none!" />
                        {values[index]}
                    </span>
                ))}
            </div>
        </div>
    );
}