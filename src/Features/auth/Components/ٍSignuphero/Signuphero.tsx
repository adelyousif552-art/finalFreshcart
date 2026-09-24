import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faLeaf, faShieldHalved, faStar, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import yousifimg from '../../../../assets/images/yousif.jpg'
import Image from 'next/image'

export default function Signuphero() {
  interface listtype {
    icon:IconProp,
    title:string,
    desc:string
  }
  const list:listtype[]=[
    {
      icon:faLeaf,
      title:'Fresh & Organic',
      desc:'Premium quality products sourced directly from farms'
    },
    {
      icon:faTruck,
      title:'Fast Delivery',
      desc:'Same-day delivery available in most areas'
    },
    {
      icon:faShieldHalved,
      title:'Secure Shopping',
      desc:'Your data and payments are completely secure'
    }
  ]
    


  
  return <>
  <div className=' min-h-screen flex items-center justify-center'>
    <section className='container mx-auto max-w-xl space-y-5  p-3'>
     <div className='px-1 space-y-5'>
       <h1 className='font-bold text-4xl'>Welcome to <span className='text-green-600'>FreshCart</span></h1>
      <p className='text-sm text-gray-500'>Join thousands of happy customers who enjoy fresh groceries <br/> delivered right to their doorstep</p>
     </div>
      <ul className='space-y-1'>
        {list.map((item,index)=>{
          return( 
          <li key={index} className='flex items-center  py-2   space-x-3'>
          <div className='size-10 rounded-full text-green-700/70 flex justify-center items-center bg-green-300/50'>
            <FontAwesomeIcon icon={item.icon} />
          </div>
          <div>
            <h2 className='font-bold'>{item.title}</h2>
            <p className='text-sm text-gray-500'>{item.desc}</p>
          </div>
        </li>)
          
          

        })}
      </ul>
      <section className="testimonial bg-white p-5 rounded-lg shadow">
        <article className='space-y-3'>
          <div className='flex items-center space-x-2'>
           <div className='size-10 rounded-full relative'>
             <Image
             src={yousifimg}
             alt='Yousif'
             fill
             className='rounded-full'
             />
           </div>
           <div>
            <h3>Yousif Adel</h3>
            {[...Array(5)].map((item,index)=>{
              return <FontAwesomeIcon key={index} className='text-yellow-400' icon={faStar}/>
            })}
           </div>

          </div>
          <blockquote>
            "FreshCart has completely Changed how i shop for groceries. the <br/> quality is amaxing and delivery is always in time!"
          </blockquote>
        </article>
      </section>

      

    </section>
  </div>
  
  
  </>
}
