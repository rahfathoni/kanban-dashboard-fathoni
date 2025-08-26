import { useDroppable } from "@dnd-kit/core"
import TaskCard from "./TaskCard"
import clsx from "clsx"

interface TaskColumnProps {
  id: string
  title: string
  tasks: {
    id: string | number
    name: string
    description: string
    team: string[]
    createdAt: string
    updatedAt: string
  }[];
}

export default function TaskColumn({ 
  id, 
  title, 
  tasks 
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        "flex-1 rounded-md flex-shrink-0 p-2 transition-colors duration-200",
        isOver && "bg-gray-soft"
      )}
    >
      <h3 className="font-bold text-xs mb-4 text-secondary">{title}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  )
}