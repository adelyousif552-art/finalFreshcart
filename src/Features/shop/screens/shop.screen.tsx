'use client'
import { getallproducts } from "@/Features/Products/server/getproducts.server";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Product, ProductsResponse } from "@/Features/Products/types/product.type";
import Productcard from "@/Features/Products/components/productcard";
import { ProductCardSkeleton } from "@/components/Ui/Productskeleton";

 export interface filtertype{
    categories:string[],
    brands:string[],
    subcategories:string[],
    minprice:number,
    maxprice:number


}
export default function Shopscreen() {
  const [products,setproducts]=useState<null|Product[]>(null)
 
 const [flitercheck,setfiltercheck]=useState<filtertype>({
        categories:[],
        brands:[],
        subcategories:[],
        minprice:100,
        maxprice:8000
    })
  const getproducts=async()=>{
    const response=await getallproducts()
    
    setproducts(response.data)
  }
 useEffect(()=>{
   getproducts()
 },[])
 console.log(products);
 
//  const filterbycategory=products?.filter((product)=>flitercheck.categories.includes(product.category.name))
//  const filterbybrand=products?.filter((product)=>flitercheck.brands.includes(product.brand.name))
//  const filterbycategoryandbrand=products?.filter((product)=>flitercheck.brands.includes(product.brand.name)&&flitercheck.categories.includes(product.category.name))
 const filterproducts=products?.filter((product)=>{
  const categorymatch=flitercheck.categories.length===0||flitercheck.categories.includes(product.category.name)
  const brandmatch=flitercheck.brands.length===0||flitercheck.brands.includes(product.brand.name)
  const subcategorymatch=flitercheck.subcategories.length===0||flitercheck.subcategories.includes(product.subcategory[0].name)
  const productprice=product.priceAfterDiscount?product.priceAfterDiscount:product.price
  const pricematch=flitercheck.minprice<=productprice&&flitercheck.maxprice>=productprice
  return categorymatch&&brandmatch&&pricematch&&subcategorymatch
 })
  return <>
  
  <header className="max-w-7xl mx-auto w-full my-5 bg-white p-5 rounded-lg">
    <span className="text-gray-500">Home / Shop</span>
    <h1 className="text-4xl font-bold">Shop All Products</h1>
    <p className="text-gray-500">Browse our full collection and filter to find exactly what you need.</p>

  </header>
  <section className="grid gap-3 bg-white p-5 grid-cols-12 max-w-7xl w-full mx-auto">
    <aside className="xl:col-span-3 col-span-12">
        <Sidebar numofproducts={filterproducts?.length} flitercheck={flitercheck} setfiltercheck={setfiltercheck}/>


    </aside>
   <div className="xl:col-span-9 col-span-12">
    <h2 className="text-gray-500 mb-5"><span className="text-black font-bold">{filterproducts?.length}</span> Products Found</h2>
    {filterproducts?filterproducts.length>0? <div className=" gap-3   grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      
      {filterproducts.map((product)=><Productcard key={product._id} product={product}/>)}

    </div>:<div className="text-center ">
<h1 className="text-4xl font-bold text-green-600">No Results Found</h1>

      </div>:<div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">{[...Array(10)].map((elm,index)=><ProductCardSkeleton key={index}/>)}</div>}
   </div>

  </section>
  </>
}
