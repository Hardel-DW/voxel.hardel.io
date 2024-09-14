import { useTranslate } from "@/components/TranslateContext.tsx";
import TriangleWave from "@/components/ui/pattern/TriangleWave.tsx";

export type ToolDonationType = {
    type: "Donation";
    title: string;
    link: string;
    description: string;
    image: string;
};

export default function Donation(props: {
    title: string;
    link: string;
    description: string;
    image: string;
}) {
    const { translate } = useTranslate();

    return (
        <div className="w-full h-96 rounded-2xl border-zinc-900 border relative overflow-hidden">
            <div className="opacity-10">
                <TriangleWave />
            </div>
            <div className="absolute top-0 left-0 size-96 bg-gradient-to-b from-pink-950/10 to-pink-950 blur-[20rem] rounded-2xl" />
            <div className="absolute top-0 right-0 size-72 bg-gradient-to-b from-blue-950/10 to-blue-950 blur-[20rem] rounded-2xl" />
            <img className="absolute -top-24 -right-24 size-96 opacity-20" src="/favicon.svg" alt="Voxel Labs" />

            <div className="flex flex-col justify-between h-full p-8">
                <div>
                    <h1 className="text-white text-4xl tracking-wide font-semibold">{translate["tools.supports.title"]}</h1>
                    <p className="text-zinc-400 pt-2 w-3/4">{translate["tools.supports.description"]}</p>
                </div>
                <div className="flex justify-between gap-4">
                    <div>
                        <h3 className="text-white font-bold text-xl pb-4">{translate["tools.supports.advantages"]}</h3>
                        <ul className="*:flex *:items-center *:gap-2 space-y-2">
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">{translate["tools.supports.advantages.early_access"]}</span>
                            </li>
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">{translate["tools.supports.advantages.submit_ideas"]}</span>
                            </li>
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">{translate["tools.supports.advantages.discord_role"]}</span>
                            </li>
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">{translate["tools.supports.advantages.live_voxel"]}</span>
                            </li>
                        </ul>
                    </div>
                    <a
                        className="animate-shimmer bg-[linear-gradient(110deg,#c2410c,45%,#e06040,55%,#c2410c)] bg-[length:200%_100%] hover:scale-95 transition text-white flex items-center gap-4 px-8 py-2 h-fit place-self-end rounded-xl relative z-10"
                        href={props.link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/icons/company/patreon.svg" alt="Patreon" className="w-4 h-4" />
                        {translate["tools.supports.become"]}
                    </a>
                </div>
            </div>
        </div>
    );
}
