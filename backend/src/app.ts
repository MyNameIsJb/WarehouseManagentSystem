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
import purchaseRouter from "./routes/purchaseRoute";
import incomingProductRouter from "./routes/incomingProductRoute";
import outgoingProductRouter from "./routes/outgoingProductRoute";
import orderProductRouter from "./routes/orderProductRoute";
import dailyAttendanceRouter from "./routes/dailyAttendanceRoute";
import returnedItemRouter from "./routes/returnedItemRoute";
import barcodeGeneratorRouter from "./routes/barcodeGeneratorRoute";
import storeInventoryRouter from "./routes/storeInventoryRoute";
import storeIncomingProductRouter from "./routes/storeIncomingProductRoute";

// Declare routes path
app.use("/user", userRoute);
app.use("/product", productRouter);
app.use("/gallery", galleryRouter);
app.use("/sale", saleRouter);
app.use("/purchase", purchaseRouter);
app.use("/incomingProduct", incomingProductRouter);
app.use("/outgoingProduct", outgoingProductRouter);
app.use("/orderProduct", orderProductRouter);
app.use("/dailyAttendance", dailyAttendanceRouter);
app.use("/returnedItem", returnedItemRouter);
app.use("/barcodeGenerator", barcodeGeneratorRouter);
app.use("/storeInventory", storeInventoryRouter);
app.use("/storeIncomingProduct", storeIncomingProductRouter);

export { app };
