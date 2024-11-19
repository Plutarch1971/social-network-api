import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
// Virtual to get friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
// Middlewares if needed
// userSchema.pre('remove', async function (next) {
//   // Could add middleware to remove associated thoughts when a user is deleted
//   next();
// });
const User = model('User', userSchema);
export default User;
