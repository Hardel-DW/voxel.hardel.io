import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/react/Select";

// Types for the component
export type VersionOption = {
    value: string;
    label: string;
};

// Component props
interface VersionRangeSelectProps {
    versionOptions: VersionOption[];
    fromVersion: string;
    toVersion: string;
    setFromVersion: (value: string) => void;
    setToVersion: (value: string) => void;
    className?: string;
}

/**
 * A reusable component for selecting a range of Minecraft versions
 */
export function VersionRangeSelect({
    versionOptions,
    fromVersion,
    toVersion,
    setFromVersion,
    setToVersion,
    className = "flex flex-row gap-2"
}: VersionRangeSelectProps) {
    return (
        <div className={className}>
            <div className="flex flex-col gap-1">
                <p className="text-xs text-zinc-400 mb-1">From Version</p>
                <Select value={fromVersion} setValue={setFromVersion}>
                    <SelectTrigger className="rounded-lg" aria-label="Select from version">
                        <SelectValue placeholder="From version" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        {versionOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value} className="rounded-lg">
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-xs text-zinc-400 mb-1">To Version</p>
                <Select value={toVersion} setValue={setToVersion}>
                    <SelectTrigger className="rounded-lg" aria-label="Select to version">
                        <SelectValue placeholder="To version" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        {versionOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value} className="rounded-lg">
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
