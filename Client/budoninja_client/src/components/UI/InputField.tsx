import * as React from "react"
import { cn } from "../../lib/utils.ts"
import { Input, type InputProps } from "./Input"
import { Label } from "./Label"

export interface InputFieldProps extends InputProps {
  label?: string;
  errorMessage?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, label, name, errorMessage, ...props }, ref) => {
    const id = name || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn("grid w-full items-center gap-2", className)}>
        {label && <Label htmlFor={id}>{label}</Label>}
        
        <Input
          id={id}
          name={name}
          ref={ref}
          {...props}
          className={cn(errorMessage && "border-danger-500 focus-visible:border-danger-500 hover:border-danger-700")}
        />

        {errorMessage && (
          <p className="text-sm text-danger-500">{errorMessage}</p>
        )}
      </div>
    )
  }
)
InputField.displayName = "InputField"

export { InputField }