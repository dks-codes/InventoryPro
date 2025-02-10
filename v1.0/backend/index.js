import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/dbConnection.js"

dotenv.config();

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});