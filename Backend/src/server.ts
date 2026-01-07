import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript!');
});

app.get('/api/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  res.json(users);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
