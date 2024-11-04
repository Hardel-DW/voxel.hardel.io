import Button from "@/components/ui/react/Button.tsx";
import TriangleWave from "@/components/ui/pattern/TriangleWave.tsx";
import TranslateText, { type TranslateTextType } from "@/lib/minecraft/components/elements/text/TranslateText.tsx";

export type ToolDonationType = {
    type: "Donation";
    title: TranslateTextType;
    link: string;
    description: TranslateTextType;
    image: string;
};

export default function Donation(props: {
    title: TranslateTextType | string;
    link: string;
    description: TranslateTextType | string;
    image: string;
}) {
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
                    <h1 className="text-white text-4xl tracking-wide font-semibold">
                        <TranslateText
                            content={{
                                type: "translate",
                                value: "tools.supports.title"
                            }}
                        />
                    </h1>
                    <p className="text-zinc-400 pt-2 w-3/4">
                        <TranslateText
                            content={{
                                type: "translate",
                                value: "tools.supports.description"
                            }}
                        />
                    </p>
                </div>
                <div className="flex justify-between gap-4">
                    <div>
                        <h3 className="text-white font-bold text-xl pb-4">
                            <TranslateText
                                content={{
                                    type: "translate",
                                    value: "tools.supports.advantages"
                                }}
                            />
                        </h3>
                        <ul className="*:flex *:items-center *:gap-2 space-y-2">
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">
                                    <TranslateText
                                        content={{
                                            type: "translate",
                                            value: "tools.supports.advantages.early_access"
                                        }}
                                    />
                                </span>
                            </li>
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">
                                    <TranslateText
                                        content={{
                                            type: "translate",
                                            value: "tools.supports.advantages.submit_ideas"
                                        }}
                                    />
                                </span>
                            </li>
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">
                                    <TranslateText
                                        content={{
                                            type: "translate",
                                            value: "tools.supports.advantages.discord_role"
                                        }}
                                    />
                                </span>
                            </li>
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">
                                    <TranslateText
                                        content={{
                                            type: "translate",
                                            value: "tools.supports.advantages.live_voxel"
                                        }}
                                    />
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="grid self-end relative z-10 gap-y-4">
                        <Button target="_blank" rel="noreferrer" href="https://streamelements.com/hardoudou/tip" variant="white-shimmer">
                            <TranslateText
                                content={{
                                    type: "translate",
                                    value: "dialog.footer.donate"
                                }}
                            />
                        </Button>
                        <Button variant="patreon-shimmer" href={props.link} target="_blank" rel="noreferrer">
                            <img src="/icons/company/patreon.svg" alt="Patreon" className="w-4 h-4" />
                            <TranslateText
                                content={{
                                    type: "translate",
                                    value: "tools.supports.become"
                                }}
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
