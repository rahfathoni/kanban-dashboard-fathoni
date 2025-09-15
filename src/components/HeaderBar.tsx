import { useState, useEffect, useRef } from "react"
import { FaBars, FaChevronDown } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import clsx from "clsx"
import userImg from "@/assets/user.png"
import { useGlobalStore } from "@/store/useGlobalStore"
import { useUserStore } from "@/store/useUserStore"
import { accountMenuItems } from "@/constants/menu"

export default function HeaderBar() {
  const user = useUserStore((state) => state.user)
  const toggleSidebar = useGlobalStore((state) => state.toggle)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <header className="bg-white flex items-center px-6 h-12 border-b border-foreground/10 sticky top-0 md:static z-50">
      <button
        className="p-2 bg-white text-secondary rounded md:hidden"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <div className="flex-1"></div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 focus:outline-none cursor-pointer"
        >
          <img
            src={userImg}
            alt="User Picture"
            className="h-8 w-8 rounded-xl object-cover"
          />
          <FaChevronDown
            className={clsx(
              "text-gray-500 text-xs transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute -right-3 top-[2.45rem] w-58 bg-white border border-t-white border-gray-soft rounded-b-lg shadow-lg z-50 pb-1">
            <div className="px-4 py-3">
              <p className="text-sm text-secondary">Logged in as</p>
              <p className="font-bold">{user?.name || "partner"}</p>
              <p className="text-xs text-secondary">
                Username: {user?.username || "- not found -"}
              </p>
            </div>
            <div className="border-t border-gray-soft pb-2" />

            {accountMenuItems.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-300 transition-colors",
                    active
                      ? "bg-gray-300 text-foreground"
                      : "text-secondary"
                  )}
                >
                  <Icon
                    className={clsx(
                      "text-base",
                      active && "text-foreground"
                    )}
                  />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}