import type { Identifier } from "@/lib/minecraft/core/Identifier";

export default function Reference(props: { reference: Identifier }) {
    return (
        <div className="h-full rounded-2xl bg-zinc-950 border-zinc-900 border px-2 py-px">
            <p className="text-white/50">{props.reference.renderFilename()}</p>
        </div>
    );
}
