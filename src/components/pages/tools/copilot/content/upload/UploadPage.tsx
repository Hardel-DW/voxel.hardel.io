import UploadButton from "@/components/pages/tools/copilot/content/upload/UploadButton";
import { useCopilotStore } from "@/components/pages/tools/copilot/store/DatapackStore";
import ToastBoundary from "@/components/tools/elements/error/ToastBoundary";
import { useTranslate } from "@/lib/hook/useTranslate";

export default function UploadPage() {
    const { t } = useTranslate();
    const elements = useCopilotStore((state) => state.elements);
    if (elements.size > 0) return null;

    return (
        <ToastBoundary i18n={t}>
            <div className="flex items-center justify-center h-full relative">
                <svg className="size-full -z-10 absolute stroke-zinc-500/20 [mask-image:radial-gradient(white,transparent_70%)] [stroke-dasharray:5_6] [stroke-dashoffset:10] stroke-6">
                    <title>Triangle Wave</title>
                    <defs>
                        <pattern id="grid" viewBox="0 0 64 64" width="32" height="32" patternUnits="userSpaceOnUse" x="0" y="0">
                            <path d="M64 0H0V64" fill="none" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" strokeWidth="0" />
                </svg>

                <div className="w-1/3 space-y-8">
                    <div className="flex items-center gap-4 px-4">
                        <img src="/icons/logo.svg" alt="Voxel Copilot" className="w-10 h-10" />
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold">Voxel Copilot</h1>
                            <p className="text-sm text-gray-500">Upload your datapack to get started.</p>
                        </div>
                    </div>
                    <UploadButton />
                </div>
            </div>
        </ToastBoundary>
    );
}
