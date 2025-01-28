import Loader from "@/components/ui/react/Loader";
import { useRegistry } from "../hooks/useRegistry";
import BaseComponent from "./BaseComponent";
import DropdownContent from "./DropdownContent";
import DropdownElement from "./DropdownElement";
import { useDropdown } from "./useDropdown";

interface DynamicDropdownProps {
    dropdownId: string;
    registryType: string;
    onItemClick?: (item: string) => void;
    icon?: string;
    loadingIcon?: string;
    errorIcon?: string;
    itemIcon?: string;
    formatLabel?: (item: string) => string;
}

export function DynamicDropdown({
    dropdownId,
    registryType,
    onItemClick,
    itemIcon = "/icons/star.svg",
    formatLabel = (item) => item
}: DynamicDropdownProps) {
    const { isOpen } = useDropdown();
    const { items, isLoading, error } = useRegistry(registryType, isOpen(dropdownId));

    return (
        <DropdownContent dropdownId={dropdownId}>
            <BaseComponent variant="dropdown">
                {isLoading ? (
                    <DropdownElement>
                        <Loader />
                    </DropdownElement>
                ) : error ? (
                    <DropdownElement>Error loading items</DropdownElement>
                ) : (
                    items.map((item) => (
                        <DropdownElement key={item} icons={itemIcon} onClick={() => onItemClick?.(item)}>
                            {formatLabel(item)}
                        </DropdownElement>
                    ))
                )}
            </BaseComponent>
        </DropdownContent>
    );
}
