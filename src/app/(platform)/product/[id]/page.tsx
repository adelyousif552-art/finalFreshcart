import Productdetailsscreen from "@/Features/Products/screens/productdetails.screen";

type productdetailsprops={
  params:Promise<{id:string}>
}
export default async function productdetails({params}:productdetailsprops) {
const {id}=await params
  return<>
  <Productdetailsscreen id={id}/>
  
  
  </>
}
