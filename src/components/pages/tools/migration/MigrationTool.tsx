import Dropzone from "@/components/ui/react/Dropzone";
import type React from "react";

interface MigrationToolProps {
    translate: Record<string, string>;
    lang: string;
    children?: React.ReactNode;
}

export default function MigrationTool({ translate, children }: MigrationToolProps) {
    return (
        <div className="container mx-auto px-4">
            {children}

            <div className="flex items-center justify-center gap-8 mt-8">
                <div className="w-1/3">
                    <Dropzone
                        id="source-dropzone"
                        onFileUpload={() => {}}
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
                    <img src="/icons/arrow-right.svg" alt="Arrow" className="w-12 h-12 invert-75" />
                    <span className="text-sm text-muted-foreground">{translate["tools.migration.arrow"]}</span>
                </div>

                <div className="w-1/3">
                    <Dropzone
                        id="target-dropzone"
                        onFileUpload={() => {}}
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
        </div>
    );
}
