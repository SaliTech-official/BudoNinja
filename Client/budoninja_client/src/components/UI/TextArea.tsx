import * as React from "react"
import { cn } from "../../lib/utils.ts"

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base Styles
          "flex min-h-20 w-full rounded-md border-2 border-neutral-600 bg-(--color-bg-tertiary) px-3 py-2 text-sm text-neutral-50",
          // Placeholder Styles
          "placeholder:text-neutral-400",
          // Hover Styles
          "hover:border-neutral-400",
          // Focus Styles
          "focus-visible:outline-none focus-visible:border-primary-600 focus-visible:shadow-[0_0_0_2px_#EB061533]",
          // Disable Styles
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextArea.displayName = "TextArea"

export { TextArea }