import { createFileRoute } from "@tanstack/react-router";
import CompoundLayout from "@/components/layout/CompoundLayout";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/legal")({
    component: LegalPage,
    head: ({ params }) => {
        const translate = t(params.lang);
        return {
            meta: [{ title: translate("legal.title") }, { name: "description", content: translate("legal.description") }]
        };
    }
});

function LegalPage() {
    const { lang } = Route.useParams();
    const translate = t(lang);

    return (
        <CompoundLayout>
            <div className="absolute rounded-full w-3/4 h-1/2 bg-linear-to-r from-[#401727] to-[#311e7696] opacity-20 blur-[10rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="my-48 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-6">{translate("legal.heading")}</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("legal.section1.title")}</h2>
                        <p>{translate("legal.section1.text1")}</p>
                        <p>{translate("legal.section1.text2")}</p>
                        <p>{translate("legal.section1.text3")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("legal.section2.title")}</h2>
                        <p>{translate("legal.section2.text1")}</p>
                        <p>{translate("legal.section2.text2")}</p>
                        <p>{translate("legal.section2.text3")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("legal.section3.title")}</h2>
                        <p>{translate("legal.section3.text1")}</p>
                        <ul>
                            <li>
                                <a href="https://www.cloudflare.com/fr-fr/">Cloudflare</a>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("legal.section4.title")}</h2>
                        <p>{translate("legal.section4.text1")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("legal.section5.title")}</h2>
                        <p>{translate("legal.section5.text1")}</p>
                        <p>{translate("legal.section5.text2")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("legal.section6.title")}</h2>
                        <p>{translate("legal.section6.text1")}</p>
                    </section>
                </div>
            </div>
        </CompoundLayout>
    );
}
