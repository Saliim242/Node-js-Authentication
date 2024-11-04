import express from "express";
import donenv from "dotenv";

import cookie from "cookie-parser";
import { connectDB } from "./config/db.connection.js";
import authRouter from "./routers/auth.route.js";

donenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

// Our Router
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
