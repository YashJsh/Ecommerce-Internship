import axios from 'axios';
import type { productSchema } from '../schema/ProductSchema';
import type { z } from 'zod';

const axiosInstance = axios.create({
    baseURL : 'http://localhost:5001/api'
})

export type ProductType = z.infer<typeof productSchema>;

export const submitProduct = async(data : ProductType) =>{
    const response = await axiosInstance.post('/product', data);
    return response.data;
}