import { cn } from "../../lib/utils";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export function CertificateTypeCard({ icon, title, description, isActive, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full md:w-65 h-70 p-8 rounded-[24px] flex flex-col items-center gap-6 cursor-pointer transition-all duration-300",
        "border bg-neutral-50",
        isActive ? "border-2 border-primary-600 shadow-md" : "border border-neutral-200"
      )}
    >
      <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center">
        <div className="text-primary-600">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
      <p className="text-sm text-neutral-500 text-center">{description}</p>
    </div>
  );
}
