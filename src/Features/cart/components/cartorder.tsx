'use client'
import { faTruck } from "@fortawesome/free-solid-svg-icons"
import {faTruck as tr} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function Cartorder({totalcartprice}:{totalcartprice:number}) {
  const router=useRouter()
    const [promocode,setpromocode]=useState('')
    const subtotal=totalcartprice
    const shipping=totalcartprice>500?0:100
    const total=subtotal+shipping
  return <>
  <div className="bg-white shadow-lg rounded-xl p-3 sticky top-5 overflow-hidden">
    <h1 className="font-bold text-2xl mb-5">Order Summary</h1>
    {shipping>0?<div className="bg-yellow-200/40 p-5 my-3 ">
      <p className="text-sm"><FontAwesomeIcon className="text-yellow-300" icon={faTruck}/> Add {500-subtotal} EGP for free Shipping</p>
      <div className="h-3 bg-yellow-200">
        <div className={`h-3 bg-yellow-400 transition-all duration-200  `} style={{
          width:`${(subtotal/500)*100}%`
        }}>

        </div>
      </div>

    </div>:<div className="bg-green-400/20 p-5 my-3">
       <div className="flex items-center gap-2">
         <FontAwesomeIcon className="text-green-500 rounded-full p-2 bg-green-200" icon={tr}/>
        <div>
          <h3 className="text-green-600 font-bold">Free Shipping!</h3>
          <p className="text-green-600 text-sm">You qualify for free delivery</p>
        </div>
       </div>
        
        </div>}
    <ul className="space-y-3">
        <li className="flex items-center justify-between"><span className="text-gray-500">subtotal</span> <span className="font-bold">{subtotal} EGP</span></li>
        <li className="flex items-center justify-between"><span className="text-gray-500">shipping</span> <span className="font-bold">{shipping>0?shipping:'Free'}</span></li>
        <li className="flex items-center gap-2 rounded-lg "><input value={promocode} onChange={(e)=>{
            setpromocode(e.target.value)
        }} className="grow py-1 px-2 border border-gray-200 focus:outline-none shadow" type="text" placeholder="apply promo code" /> <button className="btn bg-black text-white">Apply</button></li>
    </ul>
    <div className="flex items-center justify-between mt-5 border-t border-gray-400/50">
        <span className="font-bold">Total</span>
        <span className="font-bold text-2xl">{total} EGP</span>
    </div>
    <button onClick={()=>{
      router.push('/checkout')
    }} className="btn text-white w-full bg-green-500 shadow-lg hover:bg-green-700 mt-5">Proceed to Checkout</button>


  </div>
  
  
  </>
}
