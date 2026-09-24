'use server'

import axios, { AxiosRequestConfig } from "axios"
import { cookies } from "next/headers"

export async function settoken(token:string,rememberme:boolean):Promise<void>{
    const cookiestore=await cookies()
    if(rememberme){
         cookiestore.set('token',token,{
        httpOnly:true,
        maxAge:30*24*60*60
    })

    }else{
         cookiestore.set('token',token,{
        httpOnly:true,
        maxAge:1*24*60*60
    })
    }
   
}
export async function gettoken():Promise<string|null>{
    const cookiestore=await cookies()
    const token=cookiestore.get('token')?.value||null
    return token
}
export async function deletetoken():Promise<void>{
    const cookiestore=await cookies()
    cookiestore.delete('token')
}
export async function verifytoken(){
    const cookiestore=await cookies()
    const token=cookiestore.get('token')?.value||null
    if(!token){
        return {
            isauthinticated:false,
            userinfo:null
        }
    }
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
            method:'GET',
            headers:{
                token
            }
        }
        const {data}=await axios.request(options)
        if(data.message==='verified'){
            const {name,id,role}=data.decoded
            return  {
                isauthinticated:true,
                userinfo:{
                    name,role,id
                }
            }
        }
        return{
            isauthinticated:false,
            userinfo:null
        }
    } catch (error) {
         return{
            isauthinticated:false,
            userinfo:null
        }
    }
}