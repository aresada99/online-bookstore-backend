import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRouter from './routes/bookRoute.js'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import apiKeyMiddleware from './middlewares/apiKeyMiddleware.js';
import cors from 'cors'
dotenv.config();


// MONGO DB CONNECTION
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to database successfuly");
    })
    .catch((err) => {
        console.log(err);
    });


// EXPRESS INIT
const app = express();
app.use(express.json());

// CORS SETTINGS
const corsOrigins = [];
for (let i = 1; process.env[`ORIGIN_${i}`]; i++) {
    corsOrigins.push(process.env[`ORIGIN_${i}`]);
}

const corsOptions = {
    origin: corsOrigins
};
app.use(cors(corsOptions));

// API KEY PROTECTION
app.use('/api', apiKeyMiddleware);

// ROUTE MIDDLEWARES
app.use('/api/books', bookRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)


// PORT SETTINGS
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})


// next() ERROR HANDLING
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        statusCode: err.status || 500,
        message: err.message || 'Internal Server Error'
    });
});