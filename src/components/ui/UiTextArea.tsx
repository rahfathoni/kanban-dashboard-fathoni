import type { TextareaHTMLAttributes } from "react"
import { useRef, useEffect } from "react"
import clsx from "clsx"

interface UiTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  rows?: number
}

export default function UiTextarea({
  className,
  error,
  rows = 3,
  ...props
}: UiTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const autoResize = () => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${el.scrollHeight}px`
  }

  useEffect(() => {
    autoResize()
  }, [])

  const baseStyle = clsx(
    "w-full py-2 px-3 border border-gray-300 rounded-sm focus:outline-none focus:border-primary transition",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  )

  return (
    <div className="w-full res">
      <textarea
        ref={ref}
        rows={rows}
        className={clsx(baseStyle, className)}
        onInput={autoResize}
        {...props}
      />
      {error && <p className="text-danger text-sm mt-1">{error}</p>}
    </div>
  )
}
