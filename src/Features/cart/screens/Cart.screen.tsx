'use client'
import Rating from "@/components/shared/Rating/Rating"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { faArrowLeft, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useState } from "react"
import Cartcard from "../components/cartcard"
import Cartorder from "../components/cartorder"
import Swal from "sweetalert2"
import { clearcart } from "../server/cart.server"
import { cartactions } from "../store/cart.slice"
import { toast } from "react-toastify"
import EmptyCart from "../components/EmptyCart"



export default function Cartscreen() {
    const {numOfCartItems,products,totalcartprice}=useAppSelector((state)=>{
        return state.cart
    })
    const {setcartinfo}=cartactions
    const dispatch=useAppDispatch()
    const clearCart=async()=>{
      try {
          const result=await Swal.fire({
                    html:`<div className="bg-white rounded-lg">
                        <div class="icon mx-auto w-16 h-16 rounded-full bg-red-200 flex items-center justify-center">
                           <svg class="w-8 h-8 text-red-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"/></svg>
        
                        </div>
                        <h1 class="text-2xl font-bold">Clear Cart?</h1>
                        <p class="text-gray-500">Are you sure you want to clear cart?</p>
        
        
        
                    </div>`,
                    showCancelButton:true,
                    showConfirmButton:true,
                    buttonsStyling:false,
                    cancelButtonText:'cancel',
                    confirmButtonText:'Clear',
                    reverseButtons:true,
                    customClass:{
                        cancelButton:'bg-white rounded-lg cursor-pointer py-2 px-5 border border-gray-400 mx-4 hover:border-green-400 hover:bg-green-200/20 transition-all duration-200',
                        confirmButton:'bg-red-500 cursor-pointer rounded-lg py-2 px-5 text-white hover:bg-red-800 transition-all duration-200'
                    }
                })
                if(result.isConfirmed){
                  const response=await clearcart()
                  dispatch(setcartinfo(response))
                  toast.success(response.message)
                  
                }
      } catch (error) {
        
      }

    }
    
  return <>
  {numOfCartItems>0?<section className="grid lg:grid-cols-12 w-full max-w-7xl mx-auto gap-4">
    <div className=" lg:col-span-9 border border-gray-200/50 p-5 ">
    <h1 className="text-2xl font-bold">Shopping Cart</h1>
    <p className="text-sm text-gray-500 mt-2">{numOfCartItems} items in your cart</p>
    <ul className="space-y-10 mt-5 ">
       {products.map((product)=>{
        return <Cartcard key={product._id} product={product}/>
        
        
       })}
    </ul>
    {numOfCartItems>0? <div className="flex items-center justify-between mt-5">
    <button className="font-bold hover:text-green-500 transition-all duration-200 cursor-pointer"><FontAwesomeIcon icon={faArrowLeft}/> Continue Shopping</button>
    <button onClick={clearCart} className="hover:text-red-500 transition-all duration-200 cursor-pointer">clear cart</button>
  </div>:''}

    </div>
    <div className="lg:col-span-3 ">
      <Cartorder totalcartprice={totalcartprice} />
    </div>


  </section>:<EmptyCart/>}
 
  
  </>
}
