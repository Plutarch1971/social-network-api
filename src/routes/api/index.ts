import { Router } from 'express';
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.use((req, res) => {
    res.status(404).send('Wrong route!');
});

export default router;