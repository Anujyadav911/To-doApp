import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todos';
import connectDB from './db/connect';

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());

// All the business logic lives in the routes - keeping this file dead simple
app.use('/api/todos', todoRoutes);

// Connect to Mongo first, then start listening so we never serve before the DB is ready
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
