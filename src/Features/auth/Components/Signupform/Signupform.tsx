'use client'
import Divider from '@/components/Ui/divider/Divider'
import Formfield from '@/components/Ui/Formfield/Formfield'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

import React from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { signupschematype, signupchema } from '../../schemas/signupschema'
import { zodResolver } from '@hookform/resolvers/zod'
import signupAction from '../../server/signup.server'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


export default function Signupform() {
  const router=useRouter()
  const {register,handleSubmit,setError,formState:{errors,isSubmitting,isDirty,isValid}}=useForm<signupschematype>({
    defaultValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:'',
      terms:false
    },
    resolver:zodResolver(signupchema),
    mode:'onBlur',
    reValidateMode:'onChange'
    
  })
  const onsubmit:SubmitHandler<signupschematype>=async function(values){
   const response=await signupAction(values)
   if(response?.success){
    toast.success(response.message)
    setTimeout(() => {
      router.push('/login')
    }, 2000);


   }else{
    if(response?.errors){
      Object.keys(response.errors).forEach((key)=>{
        setError(key as keyof signupschematype,{message:response.errors[key]})
      })
    }
   }
    

  }
  return <>
  <section className='bg-white max-w-xl mx-auto shadow-lg space-y-5 rounded-lg p-5 '>
    <div className='text-center'>
      <h1 className='font-bold text-4xl'>Create Your Account</h1>
    <p className='text-sm text-gray-500'>Start your fresh journey with us today</p>
    </div>
    <div className='flex  justify-center items-center space-x-3 px-5 *:grow '>
      <button className='btn bg-white border border-gray-300  '><FontAwesomeIcon className='text-red-500' icon={faGoogle}/> Google</button>
      <button className='btn bg-white border border-gray-300  '><FontAwesomeIcon className='text-blue-500' icon={faFacebookF}/> Facebook</button>
    </div>
    <Divider text='OR' classname='before:w-2/5 after:w-2/5'/>
    <form className='space-y-5' onSubmit={handleSubmit(onsubmit)}>
   
     <Formfield register={register} classname='form-control' name={'name'} id={'name'} type={'text'} elementtype={'input'} label='Name'/>
      {errors.name?<p className='text-red-500'>{errors.name.message}</p>:''}
     
    <Formfield register={register}  classname='form-control' name={'email'} id={'Email'} type={'email'} elementtype={'input'} label='Email Address'/>
   {errors.email?<p className='text-red-500'>{errors.email.message}</p>:''}
    <Formfield register={register} classname='form-control' name={'phone'} id={'Phonenumber'} type={'tel'} elementtype={'input'} label='Phone Number'/>
     {errors.phone?<p className='text-red-500'>{errors.phone.message}</p>:''}
    <Formfield register={register} classname='form-control' name={'password'} id={'Password'} type={'password'} elementtype={'input'} label='Password'/>
     {errors.password?<p className='text-red-500'>{errors.password.message}</p>:''}
    <Formfield register={register} classname='form-control' name={'rePassword'} id={'confirmpassword'} type={'password'} elementtype={'input'} label='Confirm Password'/>
     {errors.rePassword?<p className='text-red-500'>{errors.rePassword.message}</p>:''}
    
    <Formfield register={register} classname='accent-green-600'  name={'terms'} id={'Secondcheck'} type={'checkbox'} elementtype={'input'} label={<>
      I agree to the <Link className='text-green-600 font-bold ' href={'/termsofservice'}>Terms of Service</Link> and <Link className='text-green-600 font-bold' href={'/privacypolicy'}>Privacy Policy</Link>
      </>} />
       {errors.terms?<p className='text-red-500'>{errors.terms.message}</p>:''}

      <button disabled={!(isValid&&isDirty)||isSubmitting} className='btn disabled:cursor-not-allowed disabled:bg-gray-400 text-white space-x-3 w-full'>{isSubmitting?<>
      <FontAwesomeIcon spin icon={faSpinner}/> <span>Creating Account</span>
      </>:<>
      <FontAwesomeIcon icon={faUserPlus}/> <span>Create My Account</span>
      </>}</button>


      <p className='text-center'>Already have an account? <Link className='text-green-600 font-bold' href={'/signin'}>Sign in</Link></p>
    </form>

  </section>
  
  </>
}
