/**
 * Generates an HSL color based on the index of an item in a collection
 * @param item The item for which to generate a color
 * @param collection The collection containing the item
 * @param options Color customization options
 * @returns A color in HSL format
 */
export function getColorFromIndex<T>(
    item: T,
    collection: T[],
    options: {
        saturation?: number; // 0-100
        lightness?: number; // 0-100
        hueCount?: number; // Number of hues to use
        hueStart?: number; // Starting HSL angle (0-360)
        hueStep?: number; // Increment between each hue
    } = {}
): string {
    const { saturation = 100, lightness = 70, hueCount = 18, hueStart = 0, hueStep = 20 } = options;

    const index = collection.indexOf(item);
    if (index === -1) return `hsl(0, ${saturation}%, ${lightness}%)`;

    const hue = (hueStart + (index % hueCount) * hueStep) % 360;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Generates an array of evenly distributed HSL colors
 * @param count Number of colors to generate
 * @param options Color customization options
 * @returns An array of HSL colors
 */
export function generateColorPalette(
    count: number,
    options: {
        saturation?: number;
        lightness?: number;
        hueStart?: number;
        hueEnd?: number;
    } = {}
): string[] {
    const { saturation = 100, lightness = 70, hueStart = 0, hueEnd = 360 } = options;

    const colors: string[] = [];
    const step = (hueEnd - hueStart) / count;

    for (let i = 0; i < count; i++) {
        const hue = (hueStart + i * step) % 360;
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
}
