import { useTaskStore } from "../store/taskStore"

const columns = [
  { key: "todo", title: "To Do" },
  { key: "inprogress", title: "In Progress" },
  { key: "review", title: "Review" },
  { key: "done", title: "Done" }
]

export default function Kanban() {
  const { tasks, users } = useTaskStore()

  return (
    <div className="grid grid-cols-4 gap-4">
      {columns.map((col) => (
        <div key={col.key} className="bg-gray-100 p-3 rounded">
          
          <h2 className="font-bold mb-3">
            {col.title} (
            {tasks.filter(t => t.status === col.key).length}
            )
          </h2>

          {tasks
            .filter((task) => task.status === col.key)
            .map((task) => (
              <div
                key={task.id}
                className="bg-white p-2 mb-2 rounded shadow"
              >
                <div className="font-semibold">
                  {task.title}
                </div>

                {/* assignee */}
                <div className="text-sm text-gray-500">
                  {task.assignee}
                </div>

                {/* priority */}
                <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                  {task.priority}
                </span>

                {/* users */}
                <div className="flex gap-1 mt-1">
                  {users
                    .filter((u) => u.taskId === task.id)
                    .map((u) => (
                      <div
                        key={u.id}
                        className="w-5 h-5 rounded-full text-white text-xs flex items-center justify-center"
                        style={{ background: u.color }}
                      >
                        {u.name}
                      </div>
                    ))}
                </div>

              </div>
            ))}
        </div>
      ))}
    </div>
  )
}