export interface BaseLayoutProps {
    title?: string;
    description?: string;
    openGraph?: {
        title?: string;
        description?: string;
        image?: string;
    }
}

type LayoutHelperProps = {
    site: URL;
    url: URL;
}

export class LayoutHelper implements BaseLayoutProps, LayoutHelperProps {
    site: URL;
    url: URL;
    title: string;
    description: string;
    openGraph: {
        title: string;
        description: string;
        image: string;
    }

    constructor(props: BaseLayoutProps & LayoutHelperProps) {
        this.site = props.site;
        this.url = props.url;
        this.title = props.title || "Voxel";
        this.description = props.description || "Voxel, la référence pour tout développeur souhaitant se lancer ou se perfectionner dans la création de mods Minecraft. Offrant des ressources de pointe et des guides avancés, nous accompagnons chaque talent, du novice à l'expert, avec des solutions professionnelles adaptées à vos besoins.";
        this.openGraph = {
            title: props.openGraph?.title || this.title,
            description: props.openGraph?.description || this.description,
            image: props.openGraph?.image || "/opengraph.webp"
        }
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