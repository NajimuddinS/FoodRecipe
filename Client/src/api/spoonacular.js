import axios from 'axios';

const API_KEY = '10c4c796308c4e25b7f343f48618f193';
const BASE_URL = 'https://api.spoonacular.com/recipes';
const BACKEND_URL = "https://foodrecipe-meki.onrender.com";


export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/register`, formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

// Login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

export const searchRecipes = async (query, offset = 0) => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        query,
        offset,
        number: 12,
        addRecipeInformation: true,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search recipes');
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch recipe details');
  }
};