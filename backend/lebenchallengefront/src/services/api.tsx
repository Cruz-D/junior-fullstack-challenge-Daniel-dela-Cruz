import axios from "axios";

//const API_URL ="http://backend:80/api/TaskItem"; // For Docker deployment
const API_URL = "http://localhost:5000/api/TaskItem"; // For local development



export const getAllTasks = async () => await axios.get(API_URL);
export const getTaskById = async (id: number) => await axios.get(`${API_URL}/${id}`);
export const createTask = async (task: { name: string; description: string; dueDate: string; }) => await axios.post(API_URL, task);
export const updateTask = async (id: number, task:{name: string; description: string; dueDate: string; }) => await axios.put(`${API_URL}/${id}`, task);
export const CompletedTask = async (id: number, task:{isCompleted: boolean}) => await axios.put(`${API_URL}/${id}/complete`, task);
export const setpriorityTask = async (id: number, task:{priority: number}) => await axios.put(`${API_URL}/${id}/priority`, task);
export const deleteTask = async (id: number) => await axios.delete(`${API_URL}/${id}`);