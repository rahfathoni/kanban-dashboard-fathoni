import clsx from "clsx"

type UiLoadingProps = {
  text?: string
  className?: string
}

export default function UiLoading({ text = "Loading...", className }: UiLoadingProps) {
  return (
    <div className={clsx("flex flex-col items-center justify-center gap-4 text-secondary", className)}>
      <div id="loading-spin" className="h-10 w-10 border-4 border-t-4 border-foreground border-t-primary rounded-full animate-spin"></div>
      <p id="loading-text" className="text-lg font-medium">{text}.</p>
    </div>
  )
}