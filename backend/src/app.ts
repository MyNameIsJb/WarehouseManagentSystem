import express, { Application, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Application = express();

// middlewares
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use(cors());

// Import routes
import userRoute from "./routes/userRoute";
import productRouter from "./routes/productRoute";
import galleryRouter from "./routes/galleryRoute";
import saleRouter from "./routes/saleRoute";

// Declare routes path
app.use("/user", userRoute);
app.use("/product", productRouter);
app.use("/gallery", galleryRouter);
app.use("/sale", saleRouter);

export { app };
