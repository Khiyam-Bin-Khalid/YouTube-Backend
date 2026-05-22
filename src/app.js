
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

const app = express();

// middleware
app.use(express.json({limit:"30kb"}));
app.use(express.urlencoded({ extended: true ,limit:"30kb"}));
app.use(express.static("public"))

// basic health route (optional)
app.get("/", (req, res) => {
  res.status(200).json({ message: "YouTube-Backend is running" });
});

export default app;

