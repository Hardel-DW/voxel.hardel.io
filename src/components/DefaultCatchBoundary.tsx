import type { ErrorComponentProps } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import SimpleLayout from "./layout/SimpleLayout";
import { Button } from "./ui/Button";
import { t } from "@/lib/i18n";

export default function DefaultCatchBoundary({ error }: ErrorComponentProps) {
    const params = useParams({ strict: false });
    const lang = (params as { lang?: string }).lang || "en-us";
    const translate = t(lang);

    return (
        <SimpleLayout>
            <div className="relative z-10 px-8 py-12 w-full max-w-3xl mx-auto">
                <h1 className="text-6xl font-bold text-white mb-4">{translate("error.title")}</h1>
                <p className="text-xl text-zinc-400 mb-12">
                    {translate("error.description")}
                </p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-left mb-8">
                    <p className="text-sm text-zinc-400 font-mono ">{error.message || translate("error.title")}</p>
                </div>
                <Button to="/" variant="black" className="w-full shimmer-neutral-950 border-zinc-800 hover:shimmer-neutral-900">
                    {translate("error.go_home")}
                </Button>
            </div>
        </SimpleLayout>
    );
}
