import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import userRouter from "./routes/userRoutes.js";
import inventoryRouter from "./routes/inventoryRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//     console.log("Cookies:", req.cookies);  // Debugging
//     next();
//   });
  
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:4300', 'http://localhost:4200' ],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

//Routes
app.use("/api/inventory", inventoryRouter);
app.use("/api/user", userRouter);

export default app;