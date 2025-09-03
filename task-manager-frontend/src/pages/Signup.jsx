//Signup.jsx


import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await API.post("api/auth/signup", { email, password });
    navigate("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow w-80 space-y-3">
        <h2 className="text-xl font-bold">Sign Up</h2>
        <input type="email" placeholder="Email" className="w-full border p-2"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full border p-2"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">Sign Up</button>
      </form>
    </div>
  );

}
