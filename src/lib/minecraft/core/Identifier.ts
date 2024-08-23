export class Identifier {
    private readonly namespace: string;
    private readonly registry: string;
    private readonly resource: string;

    public constructor(namespace: string, registry: string, path: string) {
        this.namespace = namespace;
        this.registry = registry;
        this.resource = path;
    }

    public static fromString(value: string, registry: string): Identifier {
        const [namespace, resource] = value.split(":");
        return new Identifier(namespace, registry, resource);
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
}
