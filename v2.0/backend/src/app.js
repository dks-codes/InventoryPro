import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import inventoryRoutes from "./routes/inventoryRoutes.js";
import userRoutes from './routes/userRoutes.js';
import dynamicFieldRoutes from './routes/dynamicFieldRoutes.js'
import morgan from "morgan";

const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:4300', 'http://localhost:4200' ],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'))



//Routes
app.use("/v2/api/user", userRoutes);
app.use("/v2/api/inventory", inventoryRoutes);
app.use("/v2/api/dynamic-fields", dynamicFieldRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;