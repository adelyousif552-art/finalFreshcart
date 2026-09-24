import Image from "next/image";
import { Product } from "../types/wishlist.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Rating from "@/components/shared/Rating/Rating";
import { Span } from "next/dist/trace";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { cartactions } from "@/Features/cart/store/cart.slice";
import { addtocart } from "@/Features/cart/server/cart.server";
import { deletewish, getuserwishlist } from "../server/wishlist.server";
import { wishlistactions } from "../store/wishlist.slice";


export default function Wishlistcard({product}:{product:Product}) {
    const {setcartinfo}=cartactions
    const {setwishlistitems}=wishlistactions
    const dispatch=useAppDispatch()
    const discountpercent=((product.price-product.priceAfterDiscount)/product.price)*100
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
      const deletefromwishlist=async()=>{
        try {
            const response=await deletewish(product._id)
            if(response.status=='success'){
                toast.success(response.message)
                const wishresponse=await getuserwishlist()
                dispatch(setwishlistitems(wishresponse))
                
            }
        } catch (error) {
            toast.error('something went wrong')
        }
      }
  return <>
  
  <div className="bg-white rounded-2xl border hover:shadow-2xl shadow transition-all duration-300  border-gray-400/20 ">
  <div className="image relative  h-64 ">
<Image src={product.imageCover} alt={product.title} className="object-contain" fill/>
<div className="bg-red-100 absolute top-2 right-2 size-8 rounded-full flex items-center justify-center ">
    <FontAwesomeIcon className="text-red-500" icon={faHeart}/>

</div>
{product.priceAfterDiscount?<span className="size-5 py-1 px-7 flex items-center justify-center rounded-sm bg-black text-white absolute top-4 left-2">{discountpercent.toFixed(0)}%</span>:''}
  </div>
  <div className="content py-5 px-3 space-y-3">
    <h2 className="text-green-600 font-bold">{product.category.name}</h2>
    <h1 className="line-clamp-1">{product.title}</h1>
    <div>
        <Rating rating={product.ratingsAverage}/>
        <span className="text-sm ">{product.ratingsAverage} ({product.ratingsQuantity})</span>
    </div>
    {product.priceAfterDiscount?<><span className="font-bold">{product.priceAfterDiscount} EGP</span> <span className="line-through text-sm text-gray-500">{product.price} EGP</span></>:<span className="font-bold">{product.price} EGP</span>}
    <div className="flex items-center gap-2">
<button onClick={handlecart} className="btn text-white grow"><FontAwesomeIcon icon={faShoppingCart}/> <span>Add to Cart</span></button>
<button onClick={deletefromwishlist} className="btn bg-white border border-gray-400/50 hover:text-red-500 hover:border-red-500 transition-all duration-200 "><FontAwesomeIcon icon={faTrashAlt}/></button>
    </div>



  </div>

  </div>
  
  </>
}
