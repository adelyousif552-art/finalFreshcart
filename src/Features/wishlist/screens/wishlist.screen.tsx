'use client'
import Productcard from "@/Features/Products/components/productcard"
import { useAppSelector } from "@/store/store"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Wishlistcard from "../components/Wishlistcard"
import EmptyWishlist from "../components/EmptyWishlist"


export default function Wishlistscreen() {
    const {numofitems,products}=useAppSelector((state)=>{
        return state.wishlist
    })
  return<>
  <section className="max-w-7xl w-full mx-auto ">
    
    {numofitems>0?<>
     <div className="flex items-start bg-white p-5 justify-between">
         <div className="flex gap-5">
        <div className="icon col-span-1 size-10 rounded-xl bg-green-100/50 border border-green-300 text-green-600 flex items-center justify-center">
            <FontAwesomeIcon icon={faHeart}/>
        </div>
        <div className="col-span-11 space-y-2">
            <p className="text-gray-500">Home / Wishlist</p>
            <span className="bg-green-100/50 py-1 px-3 border border-green-300 text-green-600 font-bold text-sm rounded-xl">{numofitems} saved {numofitems>1?'items':'item'}</span>
            <h1 className="font-bold text-4xl mt-2">My Wishlist</h1>
            <p className="text-gray-500 text-lg ">Everything you've saved, in one place. Move items to your<br/> cart whenever you're ready.</p>
        </div>
      </div>
      
     </div>
   
    
    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-3 sm:grid-cols-2 grid-cols-1 my-10">
        {products?products.map((product)=>{
            return <Wishlistcard key={product._id} product={product}/>
        }):''}

    </div>
    </>:<EmptyWishlist/>}

  </section>
  
  </>
}
