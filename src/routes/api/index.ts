import { Router } from 'express';
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.use((req, res) => {
    res.status(404).send('Wrong route!');
});

export default router;