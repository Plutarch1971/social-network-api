import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';
import { Router } from 'express';


const router = Router();

//Aggregate function to get number of all thoughts
export const headCount = async () => {
    const numberOfThoughts = await Thought.aggregate()
        .count('reactionCount');
    return numberOfThoughts;
}


//Get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();

        const thoughtObj = {
            thoughts,
            headCount: await headCount(),
        }

        res.json(thoughtObj);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

//Get thought by id
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId)
        .populate('reactions');
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                 message: 'No thought found with this id!' 
                });
        } 
    } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    };


//Create a thought
export const createThought = async (req: Request, res: Response): Promise<void> => {
    try {
        // First check if user exists
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(404).json({ message: 'No user found with this username!' });
            return;
        }
        // If user exists, create thought
        const thought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username
    });

        // Update user's thoughts array
        await User.findOneAndUpdate(
            {_id: user._id},
            {$push: { thoughts : thought._id}},
            { new: true}
        );
        if (!user) {
             res.status(404).json({ message: 'No user found with this username!' });
            return;
          }
        res.json(thought);
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response) => {
    
 try{ 
    const thoughtId  = req.params.thoughtId;

    const thought = await Thought.findByIdAndUpdate(
    thoughtId,
    { $push: { reactions: req.body}},
    { new: true, runValidators: true}
 );

 }catch (error: any) {
     res.status(500).json({
         message: error.message
     });
 }
}

// Remove a reaction from a thought

export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { thoughtId, reactionId } = req.params;

        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            { $pull: { reactions: { reactionId }}},
            { new: true}
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }

    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update a thought
export const updateThought = async (req: Request, res: Response) => {
    
    try {
        const thoughtId  = req.params.thoughtId;

        const thought = await Thought.findByIdAndUpdate(thoughtId, req.body, {
            new: true,
            runValidators: true,
        });
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({
                message: 'No thought found with this id!'
            });
        } 
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
};


// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findByIdAndDelete( req.params.id );
        if(!thought){
            res.status(404).json({ message: 'Thought not found with this id!'});
        }
        res.json({ message: 'Thought deleted successfully!'});
    } catch (err){
        res.status(500).json(err);
    }
};

export default router;