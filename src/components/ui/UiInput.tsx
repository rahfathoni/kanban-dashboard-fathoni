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

  const hasError = error !== undefined
  const showErrorText = Boolean(error && error.trim() !== "")

  const variants = {
    underline: clsx(
      "border-b rounded-none",
      hasError ? "border-danger focus:border-danger" : "border-gray-300 focus:border-primary"
    ),
    solid: clsx(
      "border px-3 rounded-sm",
      hasError ? "border-danger focus:border-danger" : "border-gray-300 focus:border-primary"
    ),
  }

  return (
    <div className="w-full">
      <input
        className={clsx(baseStyle, variants[variant], className)}
        {...props}
      />
      {showErrorText && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  )
}
