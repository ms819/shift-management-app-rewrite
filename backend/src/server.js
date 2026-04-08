import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import shiftRoutes from './routes/shiftRoutes.js';
import payrollRoutes from './routes/payrollRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/shifts', shiftRoutes);
app.use('/api/payroll', payrollRoutes);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`API server listening on port ${env.port}`);
});
