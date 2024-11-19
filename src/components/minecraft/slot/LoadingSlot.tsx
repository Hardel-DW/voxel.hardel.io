import PlaceHolderItem from "@images/design/item_placeholder.webp";

export default function LoadingSlot() {
    return (
        <span className={"border border-white/20 w-14 h-14 p-[4px] relative hover:bg-zinc-800"}>
            {Math.random() > 0.5 && (
                <img src={PlaceHolderItem.src} alt="Skeleton" height={64} width={64} className="w-full h-full pixelated" />
            )}
        </span>
    );
}
