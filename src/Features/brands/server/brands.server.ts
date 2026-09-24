

import { BrandsResponse } from "../types/brands.types";
import axios, { AxiosRequestConfig } from "axios";

export async function getallbrands():Promise<BrandsResponse>{
   
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/brands',
            method:'GET'
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}