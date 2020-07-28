import express from 'express';
import population from './population';

const router = express.Router();

router.use('/api/v1', population);

export default router;
