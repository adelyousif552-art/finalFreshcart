'use client'
import Image from "next/image";
import { CartProduct } from "../types/cart.types";
import Rating from "@/components/shared/Rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { cartactions } from "../store/cart.slice";
import { faHeart, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { removeproduct, updatequantity } from "../server/cart.server";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/store";
import swal from 'sweetalert2'


export default function Cartcard({product}:{product:CartProduct}) {
    const dispatch=useAppDispatch()
    const {increasecounter,decreasecounter,setcartinfo}=cartactions
    const updatecount=async(count:number)=>{
        try {
            const response=await updatequantity(product.product._id,count)
            if(response.status='success'){
               dispatch( setcartinfo(response))
            }
        } catch (error) {
            
        }


    }
    const deleteproduct=async()=>{
       try {
        const result=await swal.fire({
            html:`<div className="bg-white rounded-lg">
                <div class="icon mx-auto w-16 h-16 rounded-full bg-red-200 flex items-center justify-center">
                   <svg class="w-8 h-8 text-red-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"/></svg>

                </div>
                <h1 class="text-2xl font-bold">Remove item?</h1>
                <p class="text-gray-500">Are you sure you want to remove <span class="text-xl  font-black">${product.product.title.slice(0,40)}${product.product.title.length>40?'...':''}</span> from your cart?</p>



            </div>`,
            showCancelButton:true,
            showConfirmButton:true,
            buttonsStyling:false,
            cancelButtonText:'cancel',
            confirmButtonText:'Remove',
            reverseButtons:true,
            customClass:{
                cancelButton:'bg-white rounded-lg cursor-pointer py-2 px-5 border border-gray-400 mx-4 hover:border-green-400 hover:bg-green-200/20 transition-all duration-200',
                confirmButton:'bg-red-500 cursor-pointer rounded-lg py-2 px-5 text-white hover:bg-red-800 transition-all duration-200'
            }
        })
       if(result.isConfirmed){
         const response=await removeproduct(product.product._id)
        if(response.status=='success'){
            toast.success(response.message)
            dispatch(setcartinfo(response))
            
        }
       }
       } catch (error) {
        toast.error('something went wrong')
       }

    }
  return <>
  <li className="bg-white grid gap-4 md:grid-cols-12 shadow-lg rounded-xl p-5">
    <div className=" md:col-span-10 flex items-center  gap-x-4">
        <div className="image shrink-0 ">
        <Image src={product.product.imageCover} alt={product.product.title} width={100} height={100} className="rounded-xl object-cover border-2 border-gray-300/70"/>

    </div>
    <div >
        <h2 className="font-bold">{product.product.title}</h2>
        <p className="text-gray-500 text-sm">{product.product.category.name}</p>
        <p className="text-gray-500 mt-3"><span className="text-green-600 font-bold">{product.priceAfterDiscount?product.priceAfterDiscount:product.price} EGP</span> /Piece</p>
    </div>

    </div>
    <div className="md:col-span-2   flex md:flex-col flex-row-reverse justify-between items-center gap-3">
       <div className="flex items-center gap-2">
        <button className="size-10 cursor-pointer flex items-center border hover:border-red-500 transition-all duration-200 hover:text-red-500 border-gray-400/50 justify-center rounded-full ">
            <FontAwesomeIcon icon={faHeart}/>

        </button>
        
         <button onClick={deleteproduct} className="size-10 cursor-pointer flex items-center border hover:border-red-500 transition-all duration-200 hover:text-red-500 border-gray-400/50 justify-center rounded-full ">
            <FontAwesomeIcon icon={faTrashAlt}/>

        </button>
       </div>
       <div className="flex grow md:flex-col items-center gap-3   ">
         <div className="border flex items-center gap-1 border-gray-300 w-fit rounded-full">
            <button onClick={()=>{
               
                updatecount(product.count+1)
                
            }} className="btn rounded-full bg-white text-sm hover:bg-green-200"><FontAwesomeIcon icon={faPlus}/></button>
            <span className="font-bold">{product.count}</span>
            <button onClick={()=>{
               updatecount(product.count-1)
            }} className="btn rounded-full text-sm bg-white hover:bg-green-200"><FontAwesomeIcon icon={faMinus}/></button>

        </div>
        <span className="font-bold text-center grow ">{product.price*product.count} EGP</span>
       </div>

    </div>
  </li>
  </>
}
