import { cn } from "../../lib/utils";

interface AvatarProps {
  name?: string | null;
  src?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// تولید رنگ ثابت برای هر اسم
function getColorFromName(name: string): string {
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

// گرفتن دو حرف اول از نام و نام خانوادگی
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].charAt(0);
  return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const displayName = name?.trim() || "";

  // اگه عکس داریم، نشون بده
  if (src) {
    return (
      <img
        src={src}
        alt={displayName || "Avatar"}
        className={cn(
          "rounded-full object-cover",
          sizeClasses[size],
          className
        )}
      />
    );
  }

  // اگه اسم نداریم، یه placeholder خاکستری
  if (!displayName) {
    return (
      <div
        className={cn(
          "rounded-full bg-neutral-600 flex items-center justify-center text-neutral-300 font-semibold",
          sizeClasses[size],
          className
        )}
      >
        ؟
      </div>
    );
  }

  // اسم داریم، initials با رنگ
  const initials = getInitials(displayName);
  const colorClass = getColorFromName(displayName);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-bold",
        colorClass,
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
