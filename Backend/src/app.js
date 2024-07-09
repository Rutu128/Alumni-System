import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
const app = express();

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
// }))
app.use(cors({
    origin: ["http://localhost:5173",
        "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "UPDATE", "PUT"]
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


//routes import
// import userRouter from "./routes/user.routes.js";



// // routes Declaration
// app.use("/", userRouter)
// app.use("/",(req,res)=>{
//     res.send("hii how are you")
// })

export { app }