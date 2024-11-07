import axios from 'axios';
import { Task } from '../types/tasks';

// Set the base URL for Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

// Set CSRF token for requests
const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');
if (csrfToken) {
    apiClient.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
}

// Fetch tasks
export const fetchTasks = async () => {
    const response = await apiClient.get('/tasks');
    return response.data;
};

// Create a new task
export const createTask = async (task: {
    title: string;
    description: string;
    deadline: string;
}) => {
    const response = await apiClient.post('/tasks', task);
    return response.data;
};

// Update an existing task
export const updateTask = async (task: Task) => {
    const response = await apiClient.put(`/tasks/${task.id}`, task);
    return response.data;
};

// Delete a task
export const deleteTask = async (taskId: number) => {
    await apiClient.delete(`/tasks/${taskId}`);
};
