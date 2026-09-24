'use client'
import Image from "next/image";
import { Category } from "../types/categories.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {hover, motion} from 'motion/react'
import { init } from "next/dist/compiled/webpack/webpack";
import { useRouter } from "next/navigation";

export default function Categoriescard({category}:{category:Category}) {
    const route=useRouter()
  return <>
  <motion.div onClick={()=>{
    route.push(`/categories/${category._id}`)
  }}
  whileHover='hover'
  initial='initial'
  variants={{
    initial:{
        y:0
    },
    hover:{
        y:-10
    }
  }}
  transition={{
    duration:0.3
  }}
  
  className="bg-white cursor-pointer rounded-xl p-2 shadow border border-gray-500/10">
    <div className="image border border-gray-500/30 rounded-xl relative h-64">
        <Image className="rounded-xl" src={category.image} alt={category.name} fill/>
    </div>
    <h1 className="font-bold text-green-600 mt-2">{category.name}</h1>
    <motion.button
    variants={{
        initial:{
            opacity:0,
            x:-100
        },
        hover:{
            opacity:1,
            x:0
        },
        
    }}
    transition={{
        duration:0.3
    }}
     className="text-green-600 text-sm"><span>Shop Now</span> <FontAwesomeIcon icon={faArrowRight}/> </motion.button>
  </motion.div>
  
  </>
}
