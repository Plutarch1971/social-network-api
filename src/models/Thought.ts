import { Schema , model, Document } from 'mongoose';
import { reactionSchema, IReaction } from './Reaction.js';

interface IThought extends Document{
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
    reactionCount?: number; //Virtual
}

const thoughtSchema = new Schema<IThought>({
    thoughtText : {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
      },
      reactions: [reactionSchema],
    }, {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
});
//Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;