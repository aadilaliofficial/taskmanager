//TaskCard.jsx

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded mb-2">
      <span className={task.completed ? "line-through" : ""}>{task.title}</span>
      <div className="space-x-2">
        <button onClick={() => onToggle(task._id)}
          className="px-2 py-1 bg-yellow-400 rounded">
          {task.completed ? "Undo" : "Done"}
        </button>
        <button onClick={() => onDelete(task._id)}
          className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
      </div>
    </div>
  );
}