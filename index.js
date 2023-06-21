const express = require('express');
const connectDB = require('./db/config.db');
const cors = require('cors');
require('dotenv').config();
const app = express();


// Middlewares
// app.use(cors());

app.use(cors({
     origin: 'https://rate-v1.vercel.app',
}));

app.use(express.json());

// Routes
app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/user', require('./routes/user.route'));
app.use('/api/v1/rate', require('./routes/rate.route'));
app.use('/api/v1/rateAuth', require('./routes/rateAuth.route'));

const Server = async() => {
    try {
        await connectDB()
        app.listen(process.env.PORT | 8080, () => {
            console.log('Server is running on port 8080');
        });
    } catch (error) {
        console.log(error);
    }
}

Server();
