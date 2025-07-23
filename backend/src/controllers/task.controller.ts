import { Request, Response } from 'express';
import { Task } from '../models/task.model';

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description });
  res.status(201).json(task);
};

export const getRecentTasks = async (_: Request, res: Response) => {
  const tasks = await Task.findAll({
    where: { is_completed: false },
    order: [['created_at', 'DESC']],
    limit: 5
  });
  res.json(tasks);
};

export const markTaskDone = async (req: Request, res: Response) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  await task.update({ is_completed: true });
  res.json({ message: 'Task marked as completed' });
};
