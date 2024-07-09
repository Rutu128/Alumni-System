import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import { createStream } from 'rotating-file-stream';
import path from "path";
import { existsSync, mkdirSync } from "fs";


const app = express();

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
// }))
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "UPDATE", "PUT"],
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
const logDirectory = path.join(path.resolve(), 'log');

if (!existsSync(logDirectory)) {
  mkdirSync(logDirectory);
}
const accessLogStream = createStream("access.log", {
    interval: "1d", // rotate daily
    path: logDirectory,
  });

app.use(morgan("combined", { stream: accessLogStream }));
//routes import
import authRouter from "./routes/auth.routes.js";

// // routes Declaration
app.use("/auth", authRouter);
// app.use("/",(req,res)=>{
//     res.send("hii how are you")
// })

export { app };
