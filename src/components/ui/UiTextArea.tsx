import type { TextareaHTMLAttributes } from "react"
import clsx from "clsx"

interface UiTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export default function UiTextarea({
  className,
  error,
  ...props
}: UiTextareaProps) {
  const baseStyle = clsx(
    "w-full py-2 px-3 border border-gray-300 rounded-sm focus:outline-none focus:border-primary transition",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  )

  return (
    <div className="w-full">
      <textarea
        className={clsx(baseStyle, className)}
        {...props}
      />
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  )
}
