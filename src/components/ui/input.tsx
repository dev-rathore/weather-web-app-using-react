import * as React from "react"

import { cn } from "@/lib/utils"

export const inputStyles = "flex w-full rounded-sm px-4 py-3 border-2 border-slate-300 bg-[#2A5792] outline-none text-base font-semibold text-white ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-semibold placeholder:text-white placeholder:font-semibold focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputStyles,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
