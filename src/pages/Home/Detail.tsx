"use client"

import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from "react"
import { UiLoading, UiBreadcrumb, UiButton } from "@/components/ui/index"
import TaskDetail from "./components/TaskDetail"
import TaskModalAddEdit from "./components/TaskModalAddEdit"
import TaskModalDelete from "./components/TaskModalDelete"
import { getTaskById, editTaskById, deleteTaskById } from "@/api/tasks"
import { fakeDelay, nowDate } from "@/utils/index"
import { useGlobalStore } from "@/store/useGlobalStore"
import type { ITask } from "@/types/task"

export default function Detail() {
  const { id: paramId } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<ITask | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const addToast = useGlobalStore((state) => state.addToast)

  const fetchTaskbyId = useCallback(async () => {
    setIsLoading(true)
    try {
      if (!paramId) {
        addToast({ message: "Task not found", type: "error"})
        navigate("/")
        return
      }
      await fakeDelay()
      const fetchedTask = await getTaskById(paramId)
      if (!fetchedTask) {
        addToast({ message: "Task not found", type: "error" })
        navigate("/")
        return
      }
      setTask(fetchedTask)
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
      addToast({ message: "Failed to fetch tasks", type: "error" })
    } finally {
      setIsLoading(false)
    }
  }, [paramId, navigate, addToast])

  const editTask = async (
    val: Omit<ITask, "id" | "createdAt" | "updatedAt">
  ) => {
    setIsLoadingModal(true)
    try {
      const now = nowDate()
      const newTask: Omit<ITask, "id" | "createdAt"> = {
        ...val,
        updatedAt: now,
      }

      await editTaskById(paramId as string, newTask)
      addToast({ message: "Edit task success!", type: "success" })
      setIsModalEditOpen(false)
      fetchTaskbyId()
    } catch (err) {
      console.error("Failed to edit task:", err)
      addToast({ message: "Failed to edit tasks", type: "error" })
    } finally {
      setIsLoadingModal(false)
    }
  }

  const deleteTask = async () => {
    setIsLoadingModal(true)
    try {
      await deleteTaskById(paramId as string)
      addToast({ message: "Task already deleted", type: "success" })
      setIsModalDeleteOpen(false)
      navigate("/")
    } catch (err) {
      console.error("Failed to delete task:", err)
      addToast({ message: "Failed to delete tasks", type: "error" })
    } finally {
      setIsLoadingModal(false)
    }
  }

  useEffect(() => {
    if (!paramId) {
      addToast({ message: "Task not found", type: "error"})
      navigate("/")
      return
    }
    window.scrollTo(0, 0)
    fetchTaskbyId()
  }, [paramId, fetchTaskbyId, navigate, addToast])

  const handleEditTask = () => {
    setIsLoadingModal(false)
    setIsModalEditOpen(true)
  }

  const handleDeleteTask = () => {
    setIsLoadingModal(false)
    setIsModalDeleteOpen(true)
  }

  return (
    <main className="space-y-8">
      <section className="flex justify-start items-start gap-2">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold">
          Task Detail
        </h1>
      </section>

      <section className="flex gap-4 pb-4">
        {isLoading ? (
          <div className="p-8 text-center flex-1">
            <UiLoading text="Loading Task..." />
          </div>
        ) : (
          <div className="flex flex-col items-start justify-center w-full gap-4">
            <UiBreadcrumb
              items={[
                { label: "Dashboard", path: "/" },
                { label: task?.name || "" },
              ]}
            />

            {task && <TaskDetail task={task} />}

            <div className="flex flex-1 justify-end items-center w-full">
              <UiButton 
                className="!rounded-lg" 
                variant="primary" 
                disabled={isLoading}
                onClick={handleEditTask}
              >
                Edit task
              </UiButton>
              <div className="font-normal text-md ml-5">
                or
              </div>
              <UiButton
                className="!rounded-lg" 
                variant="ghostDanger"
                disabled={isLoading}
                onClick={handleDeleteTask}
              >
                Delete
              </UiButton>
            </div>
          </div>
        )}
      </section>

      {
        task && (
          <TaskModalAddEdit
            isOpen={isModalEditOpen}
            isLoading={isLoadingModal}
            initialData={task}
            onClose={() => setIsModalEditOpen(false)}
            onSubmit={input => editTask(input)}
          />
        ) 
      }
      {
        task && (
          <TaskModalDelete
            isOpen={isModalDeleteOpen}
            isLoading={isLoadingModal}
            onClose={() => setIsModalDeleteOpen(false)}
            onSubmit={deleteTask}
          />
        ) 
      }
    </main>
  )
}