// src/index.ts
import express, { Request, Response } from 'express';
import connection from './db';
import cors from 'cors';
import tasksRouter from './routes/tasks';
import deptRouter from './routes/department';
import categoryRouter from './routes/category';


const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

// Root path handler
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Node.js Express Server!');
});

app.use('/tasks', tasksRouter);
app.use('/department',deptRouter);
app.use('/category',categoryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
