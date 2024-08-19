function SongElement(props: { name: string; song: string; index: number }) {
    const filteredName = props.name.split("/").pop();
    if (filteredName === undefined) {
        return null;
    }

    const displayName = filteredName.replace(".ogg", "");
    const capitalized = displayName.charAt(0).toUpperCase() + displayName.slice(1);

    return (
        <li className="flex justify-between items-center w-96 odd:bg-black/35 py-2 px-4 rounded-xl">
            <div className="flex items-center gap-4">
                <p>{props.index + 1}</p>
                <p className="text-lg font-bold">{capitalized}</p>
            </div>
            <div className="size-12 rounded-full bg-white">
                <img src="/icons/play.svg" alt="Play" className="p-3" />
            </div>
        </li>
    );
}
