import type { ReactNode } from "react"
import { RiCloseLargeFill } from "react-icons/ri"
import clsx from "clsx"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  isLoading?: boolean
  className?: string
  classNameFooter?: string
  scrollable?: boolean
}

export default function Modal({ 
  className,
  classNameFooter,
  isOpen, 
  title, 
  children, 
  footer,
  isLoading,
  scrollable = true,
  onClose, 
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div 
        className={clsx(
          "bg-white rounded-md shadow-lg w-lg max-w-full flex flex-col",
          "lg:max-w-lg",
          scrollable && "max-h-[90vh]",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-b-gray-soft p-4">
          <h3 className="text-xl font-medium text-foreground">{title}</h3>
          <button 
            className="p-1 hover:bg-gray-100 rounded-full cursor-pointer disabled:cursor-not-allowed"
            disabled={isLoading} 
            onClick={onClose} 
          >
            <RiCloseLargeFill color="gray" style={{ fontWeight: 700 }} size={18} />
          </button>
        </div>

        <div
          className={clsx(
            "flex-1",
            scrollable && "overflow-y-auto"
          )}
        >
          {children}
        </div>

        {footer && (
          <div className={clsx(
            "border-t border-t-gray-soft p-3",
            classNameFooter
          )}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}