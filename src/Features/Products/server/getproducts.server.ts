'use server'

import axios, { AxiosRequestConfig } from "axios"
import { ProductsResponse, singleproductresponse } from "../types/product.type"
import { ReviewsResponse } from "../types/review.types"

export async function getallproducts():Promise<ProductsResponse>{
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/products',
            method:'GET',

        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}

export async function getproduct(id:string):Promise<singleproductresponse>{
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method:'GET'
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}
export async function getproductreviews(productid:string):Promise<ReviewsResponse>{
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/products/${productid}/reviews`,
            method:'GET',

        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}