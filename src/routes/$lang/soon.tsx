import { createFileRoute } from "@tanstack/react-router";
import CompoundLayout from "@/components/layout/CompoundLayout";
import { Button } from "@/components/ui/Button";
import { DashedPattern } from "@/components/ui/DashedPattern";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/soon")({
    component: SoonPage,
    head: ({ params }) => {
        const translate = t(params.lang);
        return {
            meta: [{ title: translate("soon.seo.title") }, { name: "description", content: translate("soon.seo.description") }]
        };
    }
});

function SoonPage() {
    const { lang } = Route.useParams();
    const translate = t(lang);

    return (
        <CompoundLayout>
            <div className="relative h-dvh max-w-full flex justify-center items-center container mx-auto">
                <DashedPattern />
                <div>
                    <h1 className="font-bold text-white text-center" style={{ fontSize: "clamp(3.5rem, 7dvw, 12rem)", lineHeight: "1" }}>
                        {translate("soon.title")}
                    </h1>
                    <div className="max-w-full w-1/2 mx-auto mt-6">
                        <p className="text-base lg:text-2xl font-medium mt-4 text-zinc-500 text-center">{translate("soon.description")}</p>
                        <div className="mt-10 *:w-full grid xl:grid-cols-2 gap-y-4 gap-x-8">
                            <Button size="xl">{translate("generic.back")}</Button>
                            <Button size="xl" variant="ghost">
                                {translate("generic.contact_us")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </CompoundLayout>
    );
}
