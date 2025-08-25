import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import imgLogin from "@/assets/kanban-login.jpg"
import { UiButton, UiInput } from "@/components/ui/index"
import { useUserStore } from "@/store/useUserStore"
import { useGlobalStore } from "@/store/useGlobalStore"
import RegisterModal from "@/pages/Login/components/RegisterModal"
import clsx from "clsx"

export default function Login() {
  const navigate = useNavigate()
  const login = useUserStore((state) => state.login)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const addToast = useGlobalStore((state) => state.addToast)
  const [isModalRegisterOpen, setIsModalRegisterOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (!username || !password) return

    setLoading(true)
    try {
      const success = await login(username);
      setLoading(false)
      if (success) {
        navigate("/")
        addToast({ message: "Login Success, Welcome !", type: "success" })
      } else {
        addToast({ message: "Wrong Username or password", type: "error" })
      }
    } catch (err) {
      console.error(err)
      addToast({ message: "Wrong Username or password", type: "error" })
      setLoading(false)
    }
  }

  const handleRegister = () => {
    setIsModalRegisterOpen(true)
  }

  useEffect(() => {
    setSubmitted(false)
    setLoading(false)
  }, [])
  

  return (
    <div className="flex h-screen bg-white">
      <div className="hidden sm:block md:block lg:block w-1/2">
        <img
          src={imgLogin}
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-sm w-full px-6 md:px-8">
          <h1 className="text-3xl font-bold mb-16">Login</h1>
          <form className="flex flex-col gap-8" onSubmit={handleLogin}>
            <UiInput
              placeholder="Username"
              type="text"
              value={username}
              disabled={loading}
              error={submitted && !username ? "Username is required" : undefined}
              onChange={e => setUsername(e.target.value)}
            />
            <div className="relative">
              <UiInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pr-10"
                value={password}
                disabled={loading}
                error={submitted && !password ? "Password is required" : undefined}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="mt-7">
              <UiButton 
                className="!text-2xl !font-semibold"
                type="submit" 
                loading={loading}
              >
                Login
              </UiButton>
            </div>
          </form>
          <div className="flex items-center justify-end mt-3">
            <p className="text-md text-primary">
              Don't have an account?{" "}
              <span
                className={clsx(
                  "font-bold hover:underline",
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                )}
                onClick={loading ? undefined : handleRegister}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>

      <RegisterModal 
        isOpen={isModalRegisterOpen}
        onClose={() => setIsModalRegisterOpen(false)}
      />
    </div>
  )
}