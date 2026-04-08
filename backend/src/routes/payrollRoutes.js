import { Router } from 'express';
import { getPayroll } from '../services/payrollService.js';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.json(getPayroll(req.query.month));
  } catch (error) {
    next(error);
  }
});

export default router;
