import type { Task } from "../types/task"

const titles = [
  "Design dashboard",
  "Fix login bug",
  "API integration",
  "Build UI",
  "Write tests",
  "Optimize load",
  "Refactor code",
  "Add filters",
  "Timeline view",
  "Drag drop",
]

const users = [
  "Alex",
  "John",
  "Sara",
  "Mike",
  "David",
  "Emma",
]

const priorities = [
  "low",
  "medium",
  "high",
  "critical",
] as const

const statuses = [
  "todo",
  "inprogress",
  "review",
  "done",
] as const

export function generateTasks(): Task[] {
  return Array.from(
    { length: 500 },
    (_, i) => {
      const start = new Date()
      start.setDate(
        Math.floor(Math.random() * 20) + 1
      )

      const due = new Date(start)
      due.setDate(
        start.getDate() +
          Math.floor(
            Math.random() * 10
          )
      )

      return {
        id: i + 1,
        title:
          titles[
            Math.floor(
              Math.random() *
                titles.length
            )
          ] + " " + (i + 1),

        assignee:
          users[
            Math.floor(
              Math.random() *
                users.length
            )
          ],

        priority:
          priorities[
            Math.floor(
              Math.random() *
                priorities.length
            )
          ],

        status:
          statuses[
            Math.floor(
              Math.random() *
                statuses.length
            )
          ],

        startDate: start,
        dueDate: due,
      }
    }
  )
}