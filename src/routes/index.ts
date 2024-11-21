import { Router } from 'express';
import apiRoutes from './api/index.js';

const router = Router();
console.log('Main routes initialized');

router.use('/api', apiRoutes);
console.log('API routes registered');

export default router;
