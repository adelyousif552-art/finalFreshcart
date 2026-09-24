'use server'


import axios, { AxiosRequestConfig } from "axios"
import { OrdersResponse } from "../types/order.types"

export async function getuserorders(cartownerid:string):Promise<OrdersResponse>{
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/orders/user/${cartownerid}`,
            method:'GET'
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }

}