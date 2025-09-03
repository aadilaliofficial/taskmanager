// src/pages/Tasks.jsx

import { useEffect, useState } from "react";
import API from "../utils/api";
import TaskCard from "../components/TaskCard";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await API.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle task status
  const toggleTask = async (id) => {
    try {
      await API.patch(`/tasks/${id}/toggle`);
      fetchTasks();
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <button
          onClick={logout}
          className="bg-gray-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <form onSubmit={addTask} className="flex mb-4 space-x-2">
        <input
          className="flex-1 border p-2"
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 rounded">
          Add
        </button>
      </form>

      <div>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}