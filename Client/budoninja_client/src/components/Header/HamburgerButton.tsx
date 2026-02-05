import { cn } from "../../lib/utils.ts";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function HamburgerButton({ isOpen, onClick, className }: HamburgerButtonProps) {
  const genericHamburgerLine = `h-0.5 w-6 my-1 rounded-full bg-neutral-50 transition ease transform duration-300`;

  return (
    <button
      className={cn("flex flex-col h-12 w-12 border-2 border-transparent rounded justify-center items-center group", className)}
      onClick={onClick}
    >
      <div
        className={cn(
          genericHamburgerLine,
          isOpen && "rotate-45 translate-y-[10px]"
        )}
      />
      <div
        className={cn(
          genericHamburgerLine,
          isOpen && "opacity-0"
        )}
      />
      <div
        className={cn(
          genericHamburgerLine,
          isOpen && "-rotate-45 -translate-y-[10px]"
        )}
      />
    </button>
  );
}