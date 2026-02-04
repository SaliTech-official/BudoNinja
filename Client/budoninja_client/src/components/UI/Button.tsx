import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils.ts"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary-600 text-neutral-50 hover:bg-primary-700 active:bg-primary-500",
        secondary: "bg-secondary-600 text-neutral-50 hover:bg-secondary-700 active:bg-secondary-500",
        outline: "border border-primary-600 text-primary-600 bg-transparent hover:bg-primary-600 hover:text-neutral-50 active:bg-primary-400",
        ghost: "text-primary-600 hover:bg-primary-600 hover:text-neutral-50 active:bg-primary-400",
        link: "text-primary-600 underline-offset-4 hover:underline",
      },
      size: {
        md: "h-11 px-[var(--space-5)] py-[var(--space-2-5)] text-base",
        sm: "h-9 rounded-md px-[var(--space-3)] text-sm",
        lg: "h-12 rounded-md px-[var(--space-8)] text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }