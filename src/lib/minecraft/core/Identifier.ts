import type { RegistryElement } from "@/lib/minecraft/mcschema.ts";
import { registries } from "@/lib/minecraft/registry/Registry.ts";
import { quoteString } from "@/lib/utils.ts";

export type IdentifierOneToMany = {
    primary: Identifier;
    related: Identifier[];
};

export class Identifier {
    private readonly namespace: string;
    private readonly registry: string;
    private readonly resource: string;

    public constructor(namespace: string, registry: string, path: string) {
        this.namespace = namespace;
        this.registry = registry;
        this.resource = path;
    }

    public static fromString(value: string | OptionalTag, registry?: string): Identifier {
        const parsedValue = Identifier.getValue(value);
        const [namespace, resource] = (parsedValue.startsWith("#") ? parsedValue.slice(1) : parsedValue).split(":");
        if (registry) {
            return new Identifier(namespace, registry, resource);
        }

        for (const registry of registries) {
            if (resource.startsWith(registry)) {
                const newResource = resource.slice(registry.length + 1);
                return new Identifier(namespace, registry, newResource);
            }
        }

        throw new Error(`Could not find registry for ${value}`);
    }

    public static getValue(tag: string | OptionalTag): string {
        return typeof tag === "string" ? tag : tag.id;
    }

    public static sortRegistry<T>(elements: RegistryElement<T>[]) {
        return elements.sort((a, b) =>
            (a.identifier.getResource().split("/").pop() ?? "").localeCompare(b.identifier.getResource().split("/").pop() ?? "")
        );
    }

    public getResource(): string {
        return this.resource;
    }

    public getRegistry(): string {
        return this.registry;
    }

    public getNamespace(): string {
        return this.namespace;
    }

    public toString(): string {
        return `${this.namespace}:${this.resource}`;
    }

    public filePath(): string {
        return `data/${this.namespace}/${this.registry}/${this.resource}`;
    }

    public equals(other: Identifier): boolean {
        return this.namespace === other.getNamespace() && this.registry === other.getRegistry() && this.resource === other.getResource();
    }

    public render(): string {
        return (this.resource.split("/")?.pop() ?? this.resource).replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    public renderNamespace(): string {
        return this.namespace.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    }

    public renderResourceName(): string {
        return quoteString(
            this.resource
                .split("/")
                .reduce((_, current) => current)
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())
        );
    }

    public renderResource(): string {
        return this.resource
            .replace(/\//g, " - ")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    }
}
