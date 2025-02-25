import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "https://two447-event-connection-platform-2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization Header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// User Signup
export const signup = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// User Login
export const login = async (data) => {
  try {
    const response = await API.post("/user/login", data);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout
export const logout = async () => {
  try {
    await API.post("/user/logout");
    localStorage.removeItem("accessToken");
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Recipes
export const getRecipes = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/recipes?limit=50");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};