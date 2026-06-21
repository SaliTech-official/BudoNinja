type FilterButtonProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function FilterButton({ label, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm transition-all h-fit whitespace-nowrap
        ${active 
          ? "bg-primary-600 text-neutral-50"
          : "text-neutral-600 bg-neutral-200"
        }
      `}
    >
      {label}
    </button>
  );
}
