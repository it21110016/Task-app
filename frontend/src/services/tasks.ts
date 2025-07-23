import axios from 'axios';

export interface Task {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
}

const API_BASE = 'http://localhost:5000/api/v1/tasks';

export const TaskService = {
  async getAll(): Promise<Task[]> {
    const res = await axios.get<Task[]>(API_BASE);
    return res.data;
  },

  async create(title: string, description: string): Promise<Task> {
    const res = await axios.post<Task>(API_BASE, { title, description });
    return res.data;
  },

  async markDone(id: number): Promise<void> {
    await axios.put(`${API_BASE}/${id}/done`);
  },
};
