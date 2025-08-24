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

export const createUser = async (data: { username: string; password: string; name: string }) => {
  try {
    const res = await API.post('/users', data)
    return res.data
  } catch (err) {
    console.error('Failed to create user:', err)
    throw err
  }
}