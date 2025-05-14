import express from 'express';
import cors from "cors"
import { productRouter } from './router/product.router';

const app = express();
require('dotenv').config()
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api", productRouter);

app.listen(PORT, ()=>{
    console.log("App is listening in port : ", PORT);
});