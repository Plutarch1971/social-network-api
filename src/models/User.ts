import { Schema, Types, model, type Document } from 'mongoose';


interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
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
        validator: function (v: string) {
          return /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/.test(v);
        },
        message: (props: any) => `${props.value} is not a valid email address!`,
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
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual to get friend count
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Middlewares if needed
// userSchema.pre('remove', async function (next) {
//   // Could add middleware to remove associated thoughts when a user is deleted
//   next();
// });

const User = model<IUser>('User', userSchema);

export default User;

