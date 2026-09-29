'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { forgotpassword } from "../server/auth.server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faLock, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import envelope from '../../../../src/assets/images/forgotpass.png'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Divider from "@/components/Ui/divider/Divider";
import { UseFormRegister } from "react-hook-form";
import { toast } from "react-toastify";

export default function Forgotpassword({setforgotpopup,setreset,email2,setemail}:{setforgotpopup:Dispatch<SetStateAction<boolean>>,setreset:Dispatch<SetStateAction<boolean>>
    email2:string,
    setemail:Dispatch<SetStateAction<string>>
}) {
    
     const forgpassword=async(value:{email:string})=>{
      try {
        const response=await forgotpassword(value)
        
            toast.success('code sent to your email')
            setforgotpopup(false)
            setTimeout(() => {
                setreset(true)
            }, 3000);
        
        
      } catch (error) {
        throw error
      }
    }
  return <>
  <div className='overlay bg-gray-400/30 fixed inset-0 flex items-center justify-center'>
  <form className='bg-white shadow-lg max-w-xl mx-auto w-full p-10'>
    <div className="flex items-center justify-between">
        <h1 className="text-green-600 font-bold text-2xl"><FontAwesomeIcon icon={faShoppingCart}/> Fresh <span className="text-black">Cart</span></h1>
        <Link onClick={()=>{
            setforgotpopup(false)
            
        }} href={'/login'}><FontAwesomeIcon icon={faArrowLeft}/> Back To Login</Link>
    </div>
    <div className="image relative h-64 w-64 mx-auto">
        <Image src={envelope} alt="envelope" fill/>
    </div>
    <div className="space-y-5">
        <h2 className="text-3xl font-bold">Forgot Your Password ?</h2>
    <p className="text-gray-500">No Worries! Enter your Email Address and we will send you a code to reset your password</p>
    </div>
    <div className="mt-5">
        <div className="label">
            <label className="font-bold" htmlFor="email">Email Address</label>
        </div>
        <div className="email relative">
<input type="email" name='email' id='email' className='form-control py-2 px-10 rounded-xl placeholder:text-gray-400' placeholder="You@example.com" onChange={(e)=>{
  setemail(e.target.value)
}} />
<FontAwesomeIcon className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500" icon={faEnvelope}/>
        </div>
    </div>

<button  type='button' onClick={()=>{
 forgpassword({
  email:email2
 })
}} className='btn w-full my-5 p-3 text-white mt-4 '>Send Reset Code <FontAwesomeIcon icon={faArrowRight}/></button>
<Divider text="or" classname="before:w-1/3 after:w-1/3 before:bg-gray-400/40  after:bg-gray-400/40"/>
<div className="bg-green-50 p-5 rounded-xl flex items-center gap-3">
    <div className="size-8 p-2 rounded-full bg-green-700 flex items-center justify-center">
        <FontAwesomeIcon className="text-white" icon={faLock}/>

    </div>
 <p className="text-green-800">We'll send a 6-digit code to your email address ,check your inbox (and spam folder)</p>
</div>
<p className="text-center">Remember Your Password? <Link href={'/login'} onClick={()=>{
    setforgotpopup(false)
}} className="text-green-600">Login</Link></p>

  </form>

  </div>
  
  </>
}
