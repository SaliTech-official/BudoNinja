import { cn } from '../../lib/utils';
import React from 'react';

interface DashboardStatCardProps {
  IconComponent: React.ElementType;
  value: string;
  label: string;
  className?: string;
}

export function DashboardStatCard({ IconComponent, value, label, className }: DashboardStatCardProps) {
  return (
    <div className={cn(
      "rounded-xl bg-neutral-50 flex items-center h-[130px] px-4 shadow-sm transition-shadow duration-300 hover:shadow-md",
      "border border-transparent hover:border-neutral-200",
      className
    )}>
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary-100">
          <IconComponent className="h-6 w-6 text-primary-600" />
        </div>
        <div className="flex flex-col gap-1 items-start">
          <span className="text-2xl font-bold text-neutral-900">{value}</span>
          <span className="text-sm text-neutral-500">{label}</span>
        </div>
      </div>
    </div>
  );
}