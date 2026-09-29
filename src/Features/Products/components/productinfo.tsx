'use client'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { Product } from "../types/product.type";
import Rating from "@/components/shared/Rating/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faArrowLeft, faArrowRight, faBolt, faCartShopping, faChain, faCheck, faChevronLeft, faChevronRight, faMinus, faPen, faPlug, faPlus, faShareNodes, faShoppingBag, faStar, faTrash, faTrashAlt, faTruck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Span } from "next/dist/trace";
import { faCommentDots, faHeart, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import {Navigation} from 'swiper/modules'
import 'swiper/css/navigation'
import { getallproducts, getproductreviews } from "../server/getproducts.server";
import Productcard from "./productcard";
import { Review } from "../types/review.types";
import { log } from "console";
import Image from "next/image";
import boy from '../../../assets/images/boy.png'
import { object } from "zod";
import Popupreview from "./Popupreview";
import { useAppSelector } from "@/store/store";
import { deletereview } from "../server/review.server";
import { toast } from "react-toastify";
export default function Productinfo({data}:{data:Product}) {
    const islowstock=data.quantity>0&&data.quantity<10
    const onsale=data.priceAfterDiscount?data.priceAfterDiscount<data.price:false
    const [number,setnumber]=useState(1)
    const [selected,setselected]=useState<"ProductDetails"|"Reviews">('ProductDetails')
    const [products,setproducts]=useState<null|Product[]>(null)
    const [reviews,setreviews]=useState<null|Review[]>(null)
    const [popreview,setpopupreview]=useState<boolean>(false)
    const {userinfo}=useAppSelector((state)=>{
        return state.auth
    })
   const myreview=reviews?.find((review)=>review.user._id===userinfo?.id)
    
    const getreviews=async()=>{
        const response=await getproductreviews(data._id)
        setreviews(response.data)

    }
    const getproducts=async()=>{
        const response=await getallproducts()
        setproducts(response.data)

    }
     const deleterev=async()=>{
        try {
            if(myreview){
                const response=await deletereview(myreview._id)
                
                toast.success('your review is deleted')
                getreviews()
                console.log(response);

                
            }
        } catch (error) {
            toast.error('something went wrong')
        }
    }
    const Relatedproducts=products?.filter((product)=>product.category.name===data.category.name&&product._id!==data._id)
    useEffect(()=>{
        getproducts()
        getreviews()
    },[])
    
    const ratingreview:Record<number,number>={
        1:0,
        2:0,
        3:0,
        4:0,
        5:0
    }
    {reviews?.map((review)=>{
        if(review.rating){
            ratingreview[+review.rating.toFixed(0)]++
        }
    })}
    console.log(ratingreview);
    
    

  return <>
  <section className="grid bg-white p-5 grid-cols-12 gap-5 max-w-7xl mx-auto w-full ">
    <div className="gallery border shadow-lg border-gray-500/20 lg:col-span-4 col-span-12">
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
    <div className="content border border-gray-500/20 p-5 shadow-lg space-y-3 lg:col-span-8 col-span-12 ">
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
        <ul className="flex items-center *:gap-2 *:flex *:items-center   gap-3">
            <li className={`${selected==="ProductDetails"?'bg-green-100  text-green-600 after:w-full':''} after:w-0 p-2 cursor-pointer hover:after:w-full after:transition-all after:duration-400 after:left-0 after:h-1 after:bg-green-600 after:absolute relative after:bottom-0  `} onClick={()=>{
                setselected('ProductDetails')
            }}><FontAwesomeIcon className="" icon={faShoppingBag}/> <span className="">ProductDetails</span></li>
            <li className={`${selected==="Reviews"?'bg-green-100 text-green-600 after:w-full':''} after:w-0 p-2  cursor-pointer hover:after:w-full after:transition-all after:duration-400 after:left-0 after:h-1 after:bg-green-600 after:absolute relative after:bottom-0  `} onClick={()=>{
                setselected('Reviews')
            }}><FontAwesomeIcon icon={faStar}/> <span className="">Reviews({reviews?.length})</span></li>
            
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
        {selected==='Reviews'?<>
        <div className="Reviews bg-white p-5">
            <span className="bg-[#F2FBF6] py-1 px-3 rounded-full"> <FontAwesomeIcon icon={faCommentDots}/> <span className="text-green-600">Customer feedback</span></span>
            
            <div className="grid  grid-cols-12 my-10">
                <div className=" md:col-span-4 col-span-12 space-y-2  text-center">
                    <h1 className="text-4xl font-bold ">Rating & Reviews</h1>
                    <h2 className="text-2xl font-bold">
                        {data.ratingsAverage}
                    </h2>
                    <Rating rating={data.ratingsAverage}/>
                    <p className="text-gray-500">Based on {data.ratingsQuantity} reviews</p>

                </div>
                <div className="md:col-span-8 col-span-12 flex-col flex justify-center gap-2">
                   {Object.keys(ratingreview).map((key,index)=>{
                    return  <div key={index} className="grid items-center    grid-cols-12 gap-2 ">
                        <div className="flex md:col-span-1 col-span-2 text-sm text-gray-500 items-center  gap-1">
                            <span className="  ">{key} </span>
                            <span><FontAwesomeIcon icon={faStar}/> </span>
                        </div>
                        
                        <div className="border  md:col-span-9 col-span-7 border-gray-400/20 bg-gray-100 rounded-full  h-3">
                        <div className={`one h-full rounded-full bg-green-600 `} style={{width:`${reviews?ratingreview[+key]/reviews?.length*100:0}%`}}></div>
                        
                    </div>
                    <span className="md:col-span-2 col-span-3">{reviews?(ratingreview[+key]/reviews.length *100).toFixed(0):0} %</span>
                    </div>
                   })}

                </div>
                


            </div>
            <div className="yourreview flex flex-col md:flex-row md:items-center my-10 md:justify-between gap-2 overflow-hidden bg-[#F2FBF6] rounded-xl p-5">
                    <div>
                        <p className="font-bold">Have you tried this product?</p>
                        <p>Share your thoughts with other shoppers.</p>
                    </div>
                    <button onClick={()=>{
                        setpopupreview(true)
                    }} className="bg-[#22C55E] text-white rounded-lg hover:bg-green-700 cursor-pointer transition-all duration-200 shadow-lg py-2 px-4">Write a review</button>


                </div>
                
            <div className="rev h-64 p-3 w-full  overflow-y-auto space-y-8">
              {reviews?reviews.map((review)=>{
                if(review.user._id==userinfo?.id){
                    

                }
                return   <>
                <div className="flex justify-between items-start gap-3">
                    <div className="grid grid-cols-[80px_1fr] ">
                         <div className=" size-20  relative rounded-full" >
                     <Image src={boy} alt={review.user.name} fill/>
                     
                </div>
                <div className="space-y-2  text-sm">
                    <div className="flex flex-col md:flex-row  md:items-center gap-2">
                        <h3 className="font-bold">{review.user.name}</h3>
                        <span className="text-green-600 font-bold bg-green-50 py-1 w-fit text-xs px-3 rounded-full"><FontAwesomeIcon icon={faCheck}/> Verified user</span>
                    </div>
                    <Rating rating={review.rating}/>
                    <p className="">{review.review}</p>
                </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
                        {review.user._id==userinfo?.id?<>
                        <button onClick={()=>{
                            setpopupreview(true)
                        }} className="border border-gray-500/20 rounded-lg p-1 hover:border-green-500 transition-all duration-200  hover:bg-green-100 bg-white"><FontAwesomeIcon icon={faPenToSquare}/></button>
                        <button onClick={deleterev} className="border border-gray-500/20 rounded-lg p-1  hover:border-red-500 transition-all duration-200 hover:bg-red-100 bg-white"><FontAwesomeIcon icon={faTrashAlt}/></button>
                        </>:''}
                    </div>
                </div>
               
                </>
              }):''}
            </div>



        </div>
        
        </>:''}
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
            slidesPerView={1}
            spaceBetween={10}
            modules={[Navigation]}
            navigation={{
                prevEl:'.custom-prev',
                nextEl:'.custom-next'
            }}
           breakpoints={{
    640: {
        slidesPerView: 2,
    },
    1024: {
        slidesPerView: 4,
    },
    1280: {
        slidesPerView: 5,
    },
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
    {popreview?<Popupreview productname={data.title} reviews={reviews} productid={data._id} setpopup={setpopupreview} setreviewsofproduct={setreviews} />:''}
  
  </>
}
