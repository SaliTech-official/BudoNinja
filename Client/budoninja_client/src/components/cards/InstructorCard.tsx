import { Button } from "../UI/Button";

interface InstructorCardProps {
  avatarUrl: string;
  name: string;
  rank: string;
  city: string;
}

export function InstructorCard({ avatarUrl, name, rank, city }: InstructorCardProps) {
  return (
    <div className="flex flex-col w-full h-fit items-center gap-3 rounded-lg bg-bg-secondary border border-neutral-700 p-6 text-center">
      <img
        src={avatarUrl}
        alt={name}
        className="h-20 w-20 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg font-bold text-neutral-50">{name}</h3>
        <p className="text-sm text-primary-400">{rank}</p>
        <p className="mt-1 text-xs text-neutral-400">{city}</p>
      </div>
      <Button variant="outline" size="sm" className="border border-neutral-600 text-neutral-200 hover:bg-neutral-700">
        مشاهده پروفایل
      </Button>
    </div>
  );
}