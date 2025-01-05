import ToolSound from "@/components/tools/elements/schema/song/ToolSound";
import PanelProvider from "@/components/tools/PanelProvider";

export default function SoundTool(props: {
    children?: React.ReactNode;
    lang: string;
}) {
    return (
        <PanelProvider lang={props.lang}>
            <ToolSound />
        </PanelProvider>
    );
}
