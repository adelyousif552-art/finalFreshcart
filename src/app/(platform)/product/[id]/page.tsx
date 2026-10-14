import Productdetailsscreen from "@/Features/Products/screens/productdetails.screen";
import { getproduct } from "@/Features/Products/server/getproducts.server";
import { Metadata } from "next";

type productdetailsprops={
  params:Promise<{id:string}>
}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){
  const {id}=await params
  const product=await getproduct(id)
  return {title:`products/${product.data.title}`}

}
export default async function productdetails({params}:productdetailsprops) {
const {id}=await params
  return<>
  <Productdetailsscreen id={id}/>
  
  
  </>
}
