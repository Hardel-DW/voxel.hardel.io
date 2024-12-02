import type React from "react";

export interface Props {
    children: React.ReactNode;
    dropzone: {
        accept: string;
        maxSize: number;
        multiple: boolean;
    };
    onFileUpload: (files: FileList) => void;
}

const Dropzone: React.FC<Props> = ({ dropzone, onFileUpload, children }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            onFileUpload(event.target.files);
        }
    };

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-center h-full w-full">
                <div className="w-full h-64 border-2 border-dashed flex flex-col items-center justify-center bg-gray border-t-2 border-r border-zinc-800 p-10 sm:p-16 rounded-3xl shadow-2xl shadow-black transition opacity-75 hover:opacity-100">
                    <label htmlFor="dropzone-file" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                        <div className="flex flex-col items-center justify-center gap-y-8">
                            <img alt="upload" src="/icons/upload.svg" className="w-16 h-16 invert" />
                            {children}
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            accept={dropzone.accept}
                            multiple={dropzone.multiple}
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Dropzone;
