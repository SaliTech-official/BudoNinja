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
        px-4 py-2 rounded-lg text-sm transition-all h-fit
        ${active 
          ? "bg-neutral-50 border border-neutral-200 text-neutral-900 shadow-[0_1px_2px_1px_rgba(0,0,0,0.05)]"
          : "text-neutral-500"
        }
      `}
    >
      {label}
    </button>
  );
}
