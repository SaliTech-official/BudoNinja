import * as React from "react"
import { cn } from "../../lib/utils.ts"
import { Input, type InputProps } from "./Input"
import { TextArea, type TextAreaProps } from "./TextArea"
import { Label } from "./Label"

type CommonProps = {
  label?: string;
  errorMessage?: string;
  className?: string;
}

export type InputFieldProps = CommonProps & (
  | ({ as?: "input" } & InputProps)
  | ({ as: "textarea" } & TextAreaProps)
)

const InputField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(({ className, label, name, errorMessage, as = "input", ...props }, ref) => {
  const id = props.id || name || label?.toLowerCase().replace(/\s+/g, '-');

  const Component = as === "textarea" ? TextArea : Input;

  return (
    <div className={cn("grid w-full items-center gap-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      
      <Component
        id={id}
        name={name}
        // @ts-ignore
        ref={ref} 
        className={cn(errorMessage && "border-danger-500 focus-visible:shadow-[0_0_0_2px_#EF444433]")}
        {...props}
      />

      {errorMessage && (
        <p className="text-sm text-danger-500">{errorMessage}</p>
      )}
    </div>
  )
})
InputField.displayName = "InputField"

export { InputField }