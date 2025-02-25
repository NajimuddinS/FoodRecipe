import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {registerUser} from '../api/spoonacular';

export const Signup = () => {
  const [formData, setFormData] = useState({
    Username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-red-500">Signup</h2>

        <form onSubmit={HandleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            value={formData.Username}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            placeholder="Enter Username"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="email"
            value={formData.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            value={formData.password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition"
          >
            Submit
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
