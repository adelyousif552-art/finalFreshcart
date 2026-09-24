
import Productinfo from "../components/productinfo";
import { getproduct } from "../server/getproducts.server";


export default async function Productdetailsscreen({id}:{id:string}) {
    const response=await getproduct(id)
    const {data}=response
  return <>
 
    <Productinfo data={data}/>
  

  </>
}
