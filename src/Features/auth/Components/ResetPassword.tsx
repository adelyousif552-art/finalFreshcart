'use client'
import { faArrowLeft, faArrowRight,    faLock,  faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import resetpass from '../../../assets/images/resetpass.png'
import Link from "next/link"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { useForm } from "react-hook-form"
import { Resetpasstype, Resetpassvalidation } from "../schemas/resetpass.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Resetpass, settoken } from "../server/auth.server"
import { toast } from "react-toastify"
import { Dispatch, SetStateAction } from "react"


export default function ResetPassword({setresetpasspopup}:{setresetpasspopup:Dispatch<SetStateAction<boolean>>}) {
    const {register,handleSubmit,formState:{errors}}=useForm<Resetpasstype>({
        defaultValues:{
            email:'',
            newPassword:''
        },
        resolver:zodResolver(Resetpassvalidation),
        reValidateMode:'onChange',
        
        
    })
    const onsubmit=async(values:Resetpasstype)=>{
        
        
        try {
            const response=await Resetpass(values)
            console.log(response);
            
            toast.success('password changed')
            setresetpasspopup(false)

            
        } catch (error) {
            throw('something went wrong')
        }

    }
  return <>
  
    <div className='overlay bg-gray-400/30 fixed inset-0 flex items-center justify-center'>
  <form onSubmit={handleSubmit(onsubmit)} className='bg-white shadow-lg max-w-xl mx-auto w-full p-10'>
    <div className="flex items-center justify-between">
        <h1 className="text-green-600 font-bold text-2xl"><FontAwesomeIcon icon={faShoppingCart}/> Fresh <span className="text-black">Cart</span></h1>
        <Link onClick={()=>{
            setresetpasspopup(false)
        }}  href={'/login'}><FontAwesomeIcon icon={faArrowLeft}/> Back To Login</Link>
    </div>
    <div className="image relative h-64 w-64 mx-auto">
        <Image src={resetpass} alt="lock" fill/>
    </div>
    <div className="space-y-5">
        <h2 className="text-3xl font-bold">Create New Password</h2>
    <p className="text-gray-500">Your new password must be different from previously used passwords</p>
    </div>
    <div className="inputs  mt-5">
       <div   className="space-y-5">
         <div className="mt-5">
                <div className="label">
                    <label className="font-bold" htmlFor="email">Email Address</label>
                </div>
                <div className="email relative">
        <input type="email" {...register("email")} id='email' className='form-control py-2 px-10 rounded-xl placeholder:text-gray-400' placeholder="You@example.com" />
        <FontAwesomeIcon className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500" icon={faEnvelope}/>
                </div>
                {errors.email?<p className="text-red-500">{errors.email.message}</p>:''}
            </div>

         <div className="Password">
            <div className="label">
                <label htmlFor="newpassword">New Password</label>
            </div>
            <div className="inputnewpassword relative">
                <input {...register("newPassword")} id="newpassword" type="password" placeholder="Enter Your New Password" className="form-control placeholder:text-gray-400 py-2 px-8" />
                <FontAwesomeIcon  icon={faLock} className="absolute text-gray-300 left-2 top-1/2 -translate-y-1/2"/>

            </div>
            {errors.newPassword?<p className="text-red-500">{errors.newPassword.message}</p>:''}
        </div>
        <button type='submit'  className='btn w-full my-5 p-3 text-white mt-4 '>Reset Password <FontAwesomeIcon icon={faArrowRight}/></button>
        
       </div>
    </div>
   
   






  </form>

  </div>
  
  </>
}
