import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/socialNetworkDB';

mongoose.connect(connectionString, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

export default db;
