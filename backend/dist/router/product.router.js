"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_schema_1 = require("../schema/product.schema");
const db_1 = require("../client/db");
const router = (0, express_1.Router)();
router.post('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { name, description, price, image } = product_schema_1.productSchema.parse(body);
    const product = yield db_1.client.product.create({
        data: {
            name,
            description,
            price,
            imageUrl: image || ""
        }
    });
    res.status(201).json({
        message: "Product Created in Database",
        product
    });
    return;
}));
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.client.product.findMany();
    res.status(200).json({
        message: "Products fetched successfully",
        products
    });
}));
exports.productRouter = router;
