import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import UserRouter from "../routes/UserRoutes.js";
import ResponseRoutes from "../routes/ResponseRoute.js";
import connectDB from "../config/mongodbConfig.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors())
// Connect to MongoDB
connectDB().catch(err => console.error(err));

// Adding body-parser middleware at application level
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRouter)

app.use('/api/response', ResponseRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})