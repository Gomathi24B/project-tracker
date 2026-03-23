import { useSearchParams } from "react-router-dom"

export default function Filters() {
  const [params, setParams] = useSearchParams()

  const statuses = ["todo", "inprogress", "review", "done"]
  const priorities = ["critical", "high", "medium", "low"]

  const updateFilter = (key: string, value: string) => {
    params.set(key, value)
    setParams(params)
  }

  return (
    <div className="flex gap-4 mb-4">

      <select
        onChange={(e) =>
          updateFilter("status", e.target.value)
        }
      >
        <option value="">All Status</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        onChange={(e) =>
          updateFilter("priority", e.target.value)
        }
      >
        <option value="">All Priority</option>
        {priorities.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <button
        onClick={() => setParams({})}
        className="border px-2"
      >
        Clear Filters
      </button>

    </div>
  )
}