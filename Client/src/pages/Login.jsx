import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://foodrecipe-meki.onrender.com/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);

      alert("Login successful");
      setEmail("");
      setPassword("");
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-red-500">Login</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;