import Productdetailsscreen from "@/Features/Products/screens/productdetails.screen";
import { getproduct } from "@/Features/Products/server/getproducts.server";


type productdetailsprops={
  params:Promise<{id:string}>
}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){
  const {id}=await params
  try {
    const product=await getproduct(id)
     return {title:`${product.data.title.slice(0,60)}`}
  } catch (error) {
     return {title:`products`}
  }
 

}
export default async function productdetails({params}:productdetailsprops) {
const {id}=await params
  return<>
  <Productdetailsscreen id={id}/>
  
  
  </>
}
