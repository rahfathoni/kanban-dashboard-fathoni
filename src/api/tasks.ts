import axios from 'axios'
import type { ITask } from '@/types/task'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getTasks = async () => {
  try {
    const res = await API.get<ITask[]>('/tasks')
    return res.data
  } catch (err) {
    console.error('Failed to fetch tasks:', err)
    return []
  }
}