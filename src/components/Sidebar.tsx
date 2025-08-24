import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaTimes } from "react-icons/fa"
import { RiLogoutCircleRLine } from "react-icons/ri"
import clsx from "clsx"
import { menuItems } from "@/constants/menu"
import logo from "@/assets/logo.png"
import { useGlobalStore } from "@/store/useGlobalStore"
import { useUserStore } from "@/store/useUserStore"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const open = useGlobalStore((state) => state.open)
  const setOpen = useGlobalStore((state) => state.setOpen)
  const logout = useUserStore((state) => state.logout)

  const handleLogout = () => {
    setOpen(false)
    logout()
    navigate("/login")
  };

  return (
    <>
      <div
        className={clsx(
          "bg-white text-secondary flex flex-col transition-all duration-300 group border-r border-foreground/10",
          open
            ? "fixed top-0 left-0 h-screen w-48 z-50"
            : "fixed top-0 left-0 h-screen w-0 z-50 overflow-hidden md:relative md:w-20",
          "md:sticky md:top-0 md:h-screen md:hover:w-48"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 md:justify-center">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 rounded-xl object-cover"
          />
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-between">
          <div>
            {menuItems.map((item) => {
              const active = location.pathname === item.path
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex items-center gap-3.5 pr-4 pl-6 py-3 hover:bg-gray-300 transition-colors",
                    active && "bg-gray-300"
                  )}
                >
                  <Icon className={clsx("text-2xl shrink-0", active && "text-foreground")} />
                  <span
                    className={clsx(
                      "whitespace-nowrap transition-opacity duration-300",
                      "opacity-100 md:opacity-0 md:group-hover:opacity-100",
                      active && "text-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 pr-4 pl-6 py-3 hover:bg-gray-300 cursor-pointer"
          >
            <RiLogoutCircleRLine className="text-lg shrink-0" />
            <span
              className={clsx(
                "whitespace-nowrap transition-opacity duration-300",
                "opacity-100 md:opacity-0 md:group-hover:opacity-100"
              )}
            >
              Log Out
            </span>
          </button>
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}
