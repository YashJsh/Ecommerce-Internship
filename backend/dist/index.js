"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_router_1 = require("./router/product.router");
const app = (0, express_1.default)();
require('dotenv').config();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", product_router_1.productRouter);
app.listen(PORT, () => {
    console.log("App is listening in port : ", PORT);
});
