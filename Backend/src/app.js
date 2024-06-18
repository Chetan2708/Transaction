import express from "express";
import cors from "cors"




const app = express();

app.use(cors())
app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

// Routes Import
import productRoutes from "./routes/Product.routes.js";


// Routes Use

app.use("/api/v1", productRoutes);


export { app };
