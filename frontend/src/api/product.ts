import axios from 'axios';
import type { productSchema } from '../schema/ProductSchema';
import type { z } from 'zod';

const axiosInstance = axios.create({
    baseURL : 'http://localhost:5001/api'
})

export interface ProductProps {
    id: string; 
    name : string;
    description: string;
    price: number;
    createdAt: Date;
    imageUrl?: string;
  }

  export interface GetProductResponse {
    products: ProductProps[];
    meta: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
    };
  }
  

export type ProductType = z.infer<typeof productSchema>;

export const submitProduct = async(data : ProductType) =>{
    const response = await axiosInstance.post('/product', data);
    return response.data;
}

export const getProduct  = async(searchQuery? : string, page : number = 1) : Promise<GetProductResponse> => {
    const response = await axiosInstance.get(`/products`, {
        params : {q : searchQuery, page, limit: 12}
    });
    return {products : response.data.products, meta : response.data.meta};
}


