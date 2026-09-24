'use client'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { Product } from "../types/product.type";
import Rating from "@/components/shared/Rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faArrowLeft, faArrowRight, faBolt, faCartShopping, faChain, faCheck, faChevronLeft, faChevronRight, faMinus, faPlug, faPlus, faShareNodes, faShoppingBag, faStar, faTruck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Span } from "next/dist/trace";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import {Navigation} from 'swiper/modules'
import 'swiper/css/navigation'
import { getallproducts } from "../server/getproducts.server";
import Productcard from "./productcard";
export default function Productinfo({data}:{data:Product}) {
    const islowstock=data.quantity>0&&data.quantity<10
    const onsale=data.priceAfterDiscount?data.priceAfterDiscount<data.price:false
    const [number,setnumber]=useState(1)
    const [selected,setselected]=useState<"ProductDetails"|"Reviews"|"Delivery">('ProductDetails')
    const [products,setproducts]=useState<null|Product[]>(null)
    const getproducts=async()=>{
        const response=await getallproducts()
        setproducts(response.data)

    }
    const Relatedproducts=products?.filter((product)=>product.category.name===data.category.name&&product._id!==data._id)
    useEffect(()=>{
        getproducts()
    },[])
    

  return <>
  <section className="grid bg-white p-5 grid-cols-12 gap-5 max-w-7xl mx-auto w-full ">
    <div className="gallery border shadow-lg border-gray-500/20 col-span-4">
<ImageGallery items={data.images.map((image)=>{
    return {
        original:image,
        thumbnail:image
    }
})} showFullscreenButton={false}
showPlayButton={false}
showNav={false}
/>
    </div>
    <div className="content border border-gray-500/20 p-5 shadow-lg space-y-3 col-span-8 ">
        <h1 className="font-bold text-4xl">{data.title}</h1>
        <div>
            <Rating rating={data.ratingsAverage}/>
            <span className="text-sm text-gray-500">{data.ratingsAverage} ({data.ratingsQuantity} reviews)</span>

        </div>
       {onsale? <div>
        <h2 className="text-2xl font-bold">{data.priceAfterDiscount} EGP</h2>
        <span className="text-gray-500 line-through">{data.price} EGP</span>
       </div>:<h2 className="text-2xl font-bold">{data.price} EGP</h2>}
        {data.quantity>0?<div className={`h-fit relative w-fit py-1 px-5 rounded-lg ${islowstock?'bg-red-200/50':'bg-green-200/50'} `}>
            <span className={`size-2 left-1 top-1/2 -translate-y-1/2 absolute rounded-full ${islowstock?'bg-red-500':'bg-green-500'}`}></span><p className={`${islowstock?'text-red-500':'text-green-500'}`}>{islowstock?`only ${data.quantity} left in stock`:'in stock'}</p>

        </div>:<div className="h-2 bg-red-200/50  rounded-lg ">
            <p className="text-red-500">out of stock</p>
            </div>}
        <p className="text-sm text-gray-500">{data.description}</p>
        <label htmlFor="quantity">Quantity</label>
        <div className="border  border-gray-500 p-3 w-fit">
            <button onClick={()=>{
               if(number>0){
                 setnumber(number-1)
               }
            }} className="p-1 cursor-pointer hover:bg-gray-200/50 transition-all duration-200" ><FontAwesomeIcon icon={faMinus}/></button>
            <input value={number} onChange={(e)=>{
                setnumber(+e.target.value)
            }} type="number" min={1} className=" w-20 px-5 text-center focus:outline-none " />
            <button onClick={()=>{
                setnumber(number+1)
            }} className="p-1 cursor-pointer hover:bg-gray-200/50 transition-all duration-200" ><FontAwesomeIcon icon={faPlus}/></button>

        </div>
        <div className="bg-green-200/20 p-3 mt-5 rounded-lg flex justify-between items-center">
            <span className="text-green-500">total price </span>
            <span className="text-green-700 font-bold text-2xl">{data.priceAfterDiscount?<span>{data.priceAfterDiscount*number} EGP</span>:<span className="text-green-700 font-bold text-2xl">{data.price*number} EGP</span>}</span>
        </div>
        <div className="flex items-center *:grow gap-3 ">
            <button className="text-white btn"><FontAwesomeIcon icon={faCartShopping}/> <span>Add to cart</span></button>
            <button className="text-white btn hover:bg-black/70 bg-black"><FontAwesomeIcon icon={faBolt}/> <span>Buy Now</span></button>
        </div>
        <div className="flex items-center gap-2">
            <button className="bg-white hover:bg-gray-200/50 btn grow border border-gray-400"><FontAwesomeIcon icon={faHeart} /> <span>Add to Wishlist</span></button>
            <button className="btn bg-white border hover:bg-gray-200/50 border-gray-400"><FontAwesomeIcon icon={faShareNodes}/></button>
        </div>
        
    </div>
   


  </section>
   <section className="max-w-7xl mx-auto w-full bg-white shadow-lg p-5">
        <ul className="flex items-center gap-3">
            <li className={`${selected==="ProductDetails"?'bg-green-100 text-green-600 after:w-full':''} after:w-0 p-2 cursor-pointer hover:after:w-full after:transition-all after:duration-400 after:left-0 after:h-1 after:bg-green-600 after:absolute relative after:bottom-0  `} onClick={()=>{
                setselected('ProductDetails')
            }}><FontAwesomeIcon icon={faShoppingBag}/> <span>Product Details</span></li>
            <li className={`${selected==="Reviews"?'bg-green-100 text-green-600 after:w-full':''} after:w-0 p-2  cursor-pointer hover:after:w-full after:transition-all after:duration-400 after:left-0 after:h-1 after:bg-green-600 after:absolute relative after:bottom-0  `} onClick={()=>{
                setselected('Reviews')
            }}><FontAwesomeIcon icon={faStar}/> <span>Reviews (6)</span></li>
            <li className={`${selected==="Delivery"?'bg-green-100 text-green-600 after:w-full':''} cursor-pointer after:w-0 p-2 hover:after:w-full after:transition-all after:duration-400 after:left-0 after:h-1 after:bg-green-600 after:absolute relative after:bottom-0  `} onClick={()=>{
                setselected('Delivery')
            }}><FontAwesomeIcon icon={faTruck}/> <span>Shipping & Returns</span></li>
        </ul>
        {selected=="ProductDetails"?<div className="p-2 mt-5">
            <h1 className="font-bold">About This Product</h1>
            <p className="text-gray-500">{data.description}</p>
            <div className="grid lg:grid-cols-2 gap-5 ">
                <div className="bg-green-100/50 p-2">
                    <h2 className="font-semibold">Product information</h2>
                    <ul className="text-gray-500 space-y-3 my-2">
                        <li className="flex items-center justify-between"><span>Category</span> <span className="text-black ">{data.category.name}</span></li>
                        <li className="flex items-center justify-between"><span>Subcategory</span> <span className="text-black ">{data.subcategory[0].name}</span></li>
                        <li className="flex items-center justify-between"><span>Brand</span> <span className="text-black ">{data.brand.name}</span></li>
                        <li className="flex items-center justify-between"><span>Items Sold</span> <span className="text-black ">{data.sold}+ sold</span></li>
                    </ul>

                </div>
                <div className="bg-green-100/50 p-2">
                <h2 className="font-semibold">Key Features</h2>
                <ul className="text-gray-500 space-y-3 my-2">
                    <li><FontAwesomeIcon className="text-green-600" icon={faCheck}/> Premium Quality Product</li>
                    <li><FontAwesomeIcon className="text-green-600" icon={faCheck}/> 100% Authentic Guarantee</li>
                    <li><FontAwesomeIcon className="text-green-600" icon={faCheck}/> Fast & Secure Packaging</li>
                    <li><FontAwesomeIcon className="text-green-600" icon={faCheck}/> Quality Tested</li>
                </ul>
                    

                </div>

            </div>

        </div>:''}
    </section>
    <section className="relatedproducts bg-white p-5 mt-5 shadow-lg max-w-7xl w-full mx-auto">
        <header className="flex items-center justify-between">
            <h1 className="font-bold text-2xl my-5 before:absolute relative before:w-2 before:h-full before:bg-green-600 before:left-0 px-4">You May Also Like This</h1>
            <div className="space-x-2">
                <button className="custom-next cursor-pointer text-gray-500 text-lg"><FontAwesomeIcon icon={faChevronRight}/></button>
                <button className="custom-prev cursor-pointer text-gray-500 text-lg"><FontAwesomeIcon icon={faChevronLeft}/></button>
            </div>
        </header>
        <div>
            <Swiper
            slidesPerView={5}
            spaceBetween={10}
            modules={[Navigation]}
            navigation={{
                prevEl:'.custom-prev',
                nextEl:'.custom-next'
            }}
            >
                {Relatedproducts?Relatedproducts.length>0?
                Relatedproducts.map((product)=><SwiperSlide key={product._id}>
                    <Productcard product={product}/>

                </SwiperSlide>)
                
                :'':'loading'}

                
            </Swiper>
        </div>

    </section>
  
  </>
}
