import { Identifier, type IdentifierObject } from "@voxelio/breeze";

export default function EnchantmentElement(props: { identifier: IdentifierObject }) {
    const id = new Identifier(props.identifier);
    return (
        <p className="text-sm text-gray-400 p-1 rounded-xl px-4 transition-all cursor-pointer hover:text-white hover:ring-1 hover:ring-zinc-700">
            {id.toResourceName()}
        </p>
    );
}
