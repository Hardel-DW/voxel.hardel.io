import { useTranslate } from "@/lib/hook/useTranslate";
import { useConfiguratorStore } from "@/components/tools/Store";

export default function SettingsDialog() {
    const { t } = useTranslate();
    const name = useConfiguratorStore((state) => state.name);
    const isJar = useConfiguratorStore((state) => state.isJar);

    return (
        <>
            <div className="py-2">
                <span className="font-semibold text-zinc-400">{`${name}.${isJar ? "jar" : "zip"}`}</span>
            </div>
            <div className="h-1 w-full bg-zinc-700 rounded-full" />
            <div className="pt-8">
                <h4 className="font-semibold">{t("dialog.success.additional_info_title")}</h4>
                <ul className="list-disc list-inside pt-4 space-y-2 pl-4">
                    <li>
                        <span className="font-light">{t("dialog.success.additional_info")}</span>
                    </li>
                </ul>
            </div>
        </>
    );
}
