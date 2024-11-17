import { Router } from 'express';
import { User } from '../../models/User';
import { 
getAllUsers,
getUserById,
createUser,
updateUser,
deleteUser 
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.get('/', getAllUsers);

// /api/users/:userId
router.get('/:id', getUserById);

// /api/users
router.post('/', createUser);

// /api/users/:userId
router.put('/:id', updateUser);

// /api/users/:userId
router.delete('/:id', deleteUser);

//Get all users
router.get('/', async (_req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (err){
        res.status(500).json(err);
    }
});

export default router ;