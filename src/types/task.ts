export interface ITask {
  id: string
  name: string
  description: string
  team: string[] | []
  status: string
  createdAt: string;
  updatedAt: string
}