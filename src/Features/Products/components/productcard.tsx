'use client'
import Image from "next/image";
import img from '../../../assets/images/yousif.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPlus, faRotate, faStar } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../types/product.type";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Span } from "next/dist/trace";
import Rating from "@/components/shared/Rating/Rating";
import { useRouter } from "next/navigation";
import { addtocart } from "@/Features/cart/server/cart.server";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/store";
import { cartactions } from "@/Features/cart/store/cart.slice";
import { addtowishlist, getuserwishlist } from "@/Features/wishlist/server/wishlist.server";
import { wishlistactions } from "@/Features/wishlist/store/wishlist.slice";

export default function Productcard({product}:{product:Product}) {
  
  const {setwishlistitems}=wishlistactions
  const addwish=async()=>{
    try {
      const response=await addtowishlist(product.id)
      if(response.status=='success'){
        toast.success(response.message)
        const userwishlist=await getuserwishlist()
       dispatch( setwishlistitems(userwishlist))

      }
    } catch (error) {
      throw error
    }
  }
  const handlecart=async ()=>{
   console.log("yousif");
   
    try {
       const response=await addtocart({productid:product._id})
       console.log(response);
       
       if(response.status=='success'){
        toast.success(response.message)
        
        
        dispatch(setcartinfo(response))
        
       }
       
       
      
    } catch (error) {
      toast.error('failed to add to cart')
      
    }
  }
  const router=useRouter()
    const {_id,brand,category,createdAt,description,imageCover,price,ratingsAverage,quantity,title,priceAfterDiscount,ratingsQuantity,subcategory}=product
    const onsale=priceAfterDiscount?priceAfterDiscount<price:false
    const percentage=priceAfterDiscount?Math.round((price-priceAfterDiscount)/price*100):0
    const dispatch=useAppDispatch()
    const {setcartinfo}=cartactions
  return <>
  <div onClick={()=>{
     router.push(`/product/${_id}`)
  }}  className=" shadow-lg bg-white rounded-lg cursor-pointer py-2 hover:scale-105 transition-all duration-200">
    <div className="image relative">
        <Image src={imageCover} className="mx-auto" width={150} height={150} alt={title} />
        <div className="absolute top-2 flex flex-col  gap-3 right-2">
         <button onClick={(e)=>{
          e.stopPropagation()
          addwish()
         }} className="cursor-pointer hover:text-green-600 transition-all duration-200"><FontAwesomeIcon icon={faHeart}/></button>
         <button className="cursor-pointer hover:text-green-600 transition-all duration-200"><FontAwesomeIcon icon={faRotate}/></button>
         <button onClick={()=>{
    router.push(`/product/${_id}`)
  }} className="cursor-pointer hover:text-green-600 transition-all duration-200"><FontAwesomeIcon icon={faEye}/></button>

        </div>
        {onsale?
        <span className="h-5 w-15 text-center bg-red-500 text-white  px-3 rounded-lg absolute top-2 left-5 ">-{percentage}%</span>
      :''}
    </div>
    <div className="content py-1 px-3">
        <h6 className="text-sm text-gray-500 ">{category.name}</h6>
        <h2 className="line-clamp-1">{title}</h2>
       <div className="">
         <Rating rating={ratingsAverage}/>
         <span className="text-sm mx-3">{ratingsAverage}({ratingsQuantity})</span>
       </div>
        <div className="flex items-center justify-between">
           {onsale?<div className="space-x-2">
            <span className="font-bold">{priceAfterDiscount} EGP</span>
            <span className="line-through text-sm">{price}EGP</span>

           </div>:<span className="font-bold">{price} EGP</span>}
           <button onClick={(e)=>{
            e.stopPropagation()
            handlecart()
           }} className="flex cursor-pointer items-center justify-center size-10 rounded-full bg-green-600 "><FontAwesomeIcon icon={faPlus} className="text-white"/></button>
        </div>
    </div>
  </div>
  
  
  
  </>
}
