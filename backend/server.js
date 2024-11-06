import dotenv from 'dotenv';
dotenv.config(); // Make sure this is at the top
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDatabase } from './src/db/init.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize the database
initDatabase();

// Subscriber Schema and Model
const subscriberSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Routes
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;
    try {
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Email already subscribed!' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

app.get('/api/subscribers', async (req, res) => {
    try {
        const subscribers = await Subscriber.find(); // Fetches all subscribers
        res.status(200).json(subscribers);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


