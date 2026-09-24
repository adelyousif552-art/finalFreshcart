import Image from 'next/image'
import React from 'react'
import cartimage from '../../../../assets/images/11697.jpg'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faClock, faShieldHalved, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Loginhero() {
    type loginitem={
        icon:IconProp,
        title:string

    }
    const loginitems:loginitem[]=[
        {
            icon:faTruck,
            title:'Free Delivery'
        },
         {
            icon:faShieldHalved,
            title:'Secure Payment'
        },
         {
            icon:faClock,
            title:'24/7 Support'
        }
    ]
        

    
  return <>
 <div className='min-h-screen    flex items-center justify-center '>
     <div className="container max-w-md    space-y-5 text-center  p-5">
    <div className="image  shadow-lg rounded-lg  bg-green-300 ">
        <Image
        src={cartimage}
        alt='cart'
       
        
        
       
        />
    </div>
    <h1 className='font-bold text-3xl'>FreshCart - Your One-Stop Shop for Fresh Products</h1>
    <p className='text-sm text-gray-500'>Join thousands of happy customers who trust FreshCart for their dairy <br/>  grocery needs</p>
    <ul className='flex items-center justify-center gap-2 '>
        {loginitems.map((item,index)=>{
            return <li className='' key={index} ><FontAwesomeIcon className='text-green-600' icon={item.icon}/> <span className='text-gray-500'>{item.title}</span></li>
            
            
        })}
    </ul>
  </div>
  
 </div>
  </>
}
