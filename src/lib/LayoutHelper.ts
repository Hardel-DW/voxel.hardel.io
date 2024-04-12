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
const defaultDescription =
    "Voxel, la référence pour tout développeur souhaitant se lancer ou se perfectionner dans la création de mods Minecraft. Offrant des ressources de pointe et des guides avancés, nous accompagnons chaque talent, du novice à l'expert, avec des solutions professionnelles adaptées à vos besoins.";
const defaultImage = {
    title: defaultTitle,
    description: defaultDescription,
    image: "/opengraph.webp"
};

export class LayoutHelper implements BaseLayoutProps, LayoutHelperProps {
    site: URL;
    url: URL;
    title = defaultTitle;
    description = defaultDescription;
    openGraph: { title: string; description: string; image: string } = defaultImage;

    constructor(site: URL, url: URL, props?: BaseLayoutProps) {
        this.site = site;
        this.url = url;
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
        this.description = description || defaultDescription;
    }

    public setOpenGraph(props: BaseLayoutProps["openGraph"] | undefined) {
        if (!props) this.openGraph = defaultImage;
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
        return this.title ? `${defaultTitle} | ${this.title}` : defaultTitle;
    }

    get shownDescription() {
        return this.description;
    }
}
