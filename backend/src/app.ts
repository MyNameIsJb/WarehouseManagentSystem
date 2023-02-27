import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());

// Import routes
import userRoute from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import galleryRouter from "./routes/galleryRoute";

// Declare routes path
app.use("/user", userRoute);
app.use("/product", productRouter);
app.use("/gallery", galleryRouter);

export { app };
