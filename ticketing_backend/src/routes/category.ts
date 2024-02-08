import express, { Router, Request, Response } from 'express';
import connection from '../db';

const router: Router = express.Router();

//create category
router.post('/', async (req: Request, res: Response) => {
    try {
      const { categoryName } = req.body;
      connection.run('INSERT INTO category (categoryName, createdAt, updatedAt) VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      [categoryName], function(err) {
        if (err) {
          console.error('Error creating category:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ id: this.lastID }); // Access lastID using this
        }
      });
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Read all category
router.get('/', async (req: Request, res: Response) => {
    try {
      connection.all('SELECT * FROM category', (err, category) => {
        if (err) {
          console.error('Error reading category :', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(category);
        }
      });
    } catch (error) {
      console.error('Error reading category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const { categoryName } = req.body;
      const { id } = req.params;
      connection.run(
        'UPDATE category SET categoryName = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
        [categoryName, id],
        function(err) {
          if (err) {
            console.error('Error updating category :', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.json({ message: 'Category updated successfully' });
          }
        }
      );
    } catch (error) {
      console.error('Error updating category :', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Delete category
router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await connection.run('DELETE FROM category WHERE id = ?', [id]);
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;