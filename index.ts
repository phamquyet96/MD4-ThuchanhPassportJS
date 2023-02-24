import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import authRouter from "./src/router/authRouter";

const PORT = 3000;
const app = express();

const DB_URL='mongodb://127.0.0.1:27017/pastportjs';
mongoose.connect(DB_URL)
.then(()=>{console.log("DB connect success")})
.catch((err)=>{console.log("DB connect error",err)})

app.set("view engine","ejs")
app.set("views",'./src/views')
app.use(bodyParser.json());
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})