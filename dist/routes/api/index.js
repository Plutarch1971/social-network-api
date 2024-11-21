import { Router } from 'express';
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';
const router = Router();
console.log('API Routes initialized');
router.use('/users', userRoutes);
console.log('User routes registered');
router.use('/thoughts', thoughtRoutes);
console.log('Thought routes registered');
router.use((req, res) => {
    res.status(404).send('Wrong route!');
});
export default router;
