import type { InputHTMLAttributes } from "react"
import clsx from "clsx"

interface UiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  variant?: "underline" | "solid"
}

export default function UiInput({
  className,
  error,
  variant = "underline",
  ...props
}: UiInputProps) {
  const baseStyle = clsx(
    "py-2 w-full focus:outline-none transition",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  )
  const variants = {
    underline: "border-b border-gray-300 focus:border-blue-500 rounded-none",
    solid: "border border-gray-300 focus:border-blue-500 px-3 rounded-md",
  }

  return (
    <div className="w-full">
      <input
        className={clsx(baseStyle, variants[variant], className)}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
