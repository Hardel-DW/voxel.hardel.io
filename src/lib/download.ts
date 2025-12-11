/**
 * Télécharge n'importe quel contenu comme fichier
 */
export const downloadFile = async (content: Response | Blob | string, filename: string, mimeType = "text/plain") => {
    if (typeof window === "undefined") return;

    const blob =
        content instanceof Response ? await content.blob() : content instanceof Blob ? content : new Blob([content], { type: mimeType });

    const url = URL.createObjectURL(blob);
    Object.assign(document.createElement("a"), {
        href: url,
        download: filename
    }).click();
    URL.revokeObjectURL(url);
};