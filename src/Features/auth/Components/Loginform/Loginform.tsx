'use client'
import Divider from '@/components/Ui/divider/Divider'
import Formfield from '@/components/Ui/Formfield/Formfield'
import { faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Loginschema, Loginschematype } from '../../schemas/login.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import Loginserver from '../../server/Login.server'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { settoken } from '../../server/auth.server'
import { setauth } from '../../store/auth.slice'
import { useDispatch } from 'react-redux'

export default function Loginform() {
  const dispatch=useDispatch()
  const router=useRouter()
    const {register,handleSubmit,setError,formState:{errors,isSubmitting,isDirty,isValid}}=useForm<Loginschematype>({
        defaultValues:{
            email:'',
            password:''
        },
        resolver:zodResolver(Loginschema)
    })
    const onsubmit:SubmitHandler<Loginschematype>=async function(values){
        const response=await Loginserver(values)
        if(response?.success){
          toast.success(response.message)
          await settoken(response.data.token,values.terms)
          dispatch(setauth({isauthinticated:true,userinfo:response.data.user}))
          setTimeout(() => {
            router.push('/')
          }, 2000);

        }else{
          if(response?.errors){
            Object.keys(response.errors).forEach((key)=>{
              setError(key as keyof Loginschematype,{message:response.errors[key]})
              
            })
          }
        }
        
    }
  return<>
  
  <section className='bg-white mx-auto  max-w-xl shadow-lg space-y-5 rounded-lg p-5 '>
    <div className='text-center'>
      <h1 className='font-bold text-4xl'><span className='text-green-600'>Fresh</span>Cart</h1>
      <h3 className='font-bold text-2xl'>Welcome Back!</h3>
    <p className='text-sm text-gray-500'>SIgn in to continue your fresh shopping experience</p>
    </div>
    
      <button className='btn  w-full bg-white border border-gray-300  '><FontAwesomeIcon className='text-red-500' icon={faGoogle}/>Continue with Google</button>
      <button className='btn w-full bg-white border border-gray-300  '><FontAwesomeIcon className='text-blue-500' icon={faFacebookF}/>Continue withFacebook</button>
    
    <Divider classname='before:w-1/4 after:w-1/4' text='OR CONTINUE WITH EMAIL'/>
    <form className='space-y-5' onSubmit={handleSubmit(onsubmit)} >
   
    
     
    <Formfield register={register}   classname='form-control' name={'email'} id={'Email'} type={'email'} elementtype={'input'} label='Email Address'/>
    {errors.email?<p className='text-red-500'>{errors.email.message}</p>:''}
   
    
    <Formfield register={register}  classname='form-control' name={'password'} id={'Password'} type={'password'} elementtype={'input'} label='Password'/>
     {errors.password?<p className='text-red-500'>{errors.password.message}</p>:''}
    <Formfield register={register} classname='accent-green-600'  name={'terms'} id={'Secondcheck'} type={'checkbox'} elementtype={'input'} label={<>
     keep me signed in
      </>} />
    
   

      <button disabled={!(isDirty&&isValid)||isSubmitting}  className='btn disabled:cursor-not-allowed disabled:bg-gray-400 text-white space-x-3 w-full'>
      {isSubmitting?<>
      <FontAwesomeIcon spin icon={faSpinner}/> <span>signing in</span>
      </>:<><FontAwesomeIcon icon={faUserPlus}/> <span>Sign in</span></>}
      </button>


      <p className='text-center'>Don't have an account? <Link className='text-green-600 font-bold' href={'/signup'}>Sign up</Link></p>
    </form>

  </section>
  </>
}
