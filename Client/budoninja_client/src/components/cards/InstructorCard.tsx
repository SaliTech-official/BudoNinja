import { useState } from "react";
import { Button } from "../UI/Button";
import {
  InstructorProfileModal,
  type InstructorProfile,
} from "../modal/InstructorProfileModal";
import { Avatar } from "../UI/Avatar";

interface InstructorCardProps {
  avatarUrl?: string;
  name: string;
  rank: string;
  city: string;
  phone?: string;
}

export function InstructorCard({
  avatarUrl,
  name,
  rank,
  city,
  phone,
}: InstructorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profile: InstructorProfile = {
    name,
    rank,
    city,
    phone,
    avatarUrl,
  };

  return (
    <>
      <div className="flex flex-col w-full h-fit items-center gap-3 rounded-lg bg-bg-secondary border border-neutral-700 p-6 text-center">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <Avatar name={name} size="lg" className="!w-20 !h-20 !text-xl" />
        )}
        <div>
          <h3 className="text-lg font-bold text-neutral-50">{name}</h3>
          <p className="text-sm text-primary-400">{rank}</p>
          <p className="mt-1 text-xs text-neutral-400">{city}</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border border-neutral-600 text-neutral-200 hover:bg-neutral-700"
          onClick={() => setIsModalOpen(true)}
        >
          مشاهده پروفایل
        </Button>
      </div>

      <InstructorProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        instructor={profile}
      />
    </>
  );
}
