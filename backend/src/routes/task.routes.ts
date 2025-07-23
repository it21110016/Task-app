import { Router } from 'express';
import { createTask, getRecentTasks, markTaskDone } from '../controllers/task.controller';

const router = Router();

router.post('/', createTask);
router.get('/', getRecentTasks);
router.put('/:id/done', markTaskDone);

export default router;
