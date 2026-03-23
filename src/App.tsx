import { useState, useEffect } from "react"
import Kanban from "./components/Kanban"
import ListView from "./components/ListView"
import Timeline from "./components/Timeline"
import { useTaskStore } from "./store/taskStore"

type View = "kanban" | "list" | "timeline"

export default function App() {
  const [view, setView] =
    useState<View>("kanban")

  const moveUsers = useTaskStore(
    (s) => s.moveUsers
  )

  // simulate collaboration
  useEffect(() => {
    const id = setInterval(() => {
      moveUsers()
    }, 2000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Project Tracker
      </h1>

      
      <div className="flex gap-2 mb-4">
        <button
          onClick={() =>
            setView("kanban")
          }
          className={`px-3 py-1 border ${
            view === "kanban"
              ? "bg-black text-white"
              : ""
          }`}
        >
          Kanban
        </button>

        <button
          onClick={() =>
            setView("list")
          }
          className={`px-3 py-1 border ${
            view === "list"
              ? "bg-black text-white"
              : ""
          }`}
        >
          List
        </button>

        <button
          onClick={() =>
            setView("timeline")
          }
          className={`px-3 py-1 border ${
            view === "timeline"
              ? "bg-black text-white"
              : ""
          }`}
        >
          Timeline
        </button>
      </div>

     
      {view === "kanban" && <Kanban />}
      {view === "list" && <ListView />}
      {view === "timeline" && <Timeline />}
    </div>
  )
}