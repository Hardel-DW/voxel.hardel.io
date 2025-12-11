import { Button } from "@/components/ui/Button";

interface DatapackCardProps {
    href: string;
    asset: string;
    title: string;
    description: string;
    buttonText: string;
    buttonTextMobile: string;
}

export default function DatapackCard({ href, asset, title, description, buttonText, buttonTextMobile }: DatapackCardProps) {
    return (
        <div
            style={{ backgroundImage: `url('${asset}')` }}
            className="relative w-full aspect-video group border flex flex-col justify-between border-zinc-700 rounded-3xl p-4 bg-cover bg-center">
            <h2 className="absolute -z-10 -top-20 right-0 text-4xl md:text-6xl tracking-wider uppercase font-thin text-zinc-600">
                {title}
            </h2>
            <div className="absolute -z-20 inset-0 translate-x-4 scale-y-110 border border-zinc-700 rounded-3xl" />
            <div className="absolute z-10 inset-0 bg-shadow-bottom" />

            <div className="self-end relative z-20">
                <Button href={href} variant="modrinth" className="shadow-2xl shadow-black">
                    <img src="/icons/company/modrinth.svg" alt="Modrinth" className="w-6 h-6 mr-4" />
                    <p className="hidden md:inline-block">{buttonText}</p>
                    <p className="md:hidden">{buttonTextMobile}</p>
                </Button>
            </div>
            <p className="text-zinc-200 mix-blend-luminosity text-base font-light tracking-wide z-20 px-4 py-2 mt-4 hidden sm:block">
                {description}
            </p>
        </div>
    );
}
