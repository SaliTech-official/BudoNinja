import { useState } from "react";
import { FilterButton } from "./FilterButton";

type FilterOption = {
  id: string;
  label: string;
};

type FilterGroupProps = {
  options: FilterOption[];
  defaultValue?: string;
  onChange?: (selected: string) => void;
};

export function FilterGroup({ options, defaultValue, onChange }: FilterGroupProps) {
  const [selected, setSelected] = useState<string>(
    defaultValue ?? options[0]?.id
  );

  const select = (id: string) => {
    if (id === selected) return;

    setSelected(id);
    onChange?.(id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <FilterButton
          key={item.id}
          label={item.label}
          active={selected === item.id}
          onClick={() => select(item.id)}
        />
      ))}
    </div>
  );
}
