'use client'
import { useAppSelector } from "@/store/store";
import { faLock, faTruck, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";


export default function Checkoutsummary() {
    const {numOfCartItems,products,totalcartprice}=useAppSelector((state)=>{
        return state.cart
    })
    const subtotal=totalcartprice
    const shipping=totalcartprice>500?0:100
    const total=shipping+subtotal
  return <>
  <div className="lg:col-span-4 md:col-span-6 col-span-12 h-fit sticky top-4 bg-white shadow border-gray-400">
    <div className="p-5 bg-green-600 rounded-t-xl">
        <h1 className="text-white"><FontAwesomeIcon icon={faLock}/><span>Order Summary</span></h1>
        <span className="text-gray-200">{numOfCartItems} {numOfCartItems>1?'items':'item'}</span>

    </div>
    <div className="p-5">
        <ul className="space-y-4 h-52 overflow-y-scroll">
            {products.map((product)=>{
                return <li className="bg-gray-200/50  flex items-center justify-between p-5" key={product._id}>
                    <div className="flex items-center gap-2">
                        <div className="bg-white w-12 h-12 relative ">
                        <Image src={product.product.imageCover} alt={product.product.title} fill/>

                    </div>
                    <div>
                        <h1 className="line-clamp-1 text-sm font-bold">{product.product.title}</h1>
                        {product.priceAfterDiscount?<span className="text-gray-500">{product.count} x {product.priceAfterDiscount} EGP</span>:<span className="text-gray-500">{product.count} x {product.price} EGP</span>}
                    </div>
                    </div>
                    <span className="font-bold">{product.price*product.count}</span>

                </li>
            })}
        </ul>
        <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between">
            <span className="text-gray-500">subtotal</span>
            <span className="text-gray-500">{subtotal}</span>
            
        </div>
        <div className="flex items-center justify-between">
            <span className="text-gray-500"><FontAwesomeIcon icon={faTruck}/> Shipping</span>
            <span>{shipping>0?shipping:'Free'}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="font-bold">Total</span>
            <span className="text-green-500 text-xl font-bold">{total} <span className="text-sm text-gray-500">EGP</span></span>
        </div>
        <button form="checkout-form" type="submit" className="btn w-full text-white"><FontAwesomeIcon icon={faWallet}/> Place Order</button>
        </div>
    </div>

  </div>
  
  
  </>
}
