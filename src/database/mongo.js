import mongoose from 'mongoose';

const databaseUrl = process.env.MONGODB_URI;

export const connectToMongoDB = () => {
    mongoose.connect(databaseUrl)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
};
