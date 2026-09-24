'use server'

import axios, { AxiosRequestConfig } from "axios"
import { error } from "console"
import { cookies } from "next/headers"
import { ProductResponse } from "../types/wishlist.types"

export async function getuserwishlist():Promise<ProductResponse>{
    const cookiestore=await cookies()
    const token =cookiestore.get('token')?.value||null
    if(!token){
        throw error('Authintication required')
    }
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/wishlist',
            method:'GET',
            headers:{
                token
            }
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}
export async function addtowishlist(productid:string){
     const cookiestore=await cookies()
    const token =cookiestore.get('token')?.value||null
    if(!token){
        throw error('Authintication required')
    }
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/wishlist',
            method:'POST',
            headers:{
                token
            },
            data:{
                productId:productid
            }
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
        
    }
}
export async function deletewish(productid:string){
     const cookiestore=await cookies()
    const token =cookiestore.get('token')?.value||null
    if(!token){
        throw error('Authintication required')
    }
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,
            method:"DELETE",
            headers:{
                token
            }
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }

}