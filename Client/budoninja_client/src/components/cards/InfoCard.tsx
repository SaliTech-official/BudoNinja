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
      "flex-1 rounded-2xl bg-primary-50 p-8 text-center",
      className
    )}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center text-primary-600">
        <IconComponent size={32} />
      </div>
      
      <h3 className="mt-6 text-xl font-bold text-neutral-900">{title}</h3>
      
      <p className="mt-2 text-base text-neutral-700 leading-relaxed">{text}</p>
    </div>
  );
}