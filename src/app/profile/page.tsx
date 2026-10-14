'use client'
import Header from "@/components/shared/header/Header";
import { updateschema, updateschematype } from "@/Features/auth/schemas/updateschema";
import { updateprofile } from "@/Features/auth/server/auth.server";
import { setauth } from "@/Features/auth/store/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { email } from "zod";


export default function page() {
const dispatch=useAppDispatch()
    const {userinfo}=useAppSelector((state)=>{
        return state.auth
    })
    
    console.log(userinfo);
    
    const {register,handleSubmit,formState:{errors}}=useForm<updateschematype>({
        defaultValues:{
            name:userinfo?.name,
            email:userinfo?.email,
            phone:''
            
        },
        resolver:zodResolver(updateschema),

        reValidateMode:'onChange'

    })
    const onsubmit=async(values:updateschematype)=>{
        try {
            const response=await updateprofile(values)
            console.log("updated",response);
            if(response.message=='success'){
                toast.success(response.message)
                dispatch(setauth({isauthinticated:true,userinfo:response.user}))
            }

            
            
        } catch (error) {
            toast.error('use different email')
           
        }

    }
  return <>
  <div className="mt-5">
    <Header firsttitle="Profile" secondtitle="Account"/>
  </div>
  <div className="max-w-7xl w-full mx-auto mt-10 bg-white p-5 shadow rounded-lg">
    <form onSubmit={handleSubmit(onsubmit)} >
        <div className="inputs space-y-3">
            <div className="name">
                <div className="label">
                <label htmlFor="name">Name</label>
            </div>
            <div className="input">
                <input id='name' {...register('name')} type="text" className="form-control p-2" />

            </div>
            </div>
            {errors.name?<p className="text-red-500">{errors.name.message}</p>:''}
             <div className="email">
                <div className="label">
                <label htmlFor="email">Email</label>
            </div>
            <div className="input">
                <input id="email" type="email" {...register('email')} className="form-control p-2" />

            </div>
            </div>
            {errors.email?<p className="text-red-500">{errors.email.message}</p>:''}
             <div className="phone">
                <div className="label">
                <label htmlFor="phone">Phone</label>
            </div>
            <div className="input">
                <input id="phone" type="tel" {...register('phone')} className="form-control p-2" />

            </div>
            </div>
            {errors.phone?<p className="text-red-500">{errors.phone.message}</p>:''}
        </div>
        <button type="submit" className="btn text-white max-w-xl w-full block mx-auto mt-5 " >
            Update

        </button>


    </form>

  </div>
  
  </>
}
