export function Balancing({ currentValue, newValue, icon }: { currentValue?: number; newValue?: number; icon?: string }) {
    return (
        <span className="bg-zinc-950 px-2 md:px-4 rounded-xl inline-flex items-center gap-1.5 md:gap-2 ml-1 md:ml-2 text-sm md:text-base">
            {icon && <img src={icon} alt="icon" className="size-4! bg-transparent! border-none! rounded-none! m-0!" />}
            <span>
                <s>{currentValue}</s>
            </span>
            <span className="mx-1">→</span>
            <span className={newValue && currentValue && newValue > currentValue ? "text-green-500" : "text-red-500"}>{newValue}</span>
        </span>
    );
}
