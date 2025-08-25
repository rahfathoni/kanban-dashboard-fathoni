"use client"

import { useGlobalStore } from "@/store/useGlobalStore"
import { useEffect, useState } from "react"
import clsx from "clsx"

export default function ToastUniversal() {
  const { toasts, removeToast } = useGlobalStore()
  const [closing, setClosing] = useState<Record<string, boolean>>({})

  useEffect(() => {
    toasts.forEach((t) => {
      const timer = setTimeout(() => {
        setClosing((prev) => ({ ...prev, [t.id]: true }))
        setTimeout(() => removeToast(t.id), 300)
      }, 3000)

      return () => clearTimeout(timer)
    })
  }, [toasts, removeToast])

  return (
    <div className="fixed bottom-4 right-6 flex flex-col gap-3 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            "flex items-center justify-between rounded-[10px] shadow-toast p-2 bg-white text-sm text-gray-800",
            closing[toast.id] ? "animate-slide-out" : "animate-slide-in"
          )}
        >
          <div
            className={clsx("w-1 h-8 rounded-[10px] mr-3", {
              "bg-danger": toast.type === "error",
              "bg-success": toast.type === "success",
              "bg-foreground": !toast.type,
            })}
          />
          <span className="flex-1 text-sm font-normal">{toast.message}</span>
          <button
            onClick={() => {
              setClosing((prev) => ({ ...prev, [toast.id]: true }))
              setTimeout(() => removeToast(toast.id), 300)
            }}
            className="mx-4 text-sm font-semibold text-foreground cursor-pointer"
          >
            Got it
          </button>
        </div>
      ))}
    </div>
  )
}
