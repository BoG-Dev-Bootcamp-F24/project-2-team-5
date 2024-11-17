import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
console.log('MongoDB URI:', MONGODB_URI ? 'exists' : 'not found');
if (!MONGODB_URI) {
  throw new Error('No URI Set!');
}

async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    return await mongoose.connect(MONGODB_URI as string);
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default connectDB;