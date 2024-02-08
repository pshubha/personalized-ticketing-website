import express, { Router, Request, Response } from 'express';
import connection from '../db';

const router: Router = express.Router();

//create department
router.post('/', async (req: Request, res: Response) => {
    try {
      const { deptName } = req.body;
      connection.run('INSERT INTO department (deptName, createdAt, updatedAt) VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [deptName], function(err) {
        if (err) {
          console.error('Error creating department:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ id: this.lastID }); // Access lastID using this
        }
      });
    } catch (error) {
      console.error('Error creating department:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Read all department
router.get('/', async (req: Request, res: Response) => {
    try {
      connection.all('SELECT * FROM department', (err, dept) => {
        if (err) {
          console.error('Error reading department :', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(dept);
        }
      });
    } catch (error) {
      console.error('Error reading department:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const { deptName } = req.body;
      const { id } = req.params;
      connection.run(
        'UPDATE department SET deptName = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        [deptName, id],
        function(err) {
          if (err) {
            console.error('Error updating department :', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.json({ message: 'Department updated successfully' });
          }
        }
      );
    } catch (error) {
      console.error('Error updating department :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Delete department
router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await connection.run('DELETE FROM department WHERE id = ?', [id]);
      res.json({ message: 'Department deleted successfully' });
    } catch (error) {
      console.error('Error deleting department:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;