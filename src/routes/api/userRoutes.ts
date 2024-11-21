import { Router } from 'express';
import { 
getAllUsers,
getUserById,
createUser,
updateUser,
deleteUser,
addFriend,
deleteFriend
} from '../../controllers/userController.js';

import { 
createThought, 
deleteThought, 
getAllThoughts,
getThoughtById,
updateThought
} from '../../controllers/thoughtController.js';
 



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

// /api/users/:userId/thoughts
router.post('/:userId/thoughts', createThought);

//api/users/:userId/thoughts
router.get('/:userId/thoughts', getAllThoughts);

//api/users/:userId/:thoughtId
router.get('/:userId/:thoughtId', getThoughtById);

//api/users/:userId/:thoughtId
router.put('/:userId/:thoughtId', updateThought);


//api/users/:userId/thoughtId/:friendId
router.delete('/:userId/:thoughtId', deleteThought);
// /api/users/:userId
router.put('/:id', updateUser);

// /api/users/:userId
router.delete('/:id', deleteUser);

export default router ;