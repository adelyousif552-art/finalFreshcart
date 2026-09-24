import Image from "next/image";
import { Order } from "../types/order.types";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faArrowDown, faArrowUp, faCalendar, faCircleCheck, faClock, faCreditCard, faLocationDot, faMoneyBill, faShoppingBag, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Orderdetails from "./Orderdetails";
import { AnimatePresence } from "motion/react";


export default function Ordercard({orderinfo}:{orderinfo:Order}) {
    function getstatus(){
        if(orderinfo.isDelivered){
              return {
        icon:faCircleCheck,
        title:'delivered',
        bgcolor:'bg-green-100',
        textcolor:'text-green-600'
        
            }
        } else if(orderinfo.isPaid){
              return {
        icon:faTruck,
        title:'on the way',
        bgcolor:'bg-blue-200',
        textcolor:'text-blue-500'
        
            }
        }else{
            return {
        icon:faClock,
        title:'processing',
        bgcolor:'bg-yellow-100',
        textcolor:'text-yellow-600'
        
            }
        }
          
    }
    const status=getstatus()
    const [opendetails,setopendetails]=useState<boolean>(false)
  return<>
  <div className="bg-white flex items-center justify-between rounded-xl p-5">
    <div className="flex items-center gap-3">
        <div className="image w-20 h-28 flex items-center justify-center relative">
        <Image src={orderinfo.cartItems[0].product.imageCover} alt={orderinfo.cartItems[0].product.title} width={50} height={50}/>
       {orderinfo.cartItems.length-1>0? <span className="size-7 rounded-full absolute top-0 right-1 bg-black flex items-center text-white justify-center">
            +{orderinfo.cartItems.length-1}
            


        </span>:''}

    </div>
    <div className="content space-y-2">
        <div className={`${status.bgcolor} ${status.textcolor} w-fit py-1 space-x-1 px-2 rounded-full text-sm`}>
            <FontAwesomeIcon icon={status.icon}/>
            <span>{status.title}</span>

        </div>
        <p className="text-black font-bold"><span className="text-gray-500">#</span> {orderinfo.id}</p>
        <ul className="flex *:text-gray-500 items-center gap-3">
            <li><FontAwesomeIcon icon={faCalendar}/><span>{new Date(orderinfo.createdAt).toLocaleDateString()}</span></li>
            <li><FontAwesomeIcon icon={faShoppingBag}/> <span>{orderinfo.cartItems.length}{orderinfo.cartItems.length>1?'items':'item'}</span></li>
            <li><FontAwesomeIcon icon={faLocationDot}/><span>{orderinfo.shippingAddress?.city}</span></li>
        </ul>
        <p className="text-gray-500"><span className="font-bold text-black">{orderinfo.totalOrderPrice}</span> EGP</p>


    </div>
    </div>
    <div className="  self-stretch flex flex-col items-center justify-between ">
        <div className={`size-8 rounded-xl flex  items-center ${orderinfo.paymentMethodType=='card'?'bg-violet-100 text-violet-500':'bg-gray-100 text-gray-400'} justify-center`}>
            <FontAwesomeIcon icon={orderinfo.paymentMethodType=='card'?faCreditCard:faMoneyBill}/>

        </div>
       
         <button onClick={()=>{
            setopendetails(!opendetails)
         }} className="rounded-xl cursor-pointer bg-gray-100 text-gray-600 py-1 px-3">Details <FontAwesomeIcon icon={opendetails?faArrowUp:faArrowDown}/></button>
       

    </div>

  </div>
  <AnimatePresence>
    {opendetails?<Orderdetails orderinfo={orderinfo}/>:''}
  </AnimatePresence>
  
  </>
  
}
