import { useTaskStore } from "../store/taskStore"

export default function Timeline() {
  const { tasks } = useTaskStore()

  const daysInMonth = 31
  const dayWidth = 80
  const today = new Date().getDate()

  return (
    <div className="overflow-auto border p-4">
      <div
        className="relative"
        style={{
          width: daysInMonth * dayWidth,
          height: tasks.length * 40,
        }}
      >
        {/* header days */}
        <div className="flex sticky top-0 bg-white z-10">
          {Array.from(
            { length: daysInMonth },
            (_, i) => (
              <div
                key={i}
                className="text-xs border-r text-center"
                style={{
                  width: dayWidth,
                }}
              >
                {i + 1}
              </div>
            )
          )}
        </div>

        {/* today line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-red-500"
          style={{
            left: today * dayWidth,
          }}
        />

        {tasks.map((task, index) => {
          const start = task.startDate
            ? new Date(
                task.startDate
              ).getDate()
            : new Date(
                task.dueDate
              ).getDate()

          const end = new Date(
            task.dueDate
          ).getDate()

          return (
            <div
              key={task.id}
              className="absolute h-6 rounded text-xs text-white flex items-center px-2"
              style={{
                top: index * 35 + 30,
                left: start * dayWidth,
                width:
                  (end - start + 1) *
                  dayWidth,
                background:
                  task.priority ===
                  "critical"
                    ? "#ef4444"
                    : task.priority ===
                      "high"
                    ? "#f97316"
                    : task.priority ===
                      "medium"
                    ? "#eab308"
                    : "#22c55e",
              }}
            >
              {task.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}