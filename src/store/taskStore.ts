import { create } from "zustand"
import { generateTasks } from "../utils/generateTasks"
import type { Task, Status } from "../types/task"

interface User {
  id: number
  name: string
  color: string
  taskId: number
}

interface TaskStore {
  tasks: Task[]
  users: User[]
  updateStatus: (id: number, status: Status) => void
  moveUsers: () => void
}

export const useTaskStore =
  create<TaskStore>((set, get) => ({
    tasks: generateTasks(),

    users: [
      {
        id: 1,
        name: "A",
        color: "#ef4444",
        taskId: 1,
      },
      {
        id: 2,
        name: "B",
        color: "#3b82f6",
        taskId: 5,
      },
      {
        id: 3,
        name: "C",
        color: "#22c55e",
        taskId: 10,
      },
    ],

    updateStatus: (id, status) =>
      set((state) => ({
        tasks: state.tasks.map(
          (task) =>
            task.id === id
              ? { ...task, status }
              : task
        ),
      })),

    moveUsers: () => {
      const tasks = get().tasks

      set((state) => ({
        users: state.users.map(
          (u) => ({
            ...u,
            taskId:
              tasks[
                Math.floor(
                  Math.random() *
                    tasks.length
                )
              ].id,
          })
        ),
      }))
    },
  }))