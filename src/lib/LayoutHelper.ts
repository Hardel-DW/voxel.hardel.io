export interface BaseLayoutProps {
    title?: string;
    description?: string;
    openGraph?: {
        title?: string;
        description?: string;
        image?: string;
    };
}

type LayoutHelperProps = {
    site: URL;
    url: URL;
};

const defaultTitle = "Voxel";
const defaultDescription = {
    "en-us":
        "Voxel, a personal project, created by a passionate. The goal is to share knowledge and tools to help you develop your own creations.",
    "fr-fr":
        "Voxel est un projet personnel qui a été créé par un passionné. L'objectif est de partager mes connaissances ainsi que des outils pour vous aider à développer vos propres contenu."
};
const defaultOG = {
    title: defaultTitle,
    description: defaultDescription["en-us"],
    image: "/opengraph.webp"
};

export class LayoutHelper implements BaseLayoutProps, LayoutHelperProps {
    site: URL;
    url: URL;
    lang: keyof typeof defaultDescription;
    title = defaultTitle;
    description = defaultDescription["en-us"];
    openGraph: { title: string; description: string; image: string } = defaultOG;

    constructor(site: URL, url: URL, props?: BaseLayoutProps) {
        this.site = site;
        this.url = url;

        const path = site.pathname.split("/")[1] as keyof typeof defaultDescription;
        if (path !== "en-us" && path !== "fr-fr") this.lang = "en-us";
        else this.lang = path;

        if (props?.title) this.title = props.title;
        if (props?.description) this.description = props.description;
        if (props?.openGraph) {
            if (props.openGraph.title) this.openGraph.title = props.openGraph.title;
            if (props.openGraph.description) this.openGraph.description = props.openGraph.description;
            if (props.openGraph.image) this.openGraph.image = props.openGraph.image;
        }
    }

    public setTitle(title: string | undefined) {
        this.title = title || defaultTitle;
    }

    public setDescription(description: string | undefined) {
        this.description = description || defaultDescription[this.lang];
    }

    public setOpenGraph(props: BaseLayoutProps["openGraph"] | undefined) {
        if (!props) this.openGraph = defaultOG;
        if (props?.title) this.openGraph.title = props.title;
        if (props?.description) this.openGraph.description = props.description;
        if (props?.image) this.openGraph.image = props.image;
    }

    get canonicalURL() {
        return new URL(this.url.pathname, this.site).toString();
    }

    get resolvedImageWithDomain() {
        return new URL(this.openGraph.image, this.site).toString();
    }

    get shownTitle() {
        const displayed = this.title ? `${this.title} - ${defaultTitle}` : defaultTitle;
        if (displayed === "Voxel - Voxel") return defaultTitle;
        return displayed;
    }

    get shownDescription() {
        return this.description;
    }
}
