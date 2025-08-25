import { useEffect, useState } from "react"
import { UiButton, UiModal, UiInput, UiTextarea, UiCheckbox, UiSelect } from "@/components/ui/index"
import type { ITask } from "@/types/task"
import { teamItems, statusItems } from '@/constants/options'

interface TaskModalAddEditProps {
  isOpen: boolean
  isLoading?: boolean
  initialData?: ITask
  onClose: () => void
  onSubmit?: (data: Omit<ITask, "id" | "createdAt" | "updatedAt">) => void
}

export default function TaskModalAddEdit({ 
  isOpen, 
  isLoading = false, 
  onClose, 
  onSubmit,
  initialData
}: TaskModalAddEditProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [team, setTeam] = useState<string[] | []>(initialData?.team || [])
  const [status, setStatus] = useState(initialData?.status || "TO DO")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setSubmitted(false)
    if (isOpen) {
      setName(initialData?.name || "")
      setDescription(initialData?.description || "")
      setTeam(initialData?.team || [])
      setStatus(initialData?.status || "TO DO")
    }
  }, [isOpen, initialData])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    if (onSubmit) {
      if (!name) return

      onSubmit({
        name,
        description,
        team,
        status,
      })
    }
  }

  return (
    <UiModal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      title={initialData ? "Edit a Task" : "Add a Task"}
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-1">
            <label className="block text-xs font-semibold text-secondary">
              Task Name*
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
          <div className="flex flex-col gap-1">
            <label className="block text-xs font-semibold text-secondary">
              Description
            </label>
            <UiTextarea
              className="!text-sm !p-2"
              placeholder="Description here..."
              disabled={isLoading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <UiCheckbox
            options={teamItems}
            value={team}
            disabled={isLoading}
            required={false}
            onChange={setTeam}
          />
          <div className="flex flex-col gap-1">
            <label className="block text-xs font-semibold text-secondary">
              Status
            </label>
            <UiSelect 
              className="!text-sm !p-2"
              value={status}
              disabled={isLoading}
              onChange={(e) => setStatus(e.target.value)}
            >
              {statusItems.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </UiSelect>
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
            Submit
          </UiButton>
        </div>
      </form>
    </UiModal>
  )
}