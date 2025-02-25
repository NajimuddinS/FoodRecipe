import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "http://localhost:5070/login" : "http://localhost:5070/register";

    try {
      const res = await axios.post(url, formData);
      setMessage(res.data.message);
      if (res.data.token) localStorage.setItem("token", res.data.token);
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-red-500 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {message && <p className="text-white text-center mt-2">{message}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          {!isLogin && (
            <div>
              <label className="text-white block mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-red-500 border border-white focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="mt-3">
            <label className="text-white block mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-red-500 border border-white focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div className="mt-3">
            <label className="text-white block mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-red-500 border border-white focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-white text-red-500 font-bold py-2 rounded hover:bg-red-700 hover:text-white transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-white text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="font-bold cursor-pointer hover:underline ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Form;
