
'use server'


import { cookies } from "next/headers";
import { addressformtype } from "../schema/checkoutschema";
import { error } from "console";
import axios, { AxiosRequestConfig } from "axios";
import { OrderResponse } from "../types/Checkout.types";


export async function cashorder(cartid:string,shippingAddress:addressformtype):Promise<OrderResponse>{
    const cookiestore= await cookies()
    const token=cookiestore.get('token')?.value
    if(!token){
        throw  error('Authentication required')
    }
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v2/orders/${cartid}`,
            method:'POST',
            headers:{
                token,
                'Content-Type':'application/json'
            },
            data:{
                shippingAddress
            }
                
            
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }

}
export async function cardorder(cartid:string,shippingAddress:addressformtype,url:string){
    const cookiestore= await cookies()
    const token=cookiestore.get('token')?.value
    if(!token){
        throw  error('Authentication required')
    }
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=${url}`,
            method:'POST',
            headers:{
                token,
                
            },
            data:shippingAddress
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }

}