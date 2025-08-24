"use client"

import { useEffect, useState } from "react"
import { useUserStore } from "@/store/useUserStore"
import { UiButton, UiLoading } from "@/components/ui/index"
import TaskColumn from "@/components/task/TaskColumn"
import { statusItems } from "@/constants/options"
import { getTasks } from "@/api/tasks"
import type { ITask } from "@/types/task"

export default function Home() {
  const user = useUserStore((state) => state.user);

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = () => {
    console.log("open modal")
  };

  return (
    <main className="space-y-8">
      <section className="flex justify-between items-center gap-2">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold">
          Hello {user ? user.name : "partner"}, Here's your tasks
        </h1>
        <UiButton type="button" className="max-w-28" onClick={handleAddTask}>
          Add a task
        </UiButton>
      </section>

      <section className="flex gap-8 overflow-x-auto pb-4 min-w-96">
        {isLoading ? (
          <div className="p-8 text-center flex-1">
            <UiLoading text="Loading Task..." />
          </div>
        ) : error ? (
          <div className="p-8 text-center text-danger flex-1">Error: {error}</div>
        ) : (
          statusItems.map((status) => {
            const taskByStatus = tasks.filter((task) => task.status === status.value);

            return (
              <TaskColumn
                key={status.value}
                title={status.label}
                tasks={taskByStatus}
              />
            );
          })
        )}
      </section>
    </main>
  )
}