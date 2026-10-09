'use server'


import axios, { AxiosRequestConfig } from "axios"
import { OrdersResponse } from "../types/order.types"

export async function getuserorders(cartownerid:string):Promise<{success:boolean,data?:OrdersResponse}>{
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/orders/user/${cartownerid}`,
            method:'GET'
        }
        const {data}=await axios.request(options)
        return {
            success:true,
            data:data
        }
    } catch (error) {
        return{
            success:false
        }
    }

}