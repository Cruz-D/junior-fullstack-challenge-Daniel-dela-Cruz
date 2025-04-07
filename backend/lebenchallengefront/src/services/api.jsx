import axios from "axios";

const API_URL ="https://localhost:5000/api/TaskItem";

export const getAllTasks = async () => await axios.get(API_URL);
export const getTaskById = async (id) => await axios.get(`${API_URL}/${id}`);
export const createTask = async (task) => await axios.post(API_URL, task);
export const updateTask = async (id, task) => await axios.put(`${API_URL}/${id}/complete`, task);
export const deleteTask = async (id) => await axios.delete(`${API_URL}/${id}`);