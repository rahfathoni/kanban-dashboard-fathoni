import { useEffect, useState } from "react"
import { UiButton, UiModal, UiInput } from "@/components/ui/index"
import { AiOutlineWarning } from "react-icons/ai"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { createUser } from "@/api/users"
import { useGlobalStore } from "@/store/useGlobalStore"
import type { IUser } from "@/types/user"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegisterModal({ isOpen = false, onClose }: RegisterModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const addToast = useGlobalStore((s) => s.addToast)

  useEffect(() => {
    setShowPassword(false)
    setIsLoading(false)
    setSubmitted(false)
    if (isOpen) {
      setName("")
      setUsername("")
      setPassword("")
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    if (!username || !password || !name) return

    setIsLoading(true)
    const newUser: Omit<IUser, "id" | "password"> = {
      username,
      name,
    }
    try {
      await createUser(newUser)
      addToast({ message: "Registered account success", type: "success" })
      onClose()
    } catch (err) {
      console.error("Failed to register account:", err)
      addToast({ message: "Failed to register account", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UiModal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      title="Register Account"
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-start gap-2 rounded-md border border-yellow-300 bg-yellow-50 px-3 py-2 text-xs text-yellow-800">
            <AiOutlineWarning className="h-4 w-4 flex-shrink-0 text-yellow-600" />
            <p>
              <strong>Development Mode</strong> - In this mode, passwords are neither checked nor stored. <br />
              For your safety, please do not use your real password.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-xs font-semibold text-secondary">
              Username*
            </label>
            <UiInput
              className="!text-sm !p-2"
              placeholder="Username here..."
              type="text"
              variant="solid"
              disabled={isLoading}
              value={username}
              error={submitted && !username ? "" : undefined}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-xs font-semibold text-secondary">
              Password*
            </label>
            <div className="relative">
            <UiInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pr-10"
              variant="solid"
              value={password}
              disabled={isLoading}
              error={submitted && !password ? "" : undefined}
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
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-xs font-semibold text-secondary">
              Name*
            </label>
            <UiInput
              className="!text-sm !p-2"
              placeholder="Task name here..."
              type="text"
              variant="solid"
              disabled={isLoading}
              value={name}
              error={submitted && !name ? "" : undefined}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end border-t border-t-gray-soft p-3">
          <UiButton 
            className="!rounded-lg" 
            variant="outlineBlack" 
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </UiButton>
          <UiButton
            className="!rounded-lg" 
            type="submit" 
            disabled={isLoading}
          >
            Register
          </UiButton>
        </div>
      </form>
    </UiModal>
  )
}