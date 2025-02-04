import Dropzone from "@/components/ui/react/Dropzone";
import { DEFAULT_MOD_METADATA, extractMetadata } from "@/lib/minecraft/converter";
import { parseZip } from "@/lib/minecraft/core/engine/utils/zip";
import { useState } from "react";
import DatapackForm from "./DatapackForm";

interface Props {
    children: React.ReactNode;
    translateForm: Record<string, string>;
}

const DatapackDropzone: React.FC<Props> = ({ children, translateForm }) => {
    const [file, setFile] = useState<File | null>(null);
    const [iconUrl, setIconUrl] = useState<string | null>(null);
    const [initialMetadata, setInitialMetadata] = useState(DEFAULT_MOD_METADATA);

    const handleFileUpload = async (files: FileList) => {
        const uploadedFile = files[0];
        if (!uploadedFile) return;

        try {
            const arrayBuffer = await uploadedFile.arrayBuffer();
            const zip = new Uint8Array(arrayBuffer);
            const zipFiles = await parseZip(zip);
            const fileName = uploadedFile.name.replace(/\.zip$/i, "");
            const extractedMetadata = extractMetadata(zipFiles, fileName);

            if (extractedMetadata.icon && zipFiles[extractedMetadata.icon]) {
                const iconBlob = new Blob([zipFiles[extractedMetadata.icon]], { type: "image/png" });
                setIconUrl(URL.createObjectURL(iconBlob));
            }

            setInitialMetadata(extractedMetadata);
            setFile(uploadedFile);
        } catch (error) {
            console.error("Error reading datapack:", error);
        }
    };

    const handleClear = () => {
        if (iconUrl) {
            URL.revokeObjectURL(iconUrl);
        }
        setFile(null);
        setIconUrl(null);
        setInitialMetadata(DEFAULT_MOD_METADATA);
    };

    return (
        <div className="space-y-6">
            {!file ? (
                <Dropzone
                    id="dropzone"
                    dropzone={{
                        accept: "application/zip",
                        maxSize: 10000000,
                        multiple: false
                    }}
                    onFileUpload={handleFileUpload}>
                    {children}
                </Dropzone>
            ) : (
                <DatapackForm
                    file={file}
                    onFileChange={handleClear}
                    initialMetadata={initialMetadata}
                    iconUrl={iconUrl}
                    translateForm={translateForm}
                />
            )}
        </div>
    );
};

export default DatapackDropzone;
