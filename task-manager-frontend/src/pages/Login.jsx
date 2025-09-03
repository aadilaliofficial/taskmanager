//Login jsx  


import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/tasks");
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message || err.response.data.error);
    } else {
      alert("Login failed. Please try again.");
    }
  }
};

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80 space-y-3">
        <h2 className="text-xl font-bold">Login</h2>
        <input type="email" placeholder="Email" className="w-full border p-2"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full border p-2"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Login</button>
      </form>

      <button onClick={https://taskmanager-five-chi.vercel.app/}>  </button>
    </div>
  );

}




