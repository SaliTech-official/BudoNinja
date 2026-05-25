import React from 'react';
import { cn } from '../../lib/utils.ts';

interface InfoCardProps {
  IconComponent: React.ElementType;
  title: string;
  text: string;
  className?: string;
}

export function InfoCard({ IconComponent, title, text, className }: InfoCardProps) {
  return (
    <div className={cn(
      "flex flex-col gap-4 items-center rounded-xl bg-primary-50 p-6 text-center border border-primary-100",
      className
    )}>
      <IconComponent size={24} className="text-primary-600"/>
      <div className='flex flex-col gap-2'>
        <h3 className="text-xl font-bold text-neutral-900 w-full">{title}</h3>
        <p className="text-base text-neutral-700 font-semibold">{text}</p>
      </div>
    </div>
  );
}