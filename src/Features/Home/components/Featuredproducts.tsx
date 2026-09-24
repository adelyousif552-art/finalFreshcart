import Header from "@/components/shared/header/Header";
import Productcard from "@/Features/Products/components/productcard";
import { getallproducts } from "@/Features/Products/server/getproducts.server";


export default async function Featuredproducts() {
    const response=await getallproducts()
  return<>
  <section className="mt-10 bg-white p-20">
    <Header firsttitle={'Featured'} secondtitle="Products"/>
    <section className="max-w-6xl grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4 mx-auto mt-10">
      {response.data.map((product)=>{
        return <Productcard key={product._id} product={product}/>
      })}


    </section>



  </section>
  
  </>
}
