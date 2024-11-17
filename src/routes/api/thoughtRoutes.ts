import { Router } from 'express';
import { 
getAllThoughts, 
getThoughtById,
createThought,
updateThought,
deleteThought,
addReaction, 
removeReaction} from '../../controllers/thoughtController.js';

const router = Router();


// Base thought routes
router.route('/')
.get(getAllThoughts)
.post(createThought);

// Single thought routes
// /api/thoughts/:thoughtId
// /api/thoughts/:thoughtId/reactions
router.route('/')
 .get(getThoughtById)
 .put(updateThought)
 .delete(deleteThought);

// Add a reaction to a thought
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')   
.post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);


export default router;