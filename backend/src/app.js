import express from "express";
import router from "./routes/inventoryRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:4300'],
    methods: ["GET","POST","PUT","DELETE"]
}))

//Routes
app.use("/api/inventory", router);

export default app;