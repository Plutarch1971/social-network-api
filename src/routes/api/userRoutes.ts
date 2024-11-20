import { Router } from 'express';
import { User } from '../../models/index.js';
import { 
getAllUsers,
getUserById,
createUser,
updateUser,
deleteUser,
addFriend,
deleteFriend
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.get('/', getAllUsers);

// /api/users/:userId
router.get('/:id', getUserById);

// /api/users
router.post('/', createUser);

// /api/users/:userId/friends/:friendId
router.post('/:userId/friends/:friendId', addFriend);

// /api/users/:userId/friends/:friendId
router.delete('/:userId/friends/:friendId', deleteFriend);
// /api/users/:userId
router.put('/:id', updateUser);

// /api/users/:userId
router.delete('/:id', deleteUser);

export default router ;