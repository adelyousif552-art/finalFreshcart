
import { faLocationDot, faPhone, faShoppingBag, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {motion}from 'motion/react'
import { Order } from '../types/order.types'
import Image from 'next/image'
export default function Orderdetails({orderinfo}:{orderinfo:Order}) {
 
  return <>
  <motion.div
  initial={{
    y:-120,
    opacity:0

  }}
  animate={{
    y:0,
    opacity:1

  }}
  transition={{duration:0.5}}
  exit={{y:-80,
    opacity:0

  }
}
  
   className='p-10'>
    <div className='flex items-center gap-3'>
        <div className='size-10 flex items-center justify-center bg-green-200 rounded-xl'>
        <FontAwesomeIcon className='text-green-600' icon={faShoppingBag}/>
    </div>
    <span className='font-bold'>Order Items</span>
    </div>
    <div className="items mt-5">
        <ul className='space-y-2'>
            {orderinfo.cartItems.map((product)=>{
                return <li className='bg-white flex items-center justify-between p-5 rounded-lg' key={product._id}>
                    <div className='flex items-center gap-3'>
                        <div className="image w-20 h-20 flex items-center justify-center bg-gray-100">
                            <Image src={product.product.imageCover} alt={product.product.title} width={50} height={50}/>

                        </div>
                        <div>
                            <h1 className='line-clamp-1 font-bold'>{product.product.title}</h1>
                            <span className='text-gray-400'>{product.count} x {product.priceAfterDiscount?product.priceAfterDiscount:product.price}</span>
                        </div>
                    </div>
                    <div className='text-gray-400'>
                        <span className='font-bold text-black'>{product.priceAfterDiscount?product.count*product.priceAfterDiscount:product.count*product.price}</span>
                         EGP
                    </div>

                </li>
            })}

        </ul>
    </div>


  </motion.div>
  <section className='grid gap-3 p-10 grid-cols-2'>
    <div className='bg-white shadow p-5'>
     <div className='flex items-center gap-2 my-5'>
       <div className='size-8 rounded-xl flex items-center justify-center bg-blue-100'>
        <FontAwesomeIcon className='text-blue-600' icon={faLocationDot}/>
      </div>
      <span className='font-bold'>Delivery Address</span>
     </div>
     <ul className=''>
      <li className='text-black'>{orderinfo.shippingAddress?.city}</li>
      <li className='text-gray-500'>{orderinfo.shippingAddress?.details}</li>
      <li className='text-gray-500 space-x-1'><FontAwesomeIcon icon={faPhone}/><span>{orderinfo.shippingAddress?.phone}</span></li>
     </ul>
    </div>
    <div className="oredersummary p-5 bg-blue-200 shadow">
       <div className='flex items-center gap-2 my-5'>
       <div className='size-8 rounded-xl flex items-center justify-center bg-blue-600'>
        <FontAwesomeIcon className='text-white' icon={faTruck}/>
      </div>
      <span className='font-bold'>Delivery Address</span>
     </div>
     <ul className='*:flex *:text-gray-500 *:items-center *:justify-between'>
      <li><span>subtotal</span><span className=''>{orderinfo.totalOrderPrice-orderinfo.taxPrice-orderinfo.shippingPrice}</span></li>
      <li><span>shipping</span><span>{orderinfo.shippingPrice==0?'free':orderinfo.shippingPrice}</span></li>
      <li><span>tax</span><span>{orderinfo.taxPrice}</span></li>
      <li className='mt-5 border-t py-2 border-gray-500'><span>total</span><span className='text-xl font-bold text-black'>{orderinfo.totalOrderPrice} EGP</span> </li>
     </ul>

    </div>

  </section>
  
  
  </>
}
