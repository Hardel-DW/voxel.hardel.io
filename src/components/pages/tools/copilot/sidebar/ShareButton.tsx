import Button from "@/components/ui/react/Button";
import { useCopilotStore } from "@/components/pages/tools/copilot/store/DatapackStore";

export default function ShareButton() {
    const handleClick = () => {
        console.debug("----------- DEBUG ------------");
        console.debug(useCopilotStore.getState());
        console.debug("----------- DEBUG ------------");
    };

    return (
        <button type="button" className="w-full bg-zinc-950 rounded-2xl p-4 border-zinc-900 border-t border-l relative z-20">
            <div className="absolute inset-0 -z-10 rotate-180 starting:opacity-0 transition-all duration-500 brightness-20">
                <img src="/images/shine.avif" alt="Shine" />
            </div>
            <div className="flex items-center gap-6">
                <img src="/icons/tools/studio/share.svg" alt="Share" className="w-6 h-6 invert" />
                <div className="flex flex-col items-start text-left">
                    <p className="text-sm font-medium">Share</p>
                    <p className="text-xs text-zinc-400">Share this copilot with your players.</p>
                </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4 border-zinc-700" onClick={handleClick}>
                Share Now
            </Button>
        </button>
    );
}
