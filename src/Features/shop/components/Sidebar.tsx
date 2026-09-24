'use client'
import { faArrowDown, faArrowUp, faCheck, faClose, faFilter } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { filtertype } from "../screens/shop.screen"
import { Category } from "@/Features/categories/types/categories.types"
import { getallcategories, getallsubcategories } from "@/Features/categories/server/categories.server"
import { effect } from "zod/v3"
import { Brand } from "@/Features/brands/types/brands.types"
import { getallbrands } from "@/Features/brands/server/brands.server"
import { subCategory } from "@/Features/categories/types/subcategories.types"
import {AnimatePresence, motion} from 'motion/react'
import { Span } from "next/dist/trace"
 interface menutype{
    category:Boolean,
    brands:Boolean,
    subcategory:Boolean
 }
export default function Sidebar({flitercheck,setfiltercheck,numofproducts}:{numofproducts?:number,flitercheck:filtertype,setfiltercheck:Dispatch<SetStateAction<filtertype>>}) {
    const [menues,setmenues]=useState<menutype>({
        category:false,
        brands:false,
        subcategory:false
    })
    const choosenfilters=[...flitercheck.categories,...flitercheck.brands,...flitercheck.subcategories]
    const [offcanvas,setoffcanvas]=useState<boolean>(false)
   const [categories,setcategories]=useState<null|Category[]>(null)
   const [brands,setbrands]=useState<null|Brand[]>(null)
   const [subcategories,setsubcategories]=useState<null|subCategory[]>(null)

    const handlecategory=(category:string)=>{
        setfiltercheck(prev=>({
            ...prev,
            categories:prev.categories.includes(category)?prev.categories.filter((elm)=>elm!==category):[...prev.categories,category]
        }))

    }
    const handlebrand=(brand:string)=>{
        setfiltercheck((prev)=>{
            return {
                ...prev,
                
                brands:prev.brands.includes(brand)?prev.brands.filter((item)=>item!==brand):[...prev.brands,brand]
            }
        })

    }
     const handlesubcategory=(subcategory:string)=>{
        setfiltercheck((prev)=>{
            return {
                ...prev,
                
                subcategories:prev.subcategories.includes(subcategory)?prev.subcategories.filter((item)=>item!==subcategory):[...prev.subcategories,subcategory]
            }
        })

    }
    const getcateory=async()=>{
const response=await getallcategories()
setcategories(response.data)
    }
    const getbrands=async()=>{
        const response=await getallbrands()
        setbrands(response.data)
    }
    const getsubcategory=async()=>{
        const response=await getallsubcategories()
        setsubcategories(response.data)

    }
    useEffect(()=>{
        getcateory()
        getbrands()
        getsubcategory()
    },[])
  return <>
  <div className="border  border-gray-500/20 shadow rounded-xl p-5">
  <div>
  
    <div className="flex items-center justify-between">
         <button onClick={()=>{
    setoffcanvas(true)
  }} className="xl:hidden border border-gray-400/70 hover:bg-gray-100 transition-all duration-200 cursor-pointer p-2 rounded-lg"><FontAwesomeIcon icon={faFilter}/> <span>Filter</span></button>
    <span className="xl:hidden text-black font-bold">{numofproducts} <span className="text-gray-500">Products Found</span></span>
    </div>
   
   

 <div className="grid  lg:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-3 mt-2 xl:hidden">
     {choosenfilters.length>0?choosenfilters.map((filter,index)=>{
    return <span className="bg-green-100 flex items-center justify-center mx-3 py-1 px-3 rounded-full" key={index}>
{filter}
    </span>
  }):''}
 </div>
  </div>
    <div className="hidden xl:block">
        <h1 className="font-bold">Filters</h1>
        
    </div>
    <div className="category hidden xl:block">
        <div className="flex items-center justify-between  ">
            <h2 className="font-bold  ">Category </h2>
            <button onClick={()=>{
                setmenues((prev)=>{
                    return {
                        ...prev,
                        category:!menues.category
                    }
                })
            }} className=" text-sm "><FontAwesomeIcon icon={menues.category?faArrowUp:faArrowDown}/></button>
        </div>
      <AnimatePresence>
         {menues.category? <motion.ul
       initial={{
        height:0,
        opacity:0
       }}
       animate={{
        height:'auto',
        opacity:1
       }}
       transition={{
        duration:0.5
       }}
       exit={{
        height:0,
        opacity:0,
        transition:{
            duration:0.5
        }
    }
       }

       className="space-y-3 mt-5">
           {categories?.map((category)=>{
            return  <li key={category._id} className="">
                
                
                <label 
                 htmlFor={category.name} className="flex items-center gap-3" >
                    <input checked={flitercheck.categories.includes(category.name)} onChange={()=>{
                        handlecategory(category.name)
                    }} name="filterbycategory" className="sr-only peer" id={category.name} type="checkbox" />
                    <span  className="size-5 flex  rounded-sm border-2 items-center justify-center text-white   border-gray-600/30 peer-checked:bg-green-500">{flitercheck.categories.includes(category.name)?<FontAwesomeIcon className="text-sm" icon={faCheck}/>:''}</span>
                    <span>{category.name}</span>
                </label>
            </li>
           })}
            
            
            
        </motion.ul>:''}
      </AnimatePresence>

    </div>
     <div className="subcategories my-5 hidden xl:block">
        <div className="flex items-center justify-between  ">
            <h2 className="font-bold  ">SubCategories </h2>
            <button onClick={()=>{
                setmenues((prev)=>{
                    return {
                        ...prev,
                        subcategory:!menues.subcategory
                    }
                })
            }} className=" text-sm "><FontAwesomeIcon icon={menues.subcategory?faArrowUp:faArrowDown}/></button>
        </div>
       <AnimatePresence>
        {menues.subcategory? <motion.ul
       initial={{
        height:0,
        opacity:0
       }}
       animate={{
        height:'auto',
        opacity:1
       }}
       transition={{
        duration:0.5
       }}
       exit={{
        height:0,
        opacity:0,
        transition:{
            duration:0.5
        }
    }
       }
       
       className="space-y-3 mt-5">
           {subcategories?.map((subcategory)=>{
            return  <li key={subcategory._id} className="">
                
                
                <label 
                 htmlFor={subcategory.name} className="flex items-center gap-3" >
                    <input checked={flitercheck.subcategories.includes(subcategory.name)} onChange={()=>{
                        handlesubcategory(subcategory.name)
                    }} name="filterbycategory" className="sr-only peer" id={subcategory.name} type="checkbox" />
                    <span  className="size-5 flex  rounded-sm border-2 items-center justify-center text-white   border-gray-600/30 peer-checked:bg-green-500">{flitercheck.subcategories.includes(subcategory.name)?<FontAwesomeIcon className="text-sm" icon={faCheck}/>:''}</span>
                    <span>{subcategory.name}</span>
                </label>
            </li>
           })}
            
            
            
        </motion.ul>:''}
       </AnimatePresence>

    </div>
    <div className="brand my-5 hidden xl:block">
        <div className="flex items-center justify-between  ">
            <h2 className="font-bold  ">Brand </h2>
            <button onClick={()=>{
                setmenues((prev)=>{
                    return {
                        ...prev,
                        brands:!menues.brands
                    }
                })
            }} className=" text-sm "><FontAwesomeIcon icon={menues.brands?faArrowUp:faArrowDown}/></button>
        </div>
      <AnimatePresence>
        {menues.brands?  <motion.ul
        initial={{
        height:0,
        opacity:0
       }}
       animate={{
        height:'auto',
        opacity:1
       }}
       transition={{
        duration:0.5
       }}
       exit={{
        height:0,
        opacity:0,
        transition:{
            duration:0.5
        }
    }
       }
      
      className="space-y-3 mt-5">
           {brands?.map((brand)=>{
            return  <li key={brand._id} className="">
                
                
                <label 
                 htmlFor={brand.name} className="flex items-center gap-3" >
                    <input checked={flitercheck.brands.includes(brand.name)} onChange={()=>{
                        handlebrand(brand.name)
                    }} name="filterbycategory" className="sr-only peer" id={brand.name} type="checkbox" />
                    <span  className="size-5 flex  rounded-sm border-2 items-center justify-center text-white   border-gray-600/30 peer-checked:bg-green-500">{flitercheck.brands.includes(brand.name)?<FontAwesomeIcon className="text-sm" icon={faCheck}/>:''}</span>
                    <span>{brand.name}</span>
                </label>
            </li>
           })}
            
            
            
        </motion.ul>:''}
      </AnimatePresence>

    </div>
    <div className="price mt-5 hidden xl:block">
        <h2 className="font-bold">Price Range</h2>
        <input type="range" className="accent-green-600" min={0} max={500} value={flitercheck.minprice} onChange={(e)=>{
            setfiltercheck((prev)=>{
                return {
                    ...prev,
                    minprice:+e.target.value
                }
            })
        }} />
         <input type="range" className="accent-green-600" min={500} max={10000} value={flitercheck.maxprice} onChange={(e)=>{
            setfiltercheck((prev)=>{
                return {
                    ...prev,
                    maxprice:+e.target.value
                }
            })
        }} />
        <div className="space-x-3 mt-3">
            <span className="text-gray-500 border border-gray-400/40 rounded-lg p-2">{flitercheck.minprice} EGP</span>
            <span className="text-gray-500">To</span>
            <span className="text-gray-500 border border-gray-400/40 rounded-lg p-2">{flitercheck.maxprice} EGP</span>
        </div>

    </div>

  </div>
<AnimatePresence>
     {offcanvas?<motion.div
     
     initial={{opacity:0}}
     animate={{opacity:1}}
     transition={{duration:0.5}}
     exit={{opacity:0}}
     onClick={()=>{
    setoffcanvas(false)
 }} className="overlay bg-gray-700/20 z-50 absolute inset-0 ">
     <motion.div
     initial={{
        x:-120,
        opacity:0
    
     }}
     animate={{
        x:0,
        opacity:1
     }}
     transition={{
        duration:0.5
     }}
     exit={{
        x:-120,
        opacity:0
     }}
     
     onClick={(e)=>{
        e.stopPropagation()
     }} className="offcanvas bg-white absolute top-0 bottom-0 py-1 px-5 w-80 shadow">
        <div className="flex items-center justify-between my-4">
            <h1 className="text-gray-800">Filter</h1>
            <button onClick={()=>{
                setoffcanvas(false)
            }} className="cursor-pointer"><FontAwesomeIcon icon={faClose}/></button>
        </div>
         <div className="category ">
        <div className="flex items-center justify-between  ">
            <h2 className="font-bold  ">Category </h2>
            <button onClick={()=>{
                setmenues((prev)=>{
                    return {
                        ...prev,
                        category:!menues.category
                    }
                })
            }} className=" text-sm "><FontAwesomeIcon icon={menues.category?faArrowUp:faArrowDown}/></button>
        </div>
      <AnimatePresence>
         {menues.category? <motion.ul
       initial={{
        height:0,
        opacity:0
       }}
       animate={{
        height:'auto',
        opacity:1
       }}
       transition={{
        duration:0.5
       }}
       exit={{
        height:0,
        opacity:0,
        transition:{
            duration:0.5
        }
    }
       }

       className="space-y-3 mt-5">
           {categories?.map((category)=>{
            return  <li key={category._id} className="">
                
                
                <label 
                 htmlFor={category.name} className="flex items-center gap-3" >
                    <input checked={flitercheck.categories.includes(category.name)} onChange={()=>{
                        handlecategory(category.name)
                    }} name="filterbycategory" className="sr-only peer" id={category.name} type="checkbox" />
                    <span  className="size-5 flex  rounded-sm border-2 items-center justify-center text-white   border-gray-600/30 peer-checked:bg-green-500">{flitercheck.categories.includes(category.name)?<FontAwesomeIcon className="text-sm" icon={faCheck}/>:''}</span>
                    <span>{category.name}</span>
                </label>
            </li>
           })}
            
            
            
        </motion.ul>:''}
      </AnimatePresence>

    </div>
     <div className="subcategories my-5 ">
        <div className="flex items-center justify-between  ">
            <h2 className="font-bold  ">SubCategories </h2>
            <button onClick={()=>{
                setmenues((prev)=>{
                    return {
                        ...prev,
                        subcategory:!menues.subcategory
                    }
                })
            }} className=" text-sm "><FontAwesomeIcon icon={menues.subcategory?faArrowUp:faArrowDown}/></button>
        </div>
       <AnimatePresence>
        {menues.subcategory? <motion.ul
       initial={{
        height:0,
        opacity:0
       }}
       animate={{
        height:'auto',
        opacity:1
       }}
       transition={{
        duration:0.5
       }}
       exit={{
        height:0,
        opacity:0,
        transition:{
            duration:0.5
        }
    }
       }
       
       className="space-y-3 mt-5">
           {subcategories?.map((subcategory)=>{
            return  <li key={subcategory._id} className="">
                
                
                <label 
                 htmlFor={subcategory.name} className="flex items-center gap-3" >
                    <input checked={flitercheck.subcategories.includes(subcategory.name)} onChange={()=>{
                        handlesubcategory(subcategory.name)
                    }} name="filterbycategory" className="sr-only peer" id={subcategory.name} type="checkbox" />
                    <span  className="size-5 flex  rounded-sm border-2 items-center justify-center text-white   border-gray-600/30 peer-checked:bg-green-500">{flitercheck.subcategories.includes(subcategory.name)?<FontAwesomeIcon className="text-sm" icon={faCheck}/>:''}</span>
                    <span>{subcategory.name}</span>
                </label>
            </li>
           })}
            
            
            
        </motion.ul>:''}
       </AnimatePresence>

    </div>
    <div className="brand my-5 ">
        <div className="flex items-center justify-between  ">
            <h2 className="font-bold  ">Brand </h2>
            <button onClick={()=>{
                setmenues((prev)=>{
                    return {
                        ...prev,
                        brands:!menues.brands
                    }
                })
            }} className=" text-sm "><FontAwesomeIcon icon={menues.brands?faArrowUp:faArrowDown}/></button>
        </div>
      <AnimatePresence>
        {menues.brands?  <motion.ul
        initial={{
        height:0,
        opacity:0
       }}
       animate={{
        height:'auto',
        opacity:1
       }}
       transition={{
        duration:0.5
       }}
       exit={{
        height:0,
        opacity:0,
        transition:{
            duration:0.5
        }
    }
       }
      
      className="space-y-3 mt-5">
           {brands?.map((brand)=>{
            return  <li key={brand._id} className="">
                
                
                <label 
                 htmlFor={brand.name} className="flex items-center gap-3" >
                    <input checked={flitercheck.brands.includes(brand.name)} onChange={()=>{
                        handlebrand(brand.name)
                    }} name="filterbycategory" className="sr-only peer" id={brand.name} type="checkbox" />
                    <span  className="size-5 flex  rounded-sm border-2 items-center justify-center text-white   border-gray-600/30 peer-checked:bg-green-500">{flitercheck.brands.includes(brand.name)?<FontAwesomeIcon className="text-sm" icon={faCheck}/>:''}</span>
                    <span>{brand.name}</span>
                </label>
            </li>
           })}
            
            
            
        </motion.ul>:''}
      </AnimatePresence>

    </div>
    <div className="price mt-5 ">
        <h2 className="font-bold">Price Range</h2>
        <input type="range" className="accent-green-600" min={0} max={500} value={flitercheck.minprice} onChange={(e)=>{
            setfiltercheck((prev)=>{
                return {
                    ...prev,
                    minprice:+e.target.value
                }
            })
        }} />
         <input type="range" className="accent-green-600" min={500} max={10000} value={flitercheck.maxprice} onChange={(e)=>{
            setfiltercheck((prev)=>{
                return {
                    ...prev,
                    maxprice:+e.target.value
                }
            })
        }} />
        <div className="space-x-3 mt-3">
            <span className="text-gray-500 border border-gray-400/40 rounded-lg p-2">{flitercheck.minprice} EGP</span>
            <span className="text-gray-500">To</span>
            <span className="text-gray-500 border border-gray-400/40 rounded-lg p-2">{flitercheck.maxprice} EGP</span>
        </div>

    </div>

  </motion.div>
 </motion.div>:''}
</AnimatePresence>
  
  </>
}
