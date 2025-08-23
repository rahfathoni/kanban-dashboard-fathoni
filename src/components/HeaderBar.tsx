import { FaBars } from "react-icons/fa"
import userImg from "@/assets/user.png"
import { useGlobalStore } from "@/store/useGlobalStore"

export default function HeaderBar() {
  const toggleSidebar = useGlobalStore((state) => state.toggle)

  return (
    <header className="bg-white flex items-center px-6 h-12 border-b border-foreground/10">
      <button 
        className="p-2 bg-white text-secondary rounded md:hidden"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <div className="flex-1"></div>

      <img
        src={userImg}
        alt="User Picture"
        className="h-8 w-8 rounded-xl object-cover"
      />
    </header>
  )
}