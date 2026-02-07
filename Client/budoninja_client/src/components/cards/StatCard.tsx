import { cn } from "../../lib/utils.ts";
import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl w-full md:w-[140px] h-[162px] border border-neutral-200 bg-neutral-100 p-6 shadow-md", className)}>
        <div className="flex flex-col gap-2">
          <span className="text-3xl text-center leading-[46px] font-bold text-primary-600">{value}</span>
          <span className="text-base text-center leading-15 text-neutral-500">{label}</span>
        </div>
    </div>
  );
}