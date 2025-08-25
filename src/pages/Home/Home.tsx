"use client"

import { useEffect, useState, useCallback } from "react"
import { useUserStore } from "@/store/useUserStore"
import { UiButton, UiLoading } from "@/components/ui/index"
import TaskAddModal from "@/pages/Home/components/TaskAddModal"
import TaskColumn from "@/pages/Home/components/TaskColumn"
import { statusItems } from "@/constants/options"
import { getTasks, addTask } from "@/api/tasks"
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

      <section className="flex gap-4 overflow-x-auto pb-4">
        {isLoading ? (
          <div className="p-8 text-center flex-1">
            <UiLoading text="Loading Task..." />
          </div>
        ) : error ? (
          <div className="p-8 text-center text-danger flex-1">Error: {error}</div>
        ) : (
          <div className="flex gap-4 min-w-120">
            {statusItems.map((status) => {
              const taskByStatus = tasks.filter((task) => task.status === status.value);

              return (
                <TaskColumn
                  key={status.value}
                  title={status.label}
                  tasks={taskByStatus}
                />
              );
            })}
          </div>
        )}
      </section>

        <TaskAddModal
          isOpen={isModalAddOpen}
          isLoading={isLoadingModal}
          onClose={() => setIsModalAddOpen(false)}
          onSubmit={input => submitNewTask(input)}
        />
    </main>
  )
}