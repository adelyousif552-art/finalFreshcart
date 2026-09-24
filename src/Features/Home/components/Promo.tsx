import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHeadphones, faRotateBack, faShieldHalved, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { title } from "process";
import { text } from "stream/consumers";


export default function Promo() {
    type promotype={
        icon:IconProp,
        title:string,
        description:string,
        color:string
    }
    const promolist=[
        {
            icon:faTruck,
            title:"free shipping",
            description:"on orders over 500 EGP",
            bgcolor:"bg-blue-300/50",
            textcolor:"text-blue-500"
        },
         {
            icon:faShieldHalved,
            title:"secure payment",
            description:"100% secure transactions",
            bgcolor:"bg-green-300/50",
            textcolor:"text-green-500"
        },
         {
            icon:faRotateBack,
            title:"Easy Returns",
            description:"14-day return policy",
            bgcolor:"bg-orange-300/50",
            textcolor:"text-orange-500"
        },
         {
            icon:faHeadphones,
            title:"24/7 support",
            description:"dedicated support team",
            bgcolor:"bg-purple-300/50",
            textcolor:"text-purple-500"
        }
    ]
  return <>
  <section className="mt-5 max-w-6xl mx-auto">
   <ul className="grid lg:grid-cols-4 grid-cols-2  gap-4">
    {promolist.map((promo,index)=>{
        return <li key={index} className=" bg-white p-5 rounded-lg shadow-lg flex items-center gap-4">
        <div className={`size-8 rounded-full ${promo.bgcolor} flex items-center justify-center`}>
        <FontAwesomeIcon className={`${promo.textcolor}`} icon={promo.icon}/>

        </div>
        <div>
            <h1>{promo.title}</h1>
            <p className="text-sm text-gray-500">{promo.description}</p>
        </div>
    </li>
    })}
   </ul>
  </section>
  
  
  </>
}
