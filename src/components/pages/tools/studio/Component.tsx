export default function Sidebar() {
    return (
        <div style={{ width: "350px" }} className="fixed right-0 top-0 flex flex-col z-10 p-4 backdrop-blur-sm">
            <div className="overflow-hidden -mr-2 pr-2" style={{ flex: 1 }}>
                <div className="relative size-full px-2 border-zinc-800 border-t border-b bg-header-translucent rounded-2xl shadow-black">
                    <div className="overflow-y-auto mt-2" style={{ flex: 1, height: "calc(100% - 56px)" }}>
                        <div className="flex flex-col gap-x-8 px-2 justify-between">
                            <h2 className="text-2xl py-2 font-semibold text-center">Voxel Studio</h2>
                            <div className="h-1 w-full bg-zinc-800 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
