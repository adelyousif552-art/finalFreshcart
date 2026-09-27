'use server'

import axios, { AxiosRequestConfig } from "axios"
import { error } from "console"
import { cookies } from "next/headers"

export async function createreview(value:{
    review:string,
    rating:number
},productid:string){
     const cookiestore=await cookies()
    const token =cookiestore.get('token')?.value||null
    if(!token){
        throw error('Authintication required')
    }

    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/products/${productid}/reviews`,
            method:'POST',
            headers:{
                token,
                "Content-Type":"application/json"
            },
            data:value
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}