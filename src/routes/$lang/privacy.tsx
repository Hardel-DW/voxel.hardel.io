import { createFileRoute } from "@tanstack/react-router";
import CompoundLayout from "@/components/layout/CompoundLayout";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/privacy")({
    component: PrivacyPage,
    head: ({ params }) => {
        const translate = t(params.lang);
        return {
            meta: [{ title: translate("privacy.title") }, { name: "description", content: translate("privacy.description") }]
        };
    }
});

function PrivacyPage() {
    const { lang } = Route.useParams();
    const translate = t(lang);

    return (
        <CompoundLayout>
            <div className="absolute rounded-full w-3/4 h-1/2 bg-linear-to-r from-[#401727] to-[#311e7696] opacity-20 blur-[10rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="my-48 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-6">{translate("privacy.heading")}</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("privacy.section1.title")}</h2>
                        <p className="mb-4">{translate("privacy.section1.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("privacy.section1.list1")}</li>
                            <li>{translate("privacy.section1.list2")}</li>
                            <li>{translate("privacy.section1.list3")}</li>
                            <li>{translate("privacy.section1.list4")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("privacy.section2.title")}</h2>
                        <p className="mb-4">{translate("privacy.section2.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("privacy.section2.list1")}</li>
                            <li>{translate("privacy.section2.list2")}</li>
                            <li>{translate("privacy.section2.list3")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("privacy.section3.title")}</h2>
                        <p className="mb-4">{translate("privacy.section3.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("privacy.section3.list1")}</li>
                            <li>{translate("privacy.section3.list2")}</li>
                            <li>{translate("privacy.section3.list3")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("privacy.section4.title")}</h2>
                        <p className="mb-4">{translate("privacy.section4.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("privacy.section4.list1")}</li>
                            <li>{translate("privacy.section4.list2")}</li>
                            <li>{translate("privacy.section4.list3")}</li>
                            <li>{translate("privacy.section4.list4")}</li>
                            <li>{translate("privacy.section4.list5")}</li>
                        </ul>
                        <p>{translate("privacy.section4.text1")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("privacy.section5.title")}</h2>
                        <p className="mb-4">{translate("privacy.section5.text1")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("privacy.section6.title")}</h2>
                        <p className="mb-4">{translate("privacy.section6.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("privacy.section6.list1")}</li>
                            <li>{translate("privacy.section6.list2")}</li>
                            <li>{translate("privacy.section6.list3")}</li>
                            <li>{translate("privacy.section6.list4")}</li>
                            <li>{translate("privacy.section6.list5")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("privacy.section7.title")}</h2>
                        <p className="mb-4">{translate("privacy.section7.text1")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("privacy.section8.title")}</h2>
                        <p className="mb-4">{translate("privacy.section8.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("privacy.section8.list1")}</li>
                        </ul>
                    </section>
                </div>
            </div>
        </CompoundLayout>
    );
}
