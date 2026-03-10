import { Router, Request, Response } from 'express';
import Todo from '../models/Todo';
import { CreateTodoDto, UpdateTodoDto } from '../types';

const router = Router();

router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todos', error: String(err) });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch todo', error: String(err) });
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed = false }: CreateTodoDto = req.body;
    if (!title || !description) {
      res.status(400).json({ message: 'Title and description are required' });
      return;
    }

    // Mongoose validates and saves — no manual ID generation needed
    const todo = await Todo.create({ title, description, completed });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create todo', error: String(err) });
  }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updates: UpdateTodoDto = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update todo', error: String(err) });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete todo', error: String(err) });
  }
});

export default router;
