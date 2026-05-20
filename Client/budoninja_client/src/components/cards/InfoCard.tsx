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
      "flex gap-3 items-center rounded-xl bg-neutral-100 p-4 text-center border border-neutral-200",
      className
    )}>
      <IconComponent size={24} className="text-primary-600"/>
      <div className='flex flex-col gap-1'>
        <h3 className="text-xs font-semibold text-neutral-500 w-fit">{title}</h3>
        <p className="text-base text-neutral-900 font-semibold">{text}</p>
      </div>
      
    </div>
  );
}