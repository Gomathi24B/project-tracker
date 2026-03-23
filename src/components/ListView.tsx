import { useState, useMemo } from "react"
import { useTaskStore } from "../store/taskStore"
import type { Status } from "../types/task"

export default function ListView() {
  const { tasks, updateStatus } = useTaskStore()

  const [sortKey, setSortKey] =
    useState<"title" | "priority" | "dueDate">(
      "title"
    )

  const [direction, setDirection] =
    useState<"asc" | "desc">("asc")

  const sorted = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let value = 0

      if (sortKey === "title") {
        value = a.title.localeCompare(b.title)
      }

      if (sortKey === "priority") {
        const order = {
          critical: 4,
          high: 3,
          medium: 2,
          low: 1,
        }

        value =
          order[b.priority] -
          order[a.priority]
      }

      if (sortKey === "dueDate") {
        value =
          a.dueDate.getTime() -
          b.dueDate.getTime()
      }

      return direction === "asc"
        ? value
        : -value
    })
  }, [tasks, sortKey, direction])

  const rowHeight = 50
  const containerHeight = 500

  const [scrollTop, setScrollTop] =
    useState(0)

  const start =
    Math.floor(scrollTop / rowHeight)

  const visibleCount =
    Math.ceil(
      containerHeight / rowHeight
    ) + 5

  const visible = sorted.slice(
    start,
    start + visibleCount
  )

  return (
    <div>
      <table className="w-full border mb-2">
        <thead>
          <tr className="bg-gray-100">
            <th
              className="cursor-pointer"
              onClick={() => {
                setSortKey("title")
                setDirection(
                  direction === "asc"
                    ? "desc"
                    : "asc"
                )
              }}
            >
              Title
            </th>

            <th>Assignee</th>

            <th
              className="cursor-pointer"
              onClick={() => {
                setSortKey("priority")
                setDirection(
                  direction === "asc"
                    ? "desc"
                    : "asc"
                )
              }}
            >
              Priority
            </th>

            <th
              className="cursor-pointer"
              onClick={() => {
                setSortKey("dueDate")
                setDirection(
                  direction === "asc"
                    ? "desc"
                    : "asc"
                )
              }}
            >
              Due Date
            </th>

            <th>Status</th>
          </tr>
        </thead>
      </table>

      <div
        style={{
          height: containerHeight,
          overflow: "auto",
        }}
        onScroll={(e) =>
          setScrollTop(
            e.currentTarget.scrollTop
          )
        }
      >
        <div
          style={{
            height:
              sorted.length * rowHeight,
            position: "relative",
          }}
        >
          {visible.map((task, i) => (
            <div
              key={task.id}
              className="grid grid-cols-5 border-b items-center px-2"
              style={{
                position: "absolute",
                top:
                  (start + i) *
                  rowHeight,
                height: rowHeight,
                left: 0,
                right: 0,
              }}
            >
              <div>{task.title}</div>

              <div>
                {task.assignee}
              </div>

              <div>
                {task.priority}
              </div>

              <div>
                {task.dueDate.toDateString()}
              </div>

              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(
                    task.id,
                    e.target
                      .value as Status
                  )
                }
              >
                <option value="todo">
                  To Do
                </option>
                <option value="inprogress">
                  In Progress
                </option>
                <option value="review">
                  Review
                </option>
                <option value="done">
                  Done
                </option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}