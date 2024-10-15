
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connection from './db.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import verifyRoutes from './routes/verify.js';
import resetRoutes from './routes/reset.js';
import forgotRoutes from './routes/forgot.js';
import cron from 'node-cron';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
connection();

app.use(express.json());

// CORS for deployment
app.use(cors({
    origin: 'https://studentexplorer.netlify.app', // Frontend URL
    methods: 'GET,POST,PUT,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow credentials like cookies, etc.
}));

// CORS for development 
// app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/verify-email', verifyRoutes);
app.use('/api/reset-password', resetRoutes);
app.use('/api/forgot-password', forgotRoutes);

app.get('/health', (req, res) => {
    res.send('Server is running!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
    
    const publicUrl = process.env.RENDER_URL; 

    cron.schedule('* * * * *', async () => {
        try {
            const response = await fetch(`${publicUrl}/health`);
            console.log('Pinged health endpoint:', response.status);
        } catch (error) {
            console.error('Error pinging health endpoint:', error);
        }
    });
    
});
