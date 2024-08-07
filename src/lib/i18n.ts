import { getCollection, getEntry } from "astro:content";

export const getTranslations = async (url: URL) => {
    const [, lang] = url.pathname.split("/");
    const verifiedLang = names.some((element) => element.lang === lang) ? lang : "en-us";
    return await getTranslationFromLang(verifiedLang);
};

export const getTranslationFromLang = async (lang: string) => {
    const content = await getEntry("i18n", lang);
    if (!content) throw new Error(`Language ${lang} not found`);

    return {
        lang: content.id,
        translate: content.data.translations
    };
};

export const names = (await getCollection("i18n")).map((i) => ({ lang: i.id, name: i.data.name }));
