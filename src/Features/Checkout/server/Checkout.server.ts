
'use server'


import { cookies } from "next/headers";
import { addressformtype } from "../schema/checkoutschema";

import axios, { AxiosRequestConfig } from "axios";
import { OrderResponse } from "../types/Checkout.types";


export async function cashorder(cartid:string,shippingAddress:addressformtype):Promise<OrderResponse|{status:string,message:string}>{
    const cookiestore= await cookies()
    const token=cookiestore.get('token')?.value
    if(!token){
        throw  new Error('Authentication required')
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
        if(axios.isAxiosError(error)){
            return {
                status:'error',
                message:error.response?.data.message
            }
        }
        return{
            status:'erroe',
            message:'something went wrong'
        }
    }

}
export async function cardorder(cartid:string,shippingAddress:addressformtype,url:string){
    const cookiestore= await cookies()
    const token=cookiestore.get('token')?.value
    if(!token){
        throw  new Error('Authentication required')
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
        if(axios.isAxiosError(error)){
            return {
                status:'error',
                message:error.response?.data.message
            }
        }
        return{
            status:'error',
            message:'something went wrong'
        }
    }

}