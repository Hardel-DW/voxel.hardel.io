const PACK_VERSION = {
    "4": { start: "1.13", end: "1.14.4" },
    "5": { start: "1.15", end: "1.16.1" },
    "6": { start: "1.16.2", end: "1.16.5" },
    "7": { start: "1.17", end: "1.17.1" },
    "8": { start: "1.18", end: "1.18.1" },
    "9": "1.18.2",
    "10": { start: "1.19", end: "1.19.3" },
    "12": "1.19.4",
    "15": { start: "1.20", end: "1.20.1" },
    "18": "1.20.2",
    "26": { start: "1.20.3", end: "1.20.4" },
    "41": { start: "1.20.5", end: "1.20.6" },
    "48": "1.21"
};

export function getMinecraftVersion(packFormat: number): string {
    const version = PACK_VERSION[packFormat.toString() as keyof typeof PACK_VERSION];
    if (!version) {
        throw new Error(`Unsupported pack_format: ${packFormat}`);
    }
    return typeof version === "string" ? version : version.start;
}
