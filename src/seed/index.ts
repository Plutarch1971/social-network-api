// src/utils/seed/index.ts
import { Types } from 'mongoose';
import { User, Thought } from "../models/index.js";
import { users, thoughts, reactions } from './data.js';
import cleanDB from '../seed/cleanDB.js';
import db from '../config/connection.js';

// Define interfaces for better type safety
interface IUser {
  _id: Types.ObjectId;
  username: string;
  friends: Types.ObjectId[];
  thoughts: Types.ObjectId[];
  save(): Promise<IUser>;
}
  interface IThought {
    _id: Types.ObjectId;
    username: string;
    reactions: any[]; //You might to want to defing a proper type for reactions
  }

const seedDatabase = async () => {

  try {
    await db();
    // Clean existing data
    await cleanDB();
    
    // Seed users first
    const createdUsers = await User.create(users) as IUser[];
    console.log('Users seeded!');
    
    // Add friends
    const user1 = createdUsers[0];
    const user2 = createdUsers[1];
    const user3 = createdUsers[2];
    
    // Now TypeScript knows these are ObjectIds
    user1.friends.push(user2._id);
    user1.friends.push(user3._id);
    user2.friends.push(user1._id);
    user2.friends.push(user3._id);
    user3.friends.push(user1._id);
    user3.friends.push(user2._id);
        
    await Promise.all([
      user1.save(),
      user2.save(),
      user3.save()
    ]);
    console.log('Friend relationships seeded!');
    
    // Create thoughts and associate them with users
    const thoughtsWithUsers = thoughts.map(thought => ({
      ...thought,
      reactions: reactions.filter(reaction => reaction.username !== thought.username)
    }));
    
    const createdThoughts = await Thought.create(thoughtsWithUsers);
    console.log('Thoughts and reactions seeded!');
    
    // Update users with their thoughts
    for (const thought of createdThoughts) {
      const user = await User.findOne({ username: thought.username });
      if (user) {
        user.thoughts.push(thought._id as unknown as Types.ObjectId);
        await user.save();
      }
    }
    console.log('User thoughts updated!');

    console.log('All seed data inserted successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};
seedDatabase();
export default seedDatabase;