import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import { createStream } from "rotating-file-stream";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import { getname } from "./helper.js";

const app = express();

app.use(
    cors({
        origin: ["http://37.27.81.8:9001","http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "UPDATE", "PUT"],
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
const logDirectory = path.join(path.resolve(), "log");

if (!existsSync(logDirectory)) {
    mkdirSync(logDirectory);
}
const accessLogStream = createStream("access.log", {
    interval: "1d", // rotate daily
    path: logDirectory,
});

// Middleware to get user name
app.use(getname);

morgan.token("host", function (req, res) {
    return req.hostname;
});
morgan.token("user", function (req) {
    return req.userName;
});
app.use(morgan(`:method :date :url :host :user `, { stream: accessLogStream }));

//routes import
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";
import follwerRouter from "./routes/follower.routes.js";
import jobPostRouter from "./routes/jobPost.routes.js";
// // routes Declaration
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/follow", follwerRouter);
app.use("/jobPost", jobPostRouter);

export { app };
