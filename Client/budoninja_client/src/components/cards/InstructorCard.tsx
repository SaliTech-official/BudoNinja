import { Button } from "../UI/Button";

interface InstructorCardProps {
  avatarUrl: string;
  name: string;
  rank: string;
  province: string;
}

export function InstructorCard({ avatarUrl, name, rank, province }: InstructorCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-neutral-50 p-6 shadow-md text-center">
      <img
        src={avatarUrl}
        alt={name}
        className="h-24 w-24 rounded-full object-cover border-4 border-primary-100"
      />
      <div>
        <h3 className="text-lg font-bold text-neutral-900">{name}</h3>
        <p className="text-sm text-primary-600">{rank}</p>
        <p className="mt-1 text-xs text-neutral-500">{province}</p>
      </div>
      <Button variant="outline" size="sm" className="w-full mt-2">
        مشاهده پروفایل
      </Button>
    </div>
  );
}