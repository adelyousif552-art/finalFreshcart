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


export default function Ordersscreen() {
   const {userinfo}=useAppSelector((state)=>{
    return state.auth
   })
  if(!userinfo){
    return
  }
  const {id}=userinfo
  const [orders,setorders]=useState<null|OrdersResponse>(null)
  useEffect(()=>{
    const fetchorders=async()=>{
        if(id){
            const response=await getuserorders(id)
            setorders(response)
        }

    }
    fetchorders()
  },[])
  if(!orders){
    return <PageLoader/>
  }
  return <>
  <section className="max-w-7xl mx-auto w-full ">
   {orders.length>0?<>
    <div className="header gap-3 flex items-center">
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
