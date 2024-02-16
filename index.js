import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRouter from './routes/bookRoute.js'
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to database successfuly");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;
app.listen(PORT, ()=>{
    console.log("Server is running on port "+PORT);
})

app.use('/api/books', bookRouter)
app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)




app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        statusCode: err.status || 500,
        message: err.message || 'Internal Server Error'
    });
});