import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { getUsers } from "@/api/users"
import type { IUser } from "@/types/user"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const stored = localStorage.getItem("user")
      if (!stored) {
        setIsAllowed(false)
        setLoading(false)
        return;
      }

      const parsedUser = JSON.parse(stored);
      try {
        const users = await getUsers();
        const matched = users.find((u: IUser) =>
          u.username === parsedUser.username && u.name === parsedUser.name
        )

        setIsAllowed(Boolean(matched));

        if (!matched) {
          localStorage.removeItem("user")
        }
      } catch (err) {
        console.error(err)
        setIsAllowed(false)
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    };

    checkUser()
  }, [])

  if (loading) return <div>Loading...</div>

  return isAllowed ? <>{children}</> : <Navigate to="/login" state={{ from: location }} replace />
}
