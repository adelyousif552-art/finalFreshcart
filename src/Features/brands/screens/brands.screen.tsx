
import Brandscard from "../components/brandscard"
import { getallbrands } from "../server/brands.server"


export default async function Brandsscreen() {

    const response=await getallbrands()
    console.log(response);
    
    

   
  return <>
  <section className="max-w-7xl w-full p-5 mx-auto bg-white">
    <header className="space-y-2">
        <p className="font-bold"><span className="text-gray-500 font-normal">Home</span> / Brands </p>
        <h1 className="text-2xl font-bold">Explore our brands</h1>
        <p className="text-gray-500">Every brand here is stocked and checked by our team. Pick one to see what we <br/> currently have on the shelf and what it costs.</p>
        <div className="w-fit px-3 border border-green-600 py-1 bg-green-100/50 rounded-full">
            <span className="text-green-600">{response.data.length} brands available</span>

        </div>
    </header>

    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
    {response.data.map((brand)=>{
        return <Brandscard key={brand._id} brand={brand}/>
    })}
  </div>
  </section>
  
  </>
}
