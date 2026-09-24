'use server'


import { success } from "zod";
import { signupchema, signupschematype } from "../schemas/signupschema";
import axios, {AxiosError, AxiosRequestConfig} from 'axios'

export default async function signupAction(values:signupschematype){
   
    const validationresult=signupchema.safeParse(values)
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
          return{
                success:false,
                message:'validation error',
                errors
            }
    }
    const {terms,...requestbody}=values
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/auth/signup',
            method:'POST',
            data:requestbody
        }
        const {data}=await axios.request(options)
        if(data.message==='success'){
          return {
            success:true,
            message:'account created successffully',
            data
            
          }
        }
        return {
            success:false,
            message:data.message||'signup failed',
            
        }
    } catch (error) {
        if(error instanceof AxiosError){
            const errorMessage:string=error.response?.data.message
            if(errorMessage==='Account Already Exists'){
                return{
                    success:false,
                    message:'Account Exist',
                    errors:{
                        email:errorMessage
                    }
                }
            }
        }
        return{
            success:false,
            message:"something went wrong"
        }
    }
    

}