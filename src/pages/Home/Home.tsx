import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import type { DragEndEvent } from "@dnd-kit/core"
import { useState, useEffect, useCallback } from "react"
import { useUserStore } from "@/store/useUserStore"
import { UiButton, UiLoading } from "@/components/ui/index"
import TaskModalAddEdit from "@/pages/Home/components/TaskModalAddEdit"
import TaskColumn from "@/pages/Home/components/TaskColumn"
import { statusItems } from "@/constants/options"
import { getTasks, addTask, editTaskOnlyStatus } from "@/api/tasks"
import { fakeDelay, nowDate } from "@/utils/index"
import { useGlobalStore } from "@/store/useGlobalStore"
import type { ITask } from "@/types/task"

export default function Home() {
  const user = useUserStore((state) => state.user)
  const [tasks, setTasks] = useState<ITask[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)
  const addToast = useGlobalStore((state) => state.addToast)

  const fetchTasks = useCallback(async () => {
    setIsLoading(true)
    try {
      await fakeDelay()
      const fetchedTasks = await getTasks()
      setTasks(fetchedTasks)
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
      setError("Failed to fetch tasks")
      addToast({ message: "Failed to fetch tasks", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }, [addToast])

  const submitNewTask = async (
    val: Omit<ITask, "id" | "createdAt" | "updatedAt">
  ) => {
    setIsLoadingModal(true)
    try {
      const now = nowDate()
      const newTask: Omit<ITask, "id"> = {
        ...val,
        createdAt: now,
        updatedAt: now,
      }

      await addTask(newTask)
      addToast({ message: "Create new task success!", type: "success" })
      setIsModalAddOpen(false)
      fetchTasks()
    } catch (err) {
      console.error("Failed to add task:", err)
      addToast({ message: "Failed to add tasks", type: "error" })
    } finally {
      setIsLoadingModal(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchTasks()
  }, [fetchTasks])

  const handleAddTask = () => {
    setIsLoadingModal(false)
    setIsModalAddOpen(true)
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const taskId = String(active.id)
    const newStatus = String(over.id)

    const prevTask = tasks.find((item) => item.id === taskId)
    if (!prevTask) return
    if (prevTask.status === newStatus) return

    setTasks((prev) =>
      prev.map((task) =>
        String(task.id) === taskId ? { ...task, status: newStatus } : task
      )
    )

    try {
      await editTaskOnlyStatus(taskId, newStatus)
      addToast({ message: "Task status updated!", type: "success" })
    } catch (err) {
      console.error("Failed to update task status:", err)
      addToast({ message: "Failed to update task status", type: "error" })
      await fetchTasks()
    }
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  return (
    <main className="space-y-8">
      <section className="flex justify-between items-center gap-2">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold">
          Hello {user ? user.name : "partner"}, Here's your tasks
        </h1>
        <UiButton 
          type="button" 
          className="max-w-28"
          loading={isLoading}
          onClick={handleAddTask}
        >
          Add a task
        </UiButton>
      </section>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <section className="flex gap-4 overflow-x-auto pb-4 max-w-full">
          {isLoading ? (
            <div className="p-8 text-center flex-1">
              <UiLoading text="Loading Task..." />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-danger flex-1">Error: {error}</div>
          ) : (
            <div className="flex gap-4 min-w-120">
              {statusItems.map((status) => {
                const taskByStatus = tasks.filter((task) => task.status === status.value)
                return (
                  <TaskColumn
                    key={status.value}
                    id={status.value}
                    title={status.label}
                    tasks={taskByStatus}
                  />
                )
              })}
            </div>
          )}
        </section>
      </DndContext>

      <TaskModalAddEdit
        isOpen={isModalAddOpen}
        isLoading={isLoadingModal}
        onClose={() => setIsModalAddOpen(false)}
        onSubmit={input => submitNewTask(input)}
      />
    </main>
  )
}