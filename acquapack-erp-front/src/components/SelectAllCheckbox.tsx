import { Checkbox } from "@/components/ui/checkbox";

interface SelectAllCheckboxProps<T> {
  items: T[];
  selectedItems: Set<number | string>;
  onSelectAll: (checked: boolean) => void;
  getId: (item: T) => number | string;
}

const SelectAllCheckbox = <T,>({
  items,
  selectedItems,
  onSelectAll,
  getId,
}: SelectAllCheckboxProps<T>) => {
  const allSelected = items.length > 0 && items.every((item) => selectedItems.has(getId(item)));

  return (
    <Checkbox
      checked={allSelected}
      onCheckedChange={(checked) => onSelectAll(checked as boolean)}
    />
  );
};

export default SelectAllCheckbox;

