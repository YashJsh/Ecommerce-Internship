import { Router , Request, Response, RequestHandler} from "express";
import { productSchema } from "../schema/product.schema";

import { extractKeywords } from "../utils/searchHelper";
import { client } from "../client/db"
import { Prisma } from "@prisma/client";


export interface productQuery{
    q? : string,
    page? : number,
    limit? : number
}

const router = Router();

router.post('/product', async(req : Request, res : Response)=>{
    const body = req.body;
    const {name, description, price, image}= productSchema.parse(body);
    const name_format = name.toLowerCase();
    const product = await client.product.create({
        data : {
            name : name_format,
            description,
            price,
            imageUrl : image || ""
        }
    })
    res.status(201).json({
        message : "Product Created in Database",
        product
    });
    return;
});

router.get('/products', async (req : Request, res : Response)=>{
    try{
    const {q : searchTerm, page = 1, limit = 10} = req.query as productQuery;
    const Page = Number(page);
    const Limit = Number(limit);
    const skip = (Page - 1 )*Limit;

    const keywords = extractKeywords(searchTerm || '');
    
    const keywordConditions: Prisma.ProductWhereInput[] = keywords.flatMap(keyword => [
      {
        OR: [
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
        ],
      },
    ]);

    const products = await client.product.findMany({
      where: keywords.length > 0 ? {
        OR: keywordConditions,
      } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      skip : skip,
      take : Limit
    });
    

    const totalCount = await client.product.count({
      where: keywords.length > 0 ? {
        OR: keywordConditions
      } : undefined,
    });

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
      
    } catch (error) {
      res.status(500).json({
        message: "Error fetching products",
        error: error instanceof Error ? error.message : "Unknown error"
    });
}});

export const productRouter = router;