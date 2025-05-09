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
const searchHelper_1 = require("../utils/searchHelper");
const router = (0, express_1.Router)();
router.post('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { name, description, price, image } = product_schema_1.productSchema.parse(body);
    const name_format = name.toLowerCase();
    const product = yield db_1.client.product.create({
        data: {
            name: name_format,
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
    try {
        const { q: searchTerm, page = 1, limit = 10 } = req.query;
        const Page = Number(page);
        const Limit = Number(limit);
        const skip = (Page - 1) * Limit;
        const keywords = (0, searchHelper_1.extractKeywords)(searchTerm || '');
        const keywordConditions = keywords.flatMap(keyword => [
            {
                name: {
                    contains: keyword,
                    mode: 'insensitive',
                },
            },
            {
                description: {
                    contains: keyword,
                    mode: 'insensitive',
                },
            },
        ]);
        const products = yield db_1.client.product.findMany({
            where: keywords.length > 0 ? {
                OR: keywordConditions,
            } : undefined,
            orderBy: {
                createdAt: 'desc',
            },
            skip: skip,
            take: Limit
        });
        console.log("products are : ", products);
        const totalCount = yield db_1.client.product.count({
            where: keywords.length > 0 ? {
                OR: keywordConditions
            } : undefined,
        });
        console.log("totalCount ", totalCount);
        const totalPages = Math.ceil(totalCount / Number(limit));
        res.status(200).json({
            message: "Products fetched successfully",
            products,
            meta: {
                totalCount,
                totalPages,
                currentPage: Number(page),
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}));
exports.productRouter = router;
