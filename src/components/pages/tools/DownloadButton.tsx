import { useTranslate } from "@/components/TranslateContext.tsx";

interface DownloadButtonProps {
    handleDownload: () => Promise<Uint8Array>;
}

export default function DownloadButton({ handleDownload }: DownloadButtonProps) {
    const { translate } = useTranslate();

    const handleCompile = async () => {
        const content = await handleDownload();
        const blob = new Blob([content], { type: "application/zip" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "datapack.zip";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button
            type="button"
            className="bg-white text-white p-2 size-12 rounded-xl border-zinc-950 border-t-2 border-l-2"
            onClick={handleCompile}
            onKeyDown={handleCompile}
        >
            <img src="/icons/download.svg" alt={translate["tools.enchantments.download"]} className="w-auto" />
        </button>
    );
}
