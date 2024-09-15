import { REGISTRIES } from "@/lib/minecraft/core/Registries.ts";
import type { RegistryElement } from "@/lib/minecraft/mczip.ts";
import type { OptionalTag } from "@/lib/minecraft/schema/tag/TagType.ts";

export type IdentifierOneToMany = {
    primary: Identifier;
    related: Identifier[];
};
export class Identifier {
    private readonly namespace: string;
    private readonly registry: string | undefined;
    private readonly resource: string;
    private readonly tag: boolean;
    private readonly required: boolean;

    public constructor(namespace: string, registry: string | undefined, path: string, isTag = false, isRequired = false) {
        this.namespace = namespace;
        this.registry = registry;
        this.resource = path;
        this.tag = isTag;
        this.required = isRequired;
    }

    public static fromString(value: string | OptionalTag, registry?: string): Identifier {
        const isRequired = typeof value !== "string" ? value.required : true;
        const parsedValue = Identifier.getValue(value);
        const isTag = parsedValue.includes("#");

        const [namespace, resource] = (parsedValue.startsWith("#") ? parsedValue.slice(1) : parsedValue).split(":");
        if (registry) {
            return new Identifier(namespace, registry, resource, isTag, isRequired);
        }

        for (const registry of REGISTRIES) {
            if (resource.startsWith(registry)) {
                const newResource = resource.slice(registry.length + 1);
                return new Identifier(namespace, registry, newResource, isTag, isRequired);
            }
        }

        return new Identifier(namespace, undefined, resource, isTag, isRequired);
    }

    public static getValue(tag: string | OptionalTag): string {
        return typeof tag === "string" ? tag : tag.id;
    }

    public static sortRegistry<T>(elements: RegistryElement<T>[]) {
        return elements.sort((a, b) =>
            (a.identifier.getResource().split("/").pop() ?? "").localeCompare(b.identifier.getResource().split("/").pop() ?? "")
        );
    }

    public static sortIdentifier(elements: Identifier[]) {
        return elements.sort((a, b) => {
            const namespaceComparison = a.getNamespace().localeCompare(b.getNamespace());
            if (namespaceComparison === 0) {
                return (a.getResource().split("/").pop() ?? "").localeCompare(b.getResource().split("/").pop() ?? "");
            }

            return namespaceComparison;
        });
    }

    public output(): string | OptionalTag {
        return this.tag ? { id: this.toString(), required: this.required } : this.toString();
    }

    public isTagged(): boolean {
        return this.tag;
    }

    public isRequired(): boolean {
        return this.required;
    }

    public getResource(): string {
        return this.resource;
    }

    public getRegistry(): string | undefined {
        return this.registry;
    }

    public getNamespace(): string {
        return this.namespace;
    }

    public toString(): string {
        if (this.tag || this.registry?.startsWith("tags/")) {
            return `#${this.namespace}:${this.resource}`;
        }

        return `${this.namespace}:${this.resource}`;
    }

    public filePath(): string {
        return `data/${this.namespace}/${this.registry}/${this.resource}`;
    }

    public equals(other: Identifier): boolean {
        return (
            this.getNamespace() === other.getNamespace() &&
            this.getRegistry() === other.getRegistry() &&
            this.getResource() === other.getResource() &&
            this.isTagged() === other.isTagged()
        );
    }

    public render(): string {
        return (this.resource.split("/")?.pop() ?? this.resource).replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    public renderNamespace(): string {
        return this.namespace.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    public renderResourceName(): string {
        return this.resource
            .split("/")
            .reduce((_, current) => current)
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    }

    public renderResource(): string {
        return this.resource
            .replace(/\//g, " - ")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    }
}
