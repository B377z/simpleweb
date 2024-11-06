import mongoose from 'mongoose';

export function initDatabase() {
  const DATABASE_URL = process.env.DATABASE_URL;

  // Check if the database URL is defined
  if (!DATABASE_URL) {
    console.error('Error: DATABASE_URL is not defined in the environment variables.');
    process.exit(1); // Exit if the URL is missing
  }
  
  // Listen for successful connection
  mongoose.connection.on('open', () => {
    console.info('Successfully connected to the database:', DATABASE_URL);
  });
  
  // Listen for any connection errors
  mongoose.connection.on('error', (error) => {
    console.error('Database connection error:', error);
  });

  // Connect to MongoDB with options for compatibility
  return mongoose.connect(DATABASE_URL);
}

