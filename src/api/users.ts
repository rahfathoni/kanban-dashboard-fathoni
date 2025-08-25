import axios from 'axios'
import type { IUser } from '@/types/user'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getUsers = async () => {
  try {
    const res = await API.get<IUser[]>('/users');
    return res.data;
  } catch (err) {
    console.error('Failed to fetch users:', err)
    return []
  }
}

export const createUser = async (user: Omit<IUser, "id" | "password">) => {
  try {
    const res = await API.post('/users', user)
    return res.data
  } catch (err) {
    console.error('Failed to create user:', err)
    throw err
  }
}