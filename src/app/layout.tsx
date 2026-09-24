import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../styles/globals.css'
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import '@fortawesome/fontawesome-svg-core/styles'
import { config } from "@fortawesome/fontawesome-svg-core";
import {Exo} from 'next/font/google'
import {ToastContainer,Bounce}from 'react-toastify'
import Providers from "@/components/Providers/providers";
import { verifytoken } from "@/Features/auth/server/auth.server";
import { getusercart } from "@/Features/cart/server/cart.server";
import { cartstate } from "@/Features/cart/store/cart.slice";
import { getuserwishlist } from "@/Features/wishlist/server/wishlist.server";
import { wishliststate } from "@/Features/wishlist/store/wishlist.slice";
config.autoAddCss=false         
const exo=Exo({
  subsets:['latin'],
  weight:['400','500','600','700','800','900'],
  variable:'--font-exo'
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce",
  description: "Your one-stop destination for groceries, fashion, electronics and more.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  let cartitems:cartstate={
    cartId:null,
    numOfCartItems:0,
    totalcartprice:0,
    products:[],
    isloading:false,
    error:null

  }
  let wishlistitems:wishliststate={
    numofitems:0,
    products:null
  }
  const authvalues=await verifytoken()
  if(authvalues.isauthinticated){
   try {
     const response=await getusercart()
     if(response.status==='success'){
      cartitems={
        cartId:response.cartId,
        numOfCartItems:response.numOfCartItems,
        totalcartprice:response.data.totalCartPrice,
        products:response.data.products,
        isloading:false,
        error:null
      }
     }
   } catch (error) {
    throw error
   }
    
  }
   if(authvalues.isauthinticated){
   try {
     const response=await getuserwishlist()
     if(response.status==='success'){
      wishlistitems={
        numofitems:response.count,
        products:response.data
      }
     }
   } catch (error) {
    throw error
   }
    
  }
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={` ${exo.className} min-h-full bg-gray-100 flex flex-col`}>
       <Providers preloadedstate={{auth:authvalues,cart:cartitems,wishlist:wishlistitems}}>
         <Navbar/>
        {children}
        <Footer/>
        <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
        
       </Providers>
        </body>
    </html>
  );
}
