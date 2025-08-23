import type { ReactNode } from "react"
import clsx from "clsx"

type UiButtonProps = {
  children: ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  loading?: boolean
  variant?: "primary"
  onClick?: () => void
}

export default function UiButton({
  children,
  className,
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary",
  onClick,
}: UiButtonProps) {
  const baseStyle = clsx(
    "py-2 rounded-md font-semibold w-full transition flex items-center justify-center gap-2", 
    "disabled:opacity-50 disabled:cursor-not-allowed"
  )
  const variants = {
    primary: "bg-primary hover:bg-blue-600 text-white"
  }
  
  return (
    <button
      className={clsx(baseStyle, variants[variant], className)}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <span
          className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}
