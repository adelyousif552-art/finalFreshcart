'use client'
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getuserorders } from "../server/orders.server";
import { useAppSelector } from "@/store/store";

import { useEffect, useState } from "react";
import Ordercard from "../components/Ordercard";
import { OrdersResponse } from "../types/order.types";
import NoOrders from "../components/NoOrders";
import PageLoader from "@/components/Ui/PageLoader";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function Ordersscreen() {
  const router=useRouter()
  const [failed,setfailed]=useState(false)
  const [attempt,setattempt]=useState(0)
   const {userinfo}=useAppSelector((state)=>{
    return state.auth
   })
   const [orders,setorders]=useState<null|OrdersResponse>(null)
   const id=userinfo?.id
   useEffect(()=>{
    if(!userinfo){
router.push('/login')
    return
  }
    const fetchorders=async()=>{
        if(id){
           try {
             const response=await getuserorders(id)
            if(response.success){
              if(response.data){
 setorders(response.data)
              }
             
            }else{
              toast.error('Failed to fetch orders')
            setfailed(true)
            }
           } catch (error) {
            
           }
        }

    }
    fetchorders()
  },[id,attempt,router])
  
   if (failed) {
    return (
      <section className="max-w-7xl mx-auto w-full p-10 text-center">
        <p className="text-gray-500">We couldn&apos;t load your orders.</p>
        <button
          onClick={() => { setfailed(false); setattempt((a) => a + 1) }}
          className="btn text-white mt-3"
        >
          Try again
        </button>
      </section>
    )
  }
  
 
  if(!orders){
    return <PageLoader/>
  }
  return <>
  <section className="max-w-7xl mx-auto w-full p-2  ">
   {orders.length>0?<>
    <div className="header gap-3 flex items-center my-5">
        <div className="size-12 rounded-xl bg-green-600 text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faBagShopping}/>

        </div>
        <div>
            <h1 className="text-2xl font-bold">My Orders</h1>
            <p className="text-gray-500">Track and manage your {orders.length} {orders.length>1?'orders':'order'}</p>
        </div>
    </div>
    <div className="space-y-3">
     {orders.map((order)=>{
        return <Ordercard key={order._id} orderinfo={order}/>
     })}
    </div>
   </>:<NoOrders/>}

  </section>
  
  </>
}
