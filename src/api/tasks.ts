import axios from "axios"
import type { ITask } from "@/types/task"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getTasks = async () => {
  try {
    const res = await API.get<ITask[]>("/tasks")
    return res.data
  } catch (err) {
    console.error("Failed to fetch tasks:", err)
    return []
  }
}

export const getTaskById = async (id: number | string) => {
  try {
    const res = await API.get<ITask>(`/tasks/${id}`)
    return res.data
  } catch (err) {
    console.error("Failed to fetch tasks:", err)
    return null
  }
}

export const addTask = async (task: Omit<ITask, "id">) => {
  try {
    const res = await API.post<ITask>("/tasks", task)
    return res.data
  } catch (err) {
    console.error("Failed to add task:", err)
    throw err
  }
}

export const editTaskById = async (id: string | number, task: Omit<ITask, "id" | "createdAt">) => {
  try {
    const res = await API.put<ITask>(`/tasks/${id}`, task)
    return res.data
  } catch (err) {
    console.error("Failed to edit task:", err)
    throw err
  }
}

export const editTaskOnlyStatus = async (id: string | number, status: string) => {
  try {
    const res = await API.put<ITask>(`/tasks/${id}`, { status })
    return res.data
  } catch (err) {
    console.error("Failed to edit task status:", err)
    throw err
  }
}

export const deleteTaskById = async (id: string | number) => {
  try {
    const res = await API.delete<ITask>(`/tasks/${id}`)
    return res.data
  } catch (err) {
    console.error("Failed to delete task:", err)
    throw err
  }
}
