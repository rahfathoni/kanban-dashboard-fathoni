import type { SelectHTMLAttributes } from "react"
import clsx from "clsx"

interface UiSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

export default function UiSelect({
  className,
  error,
  children,
  ...props
}: UiSelectProps) {
  const baseStyle = clsx(
    "py-2 px-3 w-full border border-gray-300 rounded-sm focus:outline-none transition",
    "focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed",
    className
  )

  return (
    <div className="w-full">
      <select className={baseStyle} {...props}>
        {children}
      </select>
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  )
}