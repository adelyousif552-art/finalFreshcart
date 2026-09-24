'use client'
import React, { useState } from 'react'
import {FontAwesomeIcon} from'../../../../node_modules/@fortawesome/react-fontawesome'
import {faAddressCard, faArrowDown, faArrowRightFromBracket, faBabyCarriage, faBars, faBolt, faBurger, faEllipsis, faEnvelope, faHospital, faList, faPerson, faPersonDress, faPhone, faRightFromBracket, faRotate, faSearch, faShoppingBag, faShoppingCart, faUserPlus, faXmark} from'../../../../node_modules/@fortawesome/free-solid-svg-icons'
import {faHeart, faUser} from'../../../../node_modules/@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from "motion/react"
import { useSelector } from 'react-redux'
import { statestype, useAppSelector } from '@/store/store'
import useLogout from '@/Features/auth/hooks/uselogout'

export default function Navbar() {
  const {numOfCartItems}=useAppSelector((state)=>{
    return state.cart
  })
   const {numofitems}=useAppSelector((state)=>{
    return state.wishlist
  })
  const [menuisopen,setmenuisopen]=useState(false)
  const currentpath=usePathname()
  console.log(currentpath);
 const {isauthinticated}= useSelector((appstate:statestype)=>appstate.auth)
 const {logout}=useLogout()
 const router=useRouter()
  
  return <>
  <header className='bg-white'>
    <div className="container max-w-7xl  mx-auto">
        {/* top navbar */}
        <div className='lg:flex hidden bg-white text-xs shadow py-1 px-2 items-center justify-between'>
            <div className="leftside">
                <ul className='flex items-center gap-3'>
                    <li className='flex items-center gap-2'>
                      <FontAwesomeIcon className='size-3' icon={faPhone} />
                      <a href='tel:+1 (800) 123-4567'>+1 (800) 123-4567</a>
                    </li>
                    <li className='flex items-center gap-2'>
                      <FontAwesomeIcon className='size-3' icon={faEnvelope} />
                      <a className='' href='mailto:adelyousif552@gmail.com'>support@freshcart.com</a>
                    </li>
                </ul>

            </div>
            <div className="rightside">
              <ul className='flex items-center gap-3'>
                <li><Link href='/trackorder'>Track Order</Link></li>
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/contact'>Contact</Link></li>
                <li>
                  <select className='w-15' >
                    
                    <option >EGP</option>
                    <option >SAD</option>
                    <option >AED</option>
                    
                  </select>
                </li>
                <li>
                  <select>
                     <option value="English">ENG</option>
                     <option value="Arabic">AR</option>
                  </select>
                </li>
              </ul>
            </div>

        </div>
        {/* main navbar*/}
        <nav className='flex items-center justify-between   py-5 px-2'>
          <h1 onClick={()=>{
            router.push('/')

          }} className='font-bold cursor-pointer text-3xl'><span className='text-green-500'>Fresh</span>Cart</h1>
          <button onClick={()=>{
            setmenuisopen(!menuisopen)
          }} className="menubar cursor-pointer active:bg-green-500 hover:bg-green-500 transition-all duration-200 lg:hidden  bg-green-600 text-white size-8 flex items-center justify-center rounded-lg">
            <FontAwesomeIcon icon={faBars}/>
          </button>
          <div className="search hidden lg:block relative max-w-xl w-md   ">
            <input type="text" name="searchinput" id="searchid" className=' form-control py-1 px-5' placeholder='Search for products...' />
            <FontAwesomeIcon className='size-3 absolute top-1/2 right-3 -translate-y-1/2' icon={faSearch}/>
          </div>
          <ul className='lg:flex hidden items-center gap-10 *:hover:text-green-600 *:transition-all *:duration-200 *:cursor-pointer'>
            <li className=' w-fit '>
              <Link className={`${currentpath==='/wishlist'?'text-green-600':''} flex flex-col items-center`} href={'/wishlist'}>
              <div className='relative'>
                <FontAwesomeIcon className='size-5' icon={faHeart}/>
                <span className='size-5 absolute rounded-full bg-red-500 flex items-center justify-center -translate-y-1/2 text-white top-0 -right-3'>{numofitems}</span>
              </div>
              <span>Wishlist</span></Link>
            </li>
            
            <li className=' w-fit '>
              <Link className={`${currentpath==='/cart'?'text-green-600':''} flex flex-col items-center`} href={'/cart'}>
              <div className='relative '>
                <FontAwesomeIcon className='size-5' icon={faShoppingCart}/>
                <span className='absolute top-0 -right-3 text-white bg-green-600 rounded-full size-5 flex items-center justify-center -translate-y-1/2'>{numOfCartItems}</span>
              </div>
              <span>Cart</span>
              </Link>
            </li>
             <li className=' w-fit flex flex-col items-center'>
              <FontAwesomeIcon className='size-5' icon={faUser}/>
              <span>Account</span>
            </li>
            {isauthinticated?
            <li onClick={logout} className=' w-fit flex flex-col items-center '>
             
              <FontAwesomeIcon className='size-5' icon={faRightFromBracket}/>
              <span>Logout</span>
             
            </li>:
            <>
             <li className=' w-fit '>
             <Link className='flex flex-col items-center' href={'/signup'}>
              <FontAwesomeIcon className='size-5' icon={faUserPlus}/>
              <span>Signup</span>
             </Link>
            </li>
            <li className=' w-fit '>
             <Link className='flex flex-col items-center' href={'/login'}>
              <FontAwesomeIcon className='size-5' icon={faAddressCard}/>
              <span>Login</span>
             </Link>
            </li>
            </>
          }
             
           
          </ul>

        </nav>

    </div>
    {/* bottom nav */}
   <div className='bg-gray-100 py-4 px-3 hidden lg:block'>
     <nav className=' max-w-7xl mx-auto flex items-center gap-2'>
      <div className='relative group '>
        <button className='text-white flex items-center gap-3   btn'>
        <FontAwesomeIcon className='size-3' icon={faList} />
        
        <span>All Categories</span>
        <FontAwesomeIcon className='size-3 ' icon={faArrowDown}/>

      </button>
      <menu className=' hidden bg-white shadow-xl  group-hover:block absolute top-10 z-50 left-2 min-w-52   divide-y-2 divide-gray-300/30 *:hover:bg-gray-300/40 *:transition-all *:duration-200 *:cursor-pointer '>
        <li>
          <Link  className='space-x-2 w-full p-2 block h-full ' href={'/categories/6439d5b90049ad0b52b90048'}>
          <FontAwesomeIcon icon={faPerson} />
          <span>Men's Fashion</span>
          </Link>
        </li>
        <li>
          <Link className='space-x-2 block  h-full p-2 w-full' href={'/categories/6439d58a0049ad0b52b9003f'}>
          <FontAwesomeIcon  icon={faPersonDress} />
          <span>women's Fashion</span>
          </Link>
        </li>
        <li>
          <Link className='space-x-2 block  h-full p-2 w-full' href={'/categories/6439d40367d9aa4ca97064cc'}>
          <FontAwesomeIcon  icon={faBabyCarriage} />
          <span>Baby & Toys</span>
          </Link>
        </li>
        <li>
          <Link className='space-x-2 block  h-full p-2 w-full' href={'/categories/6439d40367d9aa4ca97064cc'}>
          <FontAwesomeIcon  icon={faHospital} />
          <span>Beauty & Health</span>
          </Link>
        </li>
        <li>
          <Link className='space-x-2 p-2 block  h-full w-full' href={'/categories/6439d2d167d9aa4ca970649f'}>
          <FontAwesomeIcon  icon={faBolt} />
          <span>Electronics</span>
          </Link>
        </li>
        <li>
          <Link className='space-x-2 w-full p-2 block  h-full' href={'/categories'}>
          <FontAwesomeIcon  icon={faEllipsis} />
          <span>View All Categories</span>
          </Link>
        </li>
      </menu>
      </div>
      <ul className='flex items-center gap-5 *:hover:text-green-600 *:transition-all *:duration-200 *:cursor-pointer '>
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/shop'}>Shop</Link></li>
        <li><Link href={''}>Deals</Link></li>
        
        <li><Link href={'/brands'}>Brands</Link></li>
        
      </ul>

    </nav>
   </div>
   <AnimatePresence>
    {menuisopen?<motion.div
   initial={{opacity:0}}
   animate={{opacity:1}}
   transition={{duration:1}}
   exit={{opacity:0}}

   onClick={()=>{
    setmenuisopen(false)
   }} className="sidelayer cursor-pointer fixed inset-0 bg-black/10 ">
    <motion.aside 
    initial={{x:-300}}
   animate={{x:0}}
   transition={{duration:0.4,
    type:'tween',
   
   }}
   exit={{x:-300}}
    onClick={(e)=>{
      e.stopPropagation()

    }} className='bg-white min-h-screen space-y-5 w-72 max-w-full  p-5 shadow-lg '>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold cursor-pointer text-2xl'>FreshCart</h1>
        <button onClick={()=>{
          setmenuisopen(false)
        }} className='size-8 rounded-full cursor-pointer hover:bg-gray-200 active:bg-gray-200 bg-gray-100 flex items-center justify-center '>
          <FontAwesomeIcon icon={faXmark}/>
        </button>
      </div>
      <div className="search relative      ">
            <input type="text" name="searchinput" id="searchid" className=' form-control placeholder:text-gray-300 border border-gray-500  py-1 px-5' placeholder='Search for products...' />
            <FontAwesomeIcon className='size-3 absolute top-1/2 right-3 -translate-y-1/2' icon={faSearch}/>
          </div>

          <div className="mainmenu">
            <h2 className='font-bold'>Main Menu</h2>
            <ul className='p-2 *:hover:bg-green-300/30 *:py-1 *:px-3  *:space-x-2 space-y-4'>
              <li className={`${currentpath==='/wishlist'?'bg-green-300/30':''}`}>
                <Link  className='space-x-2' href={'/wishlist'}>
                <FontAwesomeIcon icon={faHeart}/>
                <span>Wishlist</span></Link>
              </li>
              <li className={`${currentpath==='/cart'?'bg-green-300/30':''}`}>
                <Link  className='space-x-2' href={'/cart'}>
                <FontAwesomeIcon icon={faShoppingCart}/>
                <span>Cart</span>
                </Link>
              </li>
              <li >
                <Link  className='space-x-2' href={'/'}>
                <FontAwesomeIcon icon={faUser}/>
                <span>user</span></Link>
              </li>
            </ul>
          </div>
          <div className="Accountmenu">
            <h2 className='font-bold'>Account</h2>
            <ul className='p-2 *:py-1 *:px-3 *:hover:bg-green-300/30 *:transition-all *:duration-200  space-y-4'>
             
             {isauthinticated? <li onClick={logout}  className='space-x-2'>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span>Logout</span>
              </li>:<>
              
               <li className={`${currentpath==='/signup'?'bg-green-300/30':''}`}>
                <Link className='space-x-2' href={'/signup'}>
                <FontAwesomeIcon icon={faUserPlus}/>
                <span>Signup</span>
                </Link>
              </li>
              <li className={`${currentpath==='/login'?'bg-green-300/30':''}`}>
                <Link  className='space-x-2' href={'/login'}>
                <FontAwesomeIcon icon={faAddressCard} />
                <span>Login</span>
                </Link>
              </li>
              </>}
            </ul>
          </div>




    </motion.aside>

   </motion.div>:''}
   </AnimatePresence>


  </header>
  
  
  </>
}
