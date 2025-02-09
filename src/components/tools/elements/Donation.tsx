import TriangleWave from "@/components/ui/react/geometry/TriangleWave";
import Button from "@/components/ui/react/Button.tsx";
import { translate } from "@/lib/hook/useTranslate";
import type { ToolDonationType } from "@voxelio/breeze/core";

export default function Donation({ component }: { component: ToolDonationType }) {
    return (
        <div className="w-full rounded-2xl border-zinc-900 border relative overflow-hidden">
            <div className="opacity-10">
                <TriangleWave />
            </div>
            <div className="absolute top-0 left-0 size-96 bg-linear-to-b from-pink-950/10 to-pink-950 blur-[20rem] rounded-2xl" />
            <div className="absolute top-0 right-0 size-72 bg-linear-to-b from-blue-950/10 to-blue-950 blur-[20rem] rounded-2xl" />
            <img className="absolute -top-24 -right-24 size-96 opacity-20" src="/icons/logo.svg" alt="Voxel Labs" />

            <div className="flex flex-col justify-between h-full p-8">
                <div>
                    <h1 className="text-white text-4xl tracking-wide font-semibold">
                        {translate({
                            type: "translate",
                            value: "tools.supports.title"
                        })}
                    </h1>
                    <p className="text-zinc-400 pt-2 w-full lg:w-3/4">
                        {translate({
                            type: "translate",
                            value: "tools.supports.description"
                        })}
                    </p>
                </div>
                <div className="xl:flex justify-between gap-4 mt-4">
                    <div>
                        <h3 className="text-white font-bold text-xl pb-4">
                            {translate({
                                type: "translate",
                                value: "tools.supports.advantages"
                            })}
                        </h3>
                        <ul className="*:flex *:items-center *:gap-2 space-y-2">
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">
                                    {translate({
                                        type: "translate",
                                        value: "tools.supports.advantages.early_access"
                                    })}
                                </span>
                            </li>
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">
                                    {translate({
                                        type: "translate",
                                        value: "tools.supports.advantages.submit_ideas"
                                    })}
                                </span>
                            </li>
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">
                                    {translate({
                                        type: "translate",
                                        value: "tools.supports.advantages.discord_role"
                                    })}
                                </span>
                            </li>
                            <li>
                                <img src="/icons/check.svg" alt="check" className="w-4 h-4 invert" />
                                <span className="text-zinc-300 font-semibold">
                                    {translate({
                                        type: "translate",
                                        value: "tools.supports.advantages.live_voxel"
                                    })}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex lg:flex-row flex-col lg:flex-none self-end relative z-10 gap-4 pt-8">
                        <Button
                            className="w-full flex-1 px-8"
                            target="_blank"
                            rel="noreferrer"
                            href="https://streamelements.com/hardoudou/tip"
                            variant="white-shimmer">
                            {translate({
                                type: "translate",
                                value: "dialog.footer.donate"
                            })}
                        </Button>
                        <Button
                            className="w-full flex-1 px-8"
                            variant="patreon-shimmer"
                            href={component.link}
                            target="_blank"
                            rel="noreferrer">
                            <img src="/icons/company/patreon.svg" alt="Patreon" className="w-4 h-4" />
                            {translate({
                                type: "translate",
                                value: "tools.supports.become"
                            })}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
