import { Thought, User } from '../models/index';

const cleanDB = async (): Promise<void> => {
  try {
    // Delete all users
    const deletedUsers = await User.deleteMany({});
    console.log(`User collection cleaned: ${deletedUsers.deletedCount} documents removed.`);

    // Delete all thoughts (reactions will be automatically deleted as they are subdocuments)
    const deletedThoughts = await Thought.deleteMany({});
    console.log(`Thought collection cleaned: ${deletedThoughts.deletedCount} documents removed.`);

    console.log('Database cleaned successfully.');
  } catch (err) {
    console.error('Error cleaning database:', err);
    throw err; // Let the calling function handle the error
  }
};

export default cleanDB;