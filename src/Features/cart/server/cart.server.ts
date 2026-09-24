'use server'

import axios, { Axios, AxiosRequestConfig } from "axios"
import { error } from "console"
import { cookies } from "next/headers"
import { CartResponse } from "../types/cart.types"

export async function addtocart({productid}:{
    productid:string
}):Promise<CartResponse>{
    const cookiesstore=await cookies()
    const token=cookiesstore.get('token')?.value
    if(!token){
        throw  error('Authentication needed')
    }
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v2/cart',
            method:'POST',
           headers:{
            'Content-Type':'application/json',
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
export async function getusercart():Promise<CartResponse>{
    const cookiestore=await cookies()
    const token=cookiestore.get('token')?.value
    if(!token){
        throw error('Authentication needed')
    }
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v2/cart',
            method:"GET",
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
export async function removeproduct(id:string):Promise<CartResponse>{
    const cookiesstore=await cookies()
    const token=cookiesstore.get('token')?.value
    if(!token){
        throw error('Authorization required')
    }
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v2/cart/${id}`,
            method:'DELETE',
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
export async function updatequantity(productid:string,count:number):Promise<CartResponse>{
     const cookiesstore=await cookies()
    const token=cookiesstore.get('token')?.value
    if(!token){
        throw error('Authorization required')
    }
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v2/cart/${productid}`,
            method:'PUT',
            headers:{
                token,
                'Content-Type':'application/json'
            },
            data:{
                count:count
            }
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }

}
export async function clearcart():Promise<CartResponse>{
    const cookiestore=await cookies()
    const token=cookiestore.get('token')?.value
    if(!token){
        throw error('Authentication needed')
    }
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v2/cart',
            method:'DELETE',
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