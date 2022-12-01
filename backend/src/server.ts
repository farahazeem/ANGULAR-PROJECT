
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import itemRouter from './routers/item.router';
import userRouter from './routers/user.router';
import { dbConnect } from './configs/database.config';
import orderRouter from './routers/order.router';
dbConnect();

/*
By writing following piece of code we are telling express to use CORS to serve request of localhost:4200
and the credentials should be sent too
*/
const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/items", itemRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})