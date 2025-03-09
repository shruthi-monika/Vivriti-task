import axios from "axios";

const API_BASE_URL = "https://dummyjson.com/products";

export const getProducts = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.products; 
};

export const searchProducts = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/search?q=${query}`);
  return response.data.products;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${API_BASE_URL}/category/${category}`);
  return response.data.products;
};
