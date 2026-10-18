'use server'
import Productcard from "@/Features/Products/components/productcard"
import { getallproducts } from "@/Features/Products/server/getproducts.server"


export default async function page({params}:{params:Promise<{q:string}>}) {
    const {q}=await params
    const response=await getallproducts()
    const matchedproducts=response.data.filter((product)=>product.title.toLowerCase().includes(decodeURIComponent(q).toLowerCase()))
console.log('matched',matchedproducts);

  return <>
 <div className="max-w-6xl mx-auto w-full bg-white p-5">
     <header >
    <h1 className="font-bold text-4xl">Results for <span className="text-green-600">"{decodeURIComponent(q)}"</span></h1>
    <p className="text-gray-400"><span className="font-bold text-black">{matchedproducts.length}</span> {matchedproducts.length>1?'Products':'product'} Found</p>
  </header>
 
    
    {matchedproducts.length>0?<div className="  mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 ">{matchedproducts.map((product)=> <Productcard product={product} key={product._id}/>)}</div>:<p className="text-bold text-center text-4xl">No Products Found</p>}
  
  
 </div>
  
  </>
}
