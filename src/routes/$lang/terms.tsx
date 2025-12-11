import { createFileRoute } from "@tanstack/react-router";
import CompoundLayout from "@/components/layout/CompoundLayout";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/$lang/terms")({
    component: TermsPage,
    head: ({ params }) => {
        const translate = t(params.lang);
        return {
            meta: [{ title: translate("terms.title") }, { name: "description", content: translate("terms.description") }]
        };
    }
});

function TermsPage() {
    const { lang } = Route.useParams();
    const translate = t(lang);

    return (
        <CompoundLayout>
            <div className="absolute rounded-full w-3/4 h-1/2 bg-linear-to-r from-[#401727] to-[#311e7696] opacity-20 blur-[10rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="my-48 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-6">{translate("terms.heading")}</h1>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section1.title")}</h2>
                        <p className="mb-4">{translate("terms.section1.text1")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section2.title")}</h2>
                        <p className="mb-4">{translate("terms.section2.text1")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section3.title")}</h2>
                        <p className="mb-4">{translate("terms.section3.text1")}</p>
                        <p className="mb-4">{translate("terms.section3.text2")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section4.title")}</h2>
                        <p className="mb-4">{translate("terms.section4.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("terms.section4.list1")}</li>
                            <li>{translate("terms.section4.list2")}</li>
                            <li>{translate("terms.section4.list3")}</li>
                            <li>{translate("terms.section4.list4")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section5.title")}</h2>
                        <p className="mb-4">{translate("terms.section5.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("terms.section5.list1")}</li>
                            <li>{translate("terms.section5.list2")}</li>
                            <li>{translate("terms.section5.list3")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section6.title")}</h2>
                        <p className="mb-4">{translate("terms.section6.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("terms.section6.list1")}</li>
                            <li>{translate("terms.section6.list2")}</li>
                            <li>{translate("terms.section6.list3")}</li>
                            <li>{translate("terms.section6.list4")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section7.title")}</h2>
                        <p className="mb-4">{translate("terms.section7.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("terms.section7.list1")}</li>
                            <li>{translate("terms.section7.list2")}</li>
                            <li>{translate("terms.section7.list3")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section8.title")}</h2>
                        <p className="mb-4">{translate("terms.section8.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("terms.section8.list1")}</li>
                            <li>{translate("terms.section8.list2")}</li>
                            <li>{translate("terms.section8.list3")}</li>
                            <li>{translate("terms.section8.list4")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section9.title")}</h2>
                        <p className="mb-4">{translate("terms.section9.intro")}</p>
                        <ul className="list-disc ml-6 mb-4">
                            <li>{translate("terms.section9.list1")}</li>
                            <li>{translate("terms.section9.list2")}</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section10.title")}</h2>
                        <p className="mb-4">{translate("terms.section10.text1")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section11.title")}</h2>
                        <p className="mb-4">{translate("terms.section11.text1")}</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{translate("terms.section12.title")}</h2>
                        <p className="mb-4">{translate("terms.section12.text1")}</p>
                    </section>
                </div>
            </div>
        </CompoundLayout>
    );
}
