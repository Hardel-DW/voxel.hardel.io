import Dropzone from "@/components/ui/react/Dropzone";

export function DatapackDropzone(props: {
    id: string;
    title: string;
    subtitle: string;
    onUpload: (files: FileList) => Promise<void>;
}) {
    return (
        <Dropzone
            id={props.id}
            onFileUpload={props.onUpload}
            dropzone={{
                accept: ".zip",
                maxSize: 100000000,
                multiple: false
            }}>
            <div>
                <p className="mb-2 text-sm text-gray-500">{props.title}</p>
                <p className="text-xs text-gray-500">{props.subtitle}</p>
            </div>
        </Dropzone>
    );
}
