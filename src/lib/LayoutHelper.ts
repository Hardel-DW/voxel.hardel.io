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

export class LayoutHelper implements BaseLayoutProps, LayoutHelperProps {
    site: URL;
    url: URL;
    title: string = "Voxel";
    description: string =
        "Voxel, la référence pour tout développeur souhaitant se lancer ou se perfectionner dans la création de mods Minecraft. Offrant des ressources de pointe et des guides avancés, nous accompagnons chaque talent, du novice à l'expert, avec des solutions professionnelles adaptées à vos besoins.";
    openGraph: {
        title: string;
        description: string;
        image: string;
    } = {
        title: this.title,
        description: this.description,
        image: "/opengraph.webp"
    };

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

    public setTitle(title: string) {
        this.title = title;
    }

    public setDescription(description: string) {
        this.description = description;
    }

    public setOpenGraph(props: BaseLayoutProps["openGraph"]) {
        if (props?.title) this.openGraph.title = props.title;
        if (props?.description) this.openGraph.description = props.description;
        if (props?.image) this.openGraph.image = props.image;
    }

    public setOpenGraphTitle(title: string) {
        this.openGraph.title = title;
    }

    public setOpenGraphDescription(description: string) {
        this.openGraph.description = description;
    }

    public setOpenGraphImage(image: string) {
        this.openGraph.image = image;
    }

    get canonicalURL() {
        return new URL(this.url.pathname, this.site).toString();
    }

    get resolvedImageWithDomain() {
        return new URL(this.openGraph.image, this.site).toString();
    }

    get shownTitle() {
        return this.title ? "Voxel | " + this.title : "Voxel";
    }

    get shownDescription() {
        return this.description;
    }

    get shownOpenGraphTitle() {
        return this.openGraph.title;
    }

    get shownOpenGraphDescription() {
        return this.openGraph.description;
    }

    get shownOpenGraphImage() {
        return this.resolvedImageWithDomain;
    }

    get shownOpenGraphURL() {
        return this.canonicalURL;
    }
}
