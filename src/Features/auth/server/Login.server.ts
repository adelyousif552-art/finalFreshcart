'use server'
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { success } from 'zod';
import { Loginschema, Loginschematype } from '../schemas/login.schema';
import {z}from'zod'

export default async function Loginserver(values:Loginschematype){
    const validationresult=Loginschema.safeParse(values)
    console.log(validationresult);
    
    if(!validationresult.success){
        const errors:Record<string,string>={}
        if(validationresult.error){
            validationresult.error.issues.forEach((issue)=>{
                const field=issue.path[0] as string
                const message=issue.message
                if(!errors[field]){
                    errors[field]=message
                }
            })
        }
        return {
            success:false,
            message:'validation error',
            errors
        }

    }
try {
    const options:AxiosRequestConfig={
        url:'https://ecommerce.routemisr.com/api/v1/auth/signin',
        method:'POST',
        data:values
    }
    const {data}=await axios.request(options)
    if(data.message==='success'){
        return{
            success:true,
            message:'signed in successffully',
            data
        }
    }else{
        return{
            success:false,
            message:'sign in fail'
        }
    }
} catch (error) {
    if(error instanceof AxiosError){
        const errormessage=error.response?.data.message
        if(errormessage==="Incorrect email or password"){
            return{
                success:false,
                message:'Incorrect email or password',
                errors:{
                    password:'Incorrect email or passwords'
                }
            }
        }

    }
    
}
}