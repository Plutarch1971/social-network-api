import { Schema, Types, Document } from 'mongoose';

interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<IReaction>({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        getters: true,
        transform: (doc, ret) => {
            ret.createdAt = ret.createdAt.toISOString();
            return ret;
        }
    },
    id: false,
});

export { reactionSchema, IReaction };