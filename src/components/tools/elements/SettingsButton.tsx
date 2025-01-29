import Button from "@/components/ui/react/Button.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover.tsx";
import { useConfiguratorStore } from "@/lib/store/configuratorStore";

export default function SettingsButton() {
    const name = useConfiguratorStore((state) => state.name);
    const setName = useConfiguratorStore((state) => state.setName);
    const minify = useConfiguratorStore((state) => state.minify);
    const setMinify = useConfiguratorStore((state) => state.setMinify);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button type="button" variant="transparent" size="square" className="bg-zinc-900 border border-zinc-800 select-none">
                    <img src="/icons/settings.svg" alt="settings" className="size-8 invert" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
                <div>
                    <p className="text-xs font-semibold mb-4 pb-2 border-b border-zinc-700">External Configuration</p>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <input
                                type="text"
                                name="datapackName"
                                id="datapackName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
                                placeholder="Enter datapack name..."
                            />
                        </div>

                        <label htmlFor="minify" className="flex items-center justify-between w-full h-16">
                            <div className="flex flex-col w-3/4">
                                <span className="text-white text-sm line-clamp-1">Minify Code</span>
                                <span className="text-xs text-zinc-400 font-light line-clamp-2">
                                    Minify the generated code to reduce the size.
                                </span>
                            </div>
                            <div className="flex items-center gap-4 h-full">
                                <input
                                    type="checkbox"
                                    name="minify"
                                    id="minify"
                                    checked={minify}
                                    onChange={(e) => setMinify(e.target.checked)}
                                />
                            </div>
                        </label>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
