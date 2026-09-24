
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getallcategories } from "../server/categories.server";
import Categoriescard from "../components/categoriescard";
import { faShoppingBag, faShoppingBasket, faShoppingCart } from "@fortawesome/free-solid-svg-icons";


export default async function Categoriesscreen() {
    const response=await getallcategories()
  return <>
  <section className="max-w-7xl w-full mx-auto ">
    <header className="space-y-4 bg-white p-5">
    <span className="text-gray-500 text-sm ">Home/Categories</span>
    <div className="bg-[#F2FBF6] mt-3 space-x-2  rounded-full w-fit py-1 px-3 ">
        <FontAwesomeIcon className="text-gray-500" icon={faShoppingCart}/>
        <span className="text-green-600">Shop by category</span>

    </div>
    <h1 className="text-4xl font-bold">All Categories</h1>
    <p className="text-gray-500 text-lg">Explore our full range of departments and find exactly what<br/> you're looking for.
</p>
  </header>
  <section className="grid mt-5 p-5 bg-white lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
{response.data.map((category)=>{
    return <Categoriescard key={category._id} category={category}/>
})}
  </section>

  
  </section>
  
  </>
}
