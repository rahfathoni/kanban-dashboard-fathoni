import type { ReactNode } from "react"
import clsx from "clsx"

type UiTagProps = {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function UiTag({
  children,
  className,
  style,
}: UiTagProps) {
  const baseStyle = "text-[13px] font-semibold px-2 py-1.5 rounded-md bg-gray-200"

  return (
    <span
      className={clsx(baseStyle, className)}
      style={style}
    >
      {children}
    </span>
  )
}
