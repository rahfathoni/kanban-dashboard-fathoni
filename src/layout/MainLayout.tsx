import Sidebar from "@/components/Sidebar"
import HeaderBar from "@/components/HeaderBar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-screen">
        <HeaderBar />
        <main className="flex-1 py-8 px-6 sm:px-10 md:px-25 lg:px-40 bg-background min-h-screen overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
