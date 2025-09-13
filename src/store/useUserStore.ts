import { create } from 'zustand'
import type { IUser } from '@/types/user'
import { getUsers, createUser } from "@/api/users"

interface UserState {
  user: IUser | null
  login: (username: string) => Promise<boolean>
  logout: () => void
  registerUser: (user: Omit<IUser, "id" | "password">) => Promise<boolean>
}

export const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),

  login: async (username) => {
    try {
      const users = await getUsers();
      const matched = users.find((u: IUser) => u.username === username)
      if (matched) {
        localStorage.setItem('user', JSON.stringify(matched))
        set({ user: matched })
        return true
      }
      return false
    } catch (err) {
      console.error(err)
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('user')
    set({ user: null })
  },

  registerUser: async (user) => {
    try {
      const users = await getUsers();
      const matched = users.find((u: IUser) => u.username === user.username)
      if (matched) {
        return false
      }
      await createUser(user)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  },
}))
