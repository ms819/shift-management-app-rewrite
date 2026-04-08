import { Router } from 'express';
import { createShift, getShifts, removeShift } from '../services/shiftService.js';

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.json(getShifts(req.query.month));
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  try {
    const created = createShift(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.json(removeShift(req.params.id));
  } catch (error) {
    next(error);
  }
});

export default router;
