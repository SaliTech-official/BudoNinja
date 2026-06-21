import React from 'react';
import { cn } from '../../lib/utils.ts';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex h-5 w-5 items-center">
        
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "peer absolute h-full w-full cursor-pointer appearance-none rounded-base border border-neutral-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        
        <div 
          className="
            pointer-events-none 
            absolute inset-0 
            flex items-center justify-center 
            rounded-base 
            bg-neutral-700 
            text-neutral-50 
            opacity-0 
            transition-opacity 
            peer-checked:opacity-100"
        >
          <Check className="h-4 w-4" />
        </div>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };