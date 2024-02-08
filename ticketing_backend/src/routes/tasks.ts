// src/routes/tasks.ts
import express, { Router, Request, Response } from 'express';
import connection from '../db';

const router: Router = express.Router();

// Create task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { taskName,  emailId, subject, category, status, department, priority, description } = req.body;
    connection.run('INSERT INTO tasks (taskName, emailId, subject, category, status, department, priority, description,createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
    [taskName,  emailId, subject, category, status, department, priority, description], function(err) {
      if (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ id: this.lastID }); // Access lastID using this
      }
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { taskName, emailId, subject, category, status, department, priority, description } = req.body;
    const { id } = req.params;
    connection.run(
      'UPDATE tasks SET taskName = ?, emailId = ?, subject = ?, category = ?, status = ?, department = ?, priority = ?, description = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [taskName,emailId, subject, category, status, department, priority, description, id],
      function(err) {
        if (err) {
          console.error('Error updating task:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ message: 'Task updated successfully' });
        }
      }
    );
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read all tasks
router.get('/', async (req: Request, res: Response) => {
  try {
    connection.all('SELECT * FROM tasks', (err, tasks) => {
      if (err) {
        console.error('Error reading tasks:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(tasks);
      }
    });
  } catch (error) {
    console.error('Error reading tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get single task
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    connection.get('SELECT * FROM tasks WHERE id = ?',[id], (err:any, tasks:any) => {
      if (err) {
        console.error('Error reading tasks:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(tasks);
      }
    });
  } catch (error) {
    console.error('Error reading tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Delete task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await connection.run('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
