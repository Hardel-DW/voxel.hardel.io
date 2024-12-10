import Button from "@/components/ui/react/Button";
import Dropzone from "@/components/ui/react/Dropzone";
import type React from "react";
import { useState } from "react";

interface MigrationToolProps {
    translate: Record<string, string>;
    lang: string;
    children?: React.ReactNode;
}

export default function MigrationTool({ translate, children }: MigrationToolProps) {
    const [sourceFile, setSourceFile] = useState<File | null>(null);
    const [targetFile, setTargetFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleMigration = async () => {
        if (!sourceFile || !targetFile) return;
        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append("source", sourceFile);
            formData.append("target", targetFile);

            const response = await fetch("/api/migration", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Migration failed");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "migrated-pack.zip";
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            // TODO: Add error handling UI
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto px-4">
            {children}

            <div className="flex items-center justify-center gap-8 mt-8">
                <div className="w-1/3">
                    <Dropzone
                        onFileUpload={(files) => setSourceFile(files[0])}
                        dropzone={{
                            accept: ".zip",
                            maxSize: 100000000,
                            multiple: false
                        }}>
                        <div>
                            <p className="mb-2 text-sm text-gray-500">{translate["tools.migration.source"]}</p>
                            <p className="text-xs text-gray-500">{translate["tools.migration.drop.source"]}</p>
                        </div>
                    </Dropzone>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <img src="/icons/arrow-right.svg" alt="Arrow" className="w-8 h-8" />
                    <span className="text-sm text-muted-foreground">{translate["tools.migration.arrow"]}</span>
                </div>

                <div className="w-1/3">
                    <Dropzone
                        onFileUpload={(files) => setTargetFile(files[0])}
                        dropzone={{
                            accept: ".zip",
                            maxSize: 100000000,
                            multiple: false
                        }}>
                        <div>
                            <p className="mb-2 text-sm text-gray-500">{translate["tools.migration.target"]}</p>
                            <p className="text-xs text-gray-500">{translate["tools.migration.drop.target"]}</p>
                        </div>
                    </Dropzone>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <Button disabled={!sourceFile || !targetFile || isProcessing} onClick={handleMigration}>
                    {isProcessing ? translate["tools.migration.processing"] : translate["tools.migration.start"]}
                </Button>
            </div>
        </div>
    );
}
