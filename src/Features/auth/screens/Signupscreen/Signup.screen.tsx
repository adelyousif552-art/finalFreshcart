import React from 'react'
import Signuphero from '../../Components/ٍSignuphero/Signuphero'
import Signupform from '../../Components/Signupform/Signupform'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClockRotateLeft, faTag, faTruck } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
interface items{
    icon:IconProp,
    title:string,
    desc:string
}
const itemslist:items[]=[
    {
    icon:faTruck,
    title:'Faster Checkout',
    desc:'Save your delivery information for a quicker shopping experience'
},
{
    icon:faTag,
    title:'Exclusive Deals',
    desc:'Get access to member-only discounts and early sale notifications'
},
{
    icon:faClockRotateLeft,
    title:'Order History',
    desc:'Easily track and reorder your favorite products from past purchases'
}
]

export default function Signupscreen() {
  return<>
  <div className='grid lg:grid-cols-2 '>
    <Signuphero/>
    <Signupform/>
  </div>
  <div className='bg-white mt-5 shadow-lg py-10'>
    <div className=' max-w-2xl mx-auto space-y-8  text-center  '>

    <h1 className='text-2xl text-center font-bold'>Why Create an Account with FreshCart?</h1>
    <ul className='flex space-x-5 items-center justify-center *:grow'>
        {itemslist.map((item,index)=>{
            return( 
            <li key={index} className='flex space-y-2 flex-col items-center'>
            <div className="icon  size-10 rounded-full bg-green-300 text-green-700 flex items-center justify-center">
                <FontAwesomeIcon icon={item.icon} />
            </div>
            <h3 className='font-bold'>{item.title}</h3>
            <p className='text-sm text-gray-500'>{item.desc}</p>
        </li>
        )
        })}
    </ul>
  </div>
  </div>
  
  
  </>
}
