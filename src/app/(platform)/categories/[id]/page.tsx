import { getspecificcategory } from "@/Features/categories/server/categories.server";
import Productcard from "@/Features/Products/components/productcard";
import { getallproducts } from "@/Features/Products/server/getproducts.server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";


export default async function page({params}:{
    params:Promise<{id:string}>
}) {
    const {id}=await params
    console.log(id);
    const response=await getspecificcategory(id)
    console.log(response);
    const productsresponse=await getallproducts()
    const filteredproducts=productsresponse.data.filter((product)=>product.category._id==id)
    

  return <>
 <section className="max-w-7xl w-full mx-auto ">
    <div className="bg-linear-to-br flex items-center  justify-between rounded-2xl from-[#1F4B3D] before:z-10 to-[#123024] p-10 my-10 before:size-64 before:rounded-full before:bg-[#39534895] before:-right-20 before:-top-10 before:bottom-0 overflow-hidden after:bg-[#395348] after:size-52 after:rounded-full after:absolute after:top-25 after:right-30   before:absolute  relative">
       <div className="relative z-20">
         <span className="text-gray-400 text-sm">Home/Categories/{response.data.name}</span>
        <h1 className="text-white mt-5  font-bold text-4xl">{response.data.name}</h1>
       </div>
       <div className="w-14 h-14 relative z-20 bg-[#395348] rounded-xl flex items-center justify-center">
        <Image src={response.data.image} alt={response.data.name} width={24} height={64}/>

       </div>

    </div>
   {filteredproducts.length>0? <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
     {filteredproducts.map((product)=>{
    return <Productcard key={product._id} product={product}/>
  })}
 </div>:<div>
  <h1 className="text-center font-bold text-4xl "> No products Found</h1>
  </div>}
 </section>
  
  </>
}
