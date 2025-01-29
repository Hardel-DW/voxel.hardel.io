export default function Tooltip({ children, content }: { children: React.ReactNode; content: React.ReactNode }) {
    return (
        <div className="relative group tooltip-trigger">
            {children}
            <div className="tooltip-content rounded-md border border-zinc-700 bg-zinc-950 px-3 py-1.5 shadow-md transition-opacity duration-300 opacity-0 text-xs text-zinc-400 font-light w-max group-hover:opacity-100 hidden group-hover:block">
                {content}
            </div>
        </div>
    );
}
