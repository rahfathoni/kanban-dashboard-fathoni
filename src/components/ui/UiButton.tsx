import type { ReactNode } from "react"
import clsx from "clsx"

type UiButtonProps = {
  children: ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  loading?: boolean
  variant?: "primary" | "outlineBlack" | "ghostDanger"
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
    "text-sm font-medium",
    {
      "cursor-not-allowed opacity-50": disabled || loading,
      "cursor-pointer opacity-100": !disabled && !loading,
    }
  )

  const variants = {
    primary: "bg-primary hover:bg-blue-600 text-white",
    outlineBlack: "border border-black text-black bg-white hover:bg-gray-100",
    ghostDanger: "bg-transparent text-red-500 hover:text-red-600"
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
          className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  )
}