import { UiButton, UiModal } from "@/components/ui/index"

interface TaskModalDeleteProps {
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onSubmit?: () => void
}

export default function TaskModalDeleteProps({ 
  isOpen, 
  isLoading = false, 
  onClose, 
  onSubmit,
}: TaskModalDeleteProps) {

  return (
    <UiModal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      title={"Delete Task"}
      classNameFooter="flex gap-2 justify-end"
      footer={(
        <>
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
            disabled={isLoading}
            onClick={onSubmit}
          >
            Yes, delete
          </UiButton>
        </>
      )}
    >
      <div className="px-8 py-4">
        <p className="text-secondary text-sm">Are you sure want to delete this task?</p>
      </div>
    </UiModal>
  )
}