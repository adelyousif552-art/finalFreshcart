import Image from "next/image";
import joe from '@/assets/images/yousif.jpg'
import { getallcategories } from "@/Features/categories/server/categories.server";
import Link from "next/link";
import Header from "@/components/shared/header/Header";


export default async function Ourcategories() {
    const response=await getallcategories()
  return <>
  <section className="mt-10 bg-white p-20">
   <Header firsttitle="Shop By" secondtitle="Category"/>
  <section className="max-w-6xl mx-auto mt-10">
    <ul className="grid lg:grid-cols-6 grid-cols-2 md:grid-cols-4 gap-4">
       {response.data.map((item)=>{
        return  <li key={item._id} className="bg-white p-5 hover:shadow-xl shadow-lg cursor-pointer transition-all duration-200 rounded-lg ">
           <Link href={`/categories/${item._id}`} className="flex flex-col items-center gap-2">
            <div className="image relative size-20 rounded-full">
                <Image src={item.image} alt={item.name} fill className="w-full rounded-full"/>

            </div>
            <h2>{item.name}</h2>

           
           </Link>
        </li>
       })}
    </ul>
  </section>
  
  </section>
  
  
  </>
}
