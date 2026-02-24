import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onValueChange }: SegmentedControlProps) {
  const activeIndex = options.findIndex((option) => option.value === value);

  return (
    <div className="relative flex w-full rounded-lg bg-neutral-100 p-1">
      
      <motion.div
        className="absolute h-[calc(100%-8px)] rounded-md bg-white shadow-sm"
        animate={{
          right: `${(activeIndex / options.length) * 100}%`,
          width: `${100 / options.length}%`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onValueChange(option.value)}
          className={cn(
            "relative z-10 flex-1 rounded-md py-2 text-sm font-medium transition-colors", // z-10 رو اضافه کن
            value === option.value
              ? "text-neutral-900"
              : "text-neutral-500 hover:text-neutral-700"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}