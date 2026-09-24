'use client'
import { faCheck, faCity, faCreditCard, faDotCircle, faHome, faInfo, faLocationDot, faMoneyBill, faPhone, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { addressformtype, Addressschema } from "../schema/checkoutschema";
import Formfield from "@/components/Ui/Formfield/Formfield";
import { faCcMastercard } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardorder, cashorder } from "../server/Checkout.server";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearcart } from "@/Features/cart/server/cart.server";
import { cartactions } from "@/Features/cart/store/cart.slice";


export default function Checkoutdetails() {
    const {setcartinfo}=cartactions
    const dispatch=useAppDispatch()
    const router=useRouter()
    const {cartId}=useAppSelector((state)=>{
        return state.cart
    })
    const {register,handleSubmit,formState:{errors}}=useForm<addressformtype>(
        {
            defaultValues:{
                details:'',
                city:"",
                phone:'',
                postalCode:''
            },
            resolver:zodResolver(Addressschema)
        }

    )
    const onsubmit:SubmitHandler<addressformtype>=async (values)=>{
        console.log(values);
        
        try {
            if(selected=='cash'&&cartId){
                const response=await cashorder(cartId,values)
                if(response.status=='success'){
                    toast.success(response.message)
                    const clearcartresponse=await clearcart()
                    dispatch(setcartinfo(clearcartresponse))


                   setTimeout(() => {
                     router.push('/allorders')
                   }, 2000);

                }
            }else if(selected=='card'&&cartId){
                const response=await cardorder(cartId,values,location.origin)
                if(response.status=='success'){
                    toast.loading('redirecting you to payment page')
                    setTimeout(() => {
                        location.href=response.session.url
                    }, 3000);
                    const clearcartresponse=await clearcart()
                    dispatch(setcartinfo(clearcartresponse))
                }
                

            }
        } catch (error) {
            throw error
        }
        

    }
    const [selected,setselected]=useState<'cash'|'card'>('cash')
  return <>
  <div className="lg:col-span-8 md:col-span-6 col-span-12 ">
<div className="bg-white border border-gray-400 shadow rounded-xl">
    <div className="bg-green-600 rounded-t-xl p-2">
    <h1 className="font-bold text-white"><FontAwesomeIcon className="text-white" icon={faHome}/> <span>Shipping Address</span></h1>
    <p className="text-gray-200 text-sm">Where Should we deliver your order?</p>

</div>
<div className="p-4">
    <div className="bg-blue-100 py-2 flex gap-3 items-center rounded-xl px-3">
        <div className="icon size-10 rounded-full bg-blue-300 flex items-center justify-center">
            <FontAwesomeIcon className="text-blue-800" icon={faInfo}/>

        </div>
        <div>
            <h4 className="text-blue-700">Delivery Information</h4>
            <p className="text-sm text-blue-400">Please ensure your address is accurate for smooth delivery</p>
        </div>

    </div>
    <form id="checkout-form" onSubmit={handleSubmit(onsubmit)} className="space-y-5 mt-5">
        <Formfield label='city' elementtype="input" register={register} name="city" type="text" id="city" classname="border border-gray-400 py-4 focus:outline-none w-full px-12" icon={faCity} placeholder="e.g cairo,Alexandria,Egypt"/>
        {errors.city?<p className="text-red-500">{errors.city.message}</p>:''}
        <Formfield label='Street Address' elementtype="textarea" register={register} name="details"  id="Address" classname="border h-20 border-gray-400 pt-2 focus:outline-none w-full px-12" icon={faLocationDot} placeholder="Street Name,Building number,Floor,Department"/>
        {errors.details?<p className="text-red-500">{errors.details.message}</p>:''}
        <Formfield label='Phone Number' elementtype="input" register={register} name="phone"  id="phone" classname="border py-4 border-gray-400  focus:outline-none w-full px-12" icon={faPhone} placeholder="01xxxxxxxxx"/>
        {errors.phone?<p className="text-red-500">{errors.phone.message}</p>:''}
        <Formfield label='Postal Code' elementtype="input" register={register} name="postalCode" type="text" id="postal" classname="border border-gray-400 focus:outline-none w-full px-12"/>
        {errors.postalCode?<p className="text-red-500">{errors.postalCode.message}</p>:''}
        
    </form>

</div>
</div>
<div className="bg-white border border-gray-400 mt-10 shadow rounded-xl">
    <div className="bg-green-600 rounded-t-xl p-2">
    <h1 className="font-bold text-white"><FontAwesomeIcon className="text-white" icon={faWallet}/> <span>Payment Method</span></h1>
    <p className="text-gray-200 text-sm">Choose How would you like to pay</p>

</div>
<div className="p-5 space-y-5">
   
       <button onClick={()=>{
        setselected('cash')
       }} className={`flex  justify-between transition-all duration-200 w-full text-left p-5 rounded-lg  items-center ${selected=='cash'?'border-2 border-green-400 bg-green-100/50':'border-2 border-gray-400'} `}>
        <div className="flex items-center gap-3 justify-center">
             <div className={`icon transition-all duration-200 size-10 rounded-lg  flex items-center justify-center ${selected=='cash'?'bg-green-500 text-white':'bg-gray-200 text-gray-400'} `}>
            <FontAwesomeIcon className="" icon={faMoneyBill}/>

        </div>
        <div>
            <h1 className="font-bold">Cash on Delivery</h1>
            <p className="text-sm text-gray-500">pay when your order arrives at your doorstep</p>
           
        </div>
        
        </div>
        <div className={`size-5 rounded-full border transition-all duration-200  flex items-center justify-center ${selected=='cash'?'border-green-400':'border-gray-400'}`}>
            {selected=='cash'?<FontAwesomeIcon className="text-green-600 text-sm" icon={faCheck}/>:''}

        </div>
       </button>
       



    
     
       <button onClick={()=>{
        setselected('card')
       }} className={`flex items-center justify-between w-full text-left p-5 transition-all duration-200  rounded-lg border-2  ${selected=='card'?'border-green-400 bg-green-100/50':'border-gray-400'} `}>
        <div className="flex gap-3 items-center ">
             <div className={`icon  size-10 rounded-lg transition-all duration-200  flex items-center justify-center ${selected=='card'?'bg-green-500 text-white':'bg-gray-200 text-gray-400'} `}>
            <FontAwesomeIcon  icon={faWallet}/>

        </div>
        <div>
            <h1 className="font-bold">Pay Online</h1>
            <p className="text-sm text-gray-500">Secure Payment with arrives at your doorstep</p>
            <div className={`icons transition-all duration-200 ${selected=='card'?'text-blue-400':''}`}>
                <FontAwesomeIcon icon={faCreditCard}/>
                <FontAwesomeIcon icon={faCcMastercard}/>
                
            </div>
        </div>
        </div>
        <div className={`size-5 rounded-full border  flex items-center justify-center ${selected=='card'?'border-green-400':'border-gray-400'}`}>
            {selected=='card'?<FontAwesomeIcon className="text-green-600 text-sm" icon={faCheck}/>:''}

        </div>
       </button>
       



    
</div>
</div>
  </div>
  
  </>
}
