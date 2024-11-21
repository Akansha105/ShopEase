import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import "./db/conn.js"
import cors from "cors";
import router from "./roots/router.js";
import cookieParser from "cookie-parser";

const app = express();

const port = 8005;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);

app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})