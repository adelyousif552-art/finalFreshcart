'use client'
import { faClose, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createreview, deletereview, updatereview } from "../server/review.server";
import { toast } from "react-toastify";
import { getproductreviews } from "../server/getproducts.server";
import { Review } from "../types/review.types";
import { useAppSelector } from "@/store/store";


export default function Popupreview({productname,productid,setpopup,setreviewsofproduct,reviews}:{
    productname:string,
    productid:string,
    setpopup:Dispatch<SetStateAction<boolean>>,
    setreviewsofproduct:Dispatch<SetStateAction<null|Review[]>>,
    reviews:Review[]|null,
    
}) {
    const rev:Record<number,string>={
        0:'poor',
        1:'fair',
        2:'good',
        3:'very good',
        4:'excellent'

    }
    
    const [hoveredreview,sethoveredreview]=useState<null|number>(null)
    const [selectedreview,setselectedreview]=useState<null|number>(null)
    const currentreview=hoveredreview??selectedreview
    const [reviewcomment,setreviewcomment]=useState('')
    const handlesubmit=async(value:{review:string,rating:number},)=>{
       try {
         const response=await createreview(value,productid)
        toast.success('review created ')
       const reviewresponse=await getproductreviews(productid)
       setreviewsofproduct(reviewresponse.data)
       setpopup(false)
       console.log(response);
       
       
       
      

       } catch (error) {
        toast.error('something went wrong')
       }
    }
    const handleupdate=async(values:{review:string,rating:number})=>{
      try {
         if(mylastreview){
         const response=await updatereview(values,mylastreview._id)
         
         toast.success('your review is updated')
          const reviewresponse=await getproductreviews(productid)
       setreviewsofproduct(reviewresponse.data)
        setpopup(false)
         

       }
      } catch (error) {
        toast.error('something went wrong')
      }
    }
   
    const {userinfo}=useAppSelector((state)=>{
            return state.auth
        })
    const mylastreview=reviews?.find((review)=>review.user._id===userinfo?.id)
   useEffect(()=>{
     if(mylastreview){
        setreviewcomment(mylastreview.review)
        setselectedreview(mylastreview.rating)
    }
   },[])

    
  return <>
  <div onClick={()=>{
    setpopup(false)
  }} className="overlay fixed z-50 inset-0 bg-gray-500/20 flex items-center justify-center">
    <div onClick={(e)=>{
        e.stopPropagation()

    }} className="bg-white p-5 max-w-xl w-full shadow-xl rounded-xl ">
        <div className="flex items-center justify-between">
           <div>
             <p className="font-bold">{mylastreview?'Edit Review':'Write Review'}</p>
        <p className="text-gray-400">{productname}</p>
           </div>
           <button onClick={()=>{
            setpopup(false)
           }} className="text-gray-500"><FontAwesomeIcon icon={faClose}/></button>
        </div>
        <div className="bg-[#F2FBF6] rounded-lg p-5 flex flex-col items-center ">
           <div onMouseLeave={()=>{
            sethoveredreview(null)
           }}  className="flex  w-fit   items-center gap-3  justify-center">
              {[...Array(5)].map((elm,index)=><FontAwesomeIcon onClick={()=>{
                setselectedreview(index)
              }} onMouseEnter={()=>{
                sethoveredreview(index)
            }}  className={`  ${currentreview!=null&&currentreview>=0?index<=currentreview?'text-yellow-500':'text-black':''}   transition-all duration-200 `}  key={index} icon={faStar}/>)}
           </div>
            <div className="text-center mt-2">
                <span className="w-full h-4 block">{currentreview!==null?rev[currentreview]:''}</span>
            </div>

        </div>
        <div className="mt-5">
            <h3 className="font-bold">Your Review</h3>
            <textarea value={reviewcomment} onChange={(e)=>{
                setreviewcomment(e.target.value)
            }} placeholder="what did you like or dislike? How was the fit,quality,or deivery?" className="h-32 w-full rounded-lg p-2 focus:outline-none border focus:border-green-400 border-gray-400/30"></textarea>
        </div>
        <div className="flex items-center gap-2 *:cursor-pointer *:transition-all *:duration-200 *:grow">
            <button onClick={()=>{
                setpopup(false)
            }} className="bg-white py-1 border hover:bg-gray-100 border-gray-500/50 rounded-xl ">cancel</button>
            <button onClick={()=>{
                mylastreview&&selectedreview!=null?handleupdate({review:reviewcomment,rating:selectedreview+1}):selectedreview!=null?handlesubmit({review:reviewcomment,rating:selectedreview+1}):''
            }} className="bg-[#22C55E] py-1 hover:bg-green-700  text-white shadow-lg rounded-xl">{mylastreview?'Update Review':'Submit Review'}</button>
        </div>

    </div>
  </div>
  
  
  </>
}
