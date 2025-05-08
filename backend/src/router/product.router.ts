import { Router , Request, Response, RequestHandler} from "express";
import { productSchema } from "../schema/product.schema";
import { client } from "../client/db";

const router = Router();

router.post('/product', async(req : Request, res : Response)=>{
    const body = req.body;
    const {name, description, price, image}= productSchema.parse(body);
    const product = await client.product.create({
        data : {
            name,
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
    const products = await client.product.findMany();
    res.status(200).json({
        message : "Products fetched successfully",
        products
    })
});


export const productRouter = router;