import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Dealsbanner() {
  return <>
  <section className="mt-10 grid md:grid-cols-2 gap-3 max-w-7xl w-full mx-auto">
    <div className="bg-linear-to-br space-y-5  from-emerald-500 to-emerald-700 p-5 rounded-lg ">
        <div className="bg-emerald-400/40 relative py-1 px-7 rounded-full w-fit">
            <p className="text-white"><span className="size-3 left-2 top-1/2 -translate-y-1/2 absolute  bg-white rounded-full "></span> Deal of the Day</p>
            
        </div>
       <div>
         <h1 className="text-2xl text-white font-bold">Fresh Organic Fruits</h1>
            <p className="text-white/70">Get up to 40% off on selected organic fruits</p>
       </div>
            <div className="grid grid-cols-3 max-w-96 gap-3">
                <div className="bg-emerald-400/40  text-white p-3 flex flex-col items-center justify-center gap-1 rounded-lg">
                <p className="font-bold">12</p>
                <p>Hours</p>

                </div>
                 <div className="bg-emerald-400/40  text-white p-3 flex flex-col items-center justify-center gap-1 rounded-lg">
                <p className="font-bold">45</p>
                <p>Min</p>

                </div>
                 <div className="bg-emerald-400/40  text-white p-3 flex flex-col items-center justify-center gap-1 rounded-lg">
                <p className="font-bold">30</p>
                <p>Sec</p>

                </div>
            </div>
            <button className="text-green-600 font-semibold bg-white btn rounded-full"><span>Shop Now</span> <FontAwesomeIcon icon={faArrowRight}/></button>

    </div>
    <div className="bg-linear-to-br space-y-5  from-orange-400 to-rose-500 p-5 rounded-lg ">
        <div className="bg-orange-200/20 relative py-1 px-7 rounded-full w-fit">
            <p className="text-white"><span className="size-3 left-2 top-1/2 -translate-y-1/2 absolute  bg-white rounded-full "></span> New Arrivals</p>
            
        </div>
       <div>
         <h1 className="text-2xl text-white font-bold">Exotic Vegetables</h1>
            <p className="text-white/70">Discover our latest collection of premium vegetables</p>
            <p className="text-white/50"><span className="text-2xl text-white font-bold">25% OFF</span> our code <span className="font-bold text-white sont-bold ">Freshz</span></p>
       </div>
           
            <button className="text-orange-600 font-semibold bg-white btn rounded-full"><span>Explore Now</span> <FontAwesomeIcon icon={faArrowRight}/></button>

    </div>

  </section>
  
  
  </>
}
