import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils.ts';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-50",
            "focus:outline-none focus:ring-2 focus:ring-primary-600",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };