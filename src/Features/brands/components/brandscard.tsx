import Image from "next/image";
import { Brand } from "../types/brands.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Brandscard({brand}:{brand:Brand}) {
  return <>
  <div className="bg-white border-2 group cursor-pointer mt-5 hover:border-green-500 rounded-2xl p-5 hover:scale-105 hover:shadow-xl transition-all duration-300 border-gray-500 shadow">
    <div className="image relative h-24 border-b border-gray-500/30">
        <Image src={brand.image} alt={brand.name} fill/>
    </div>
    <div className="content">
        <h1 className="font-bold">{brand.name}</h1>
        <button className="text-gray-500">View brand <FontAwesomeIcon className="group-hover:translate-x-2 transition-all duration-300" icon={faArrowRight}/></button>
    </div>

  </div>
  
  </>
}
