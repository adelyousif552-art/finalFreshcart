import { faArrowLeft, faArrowRight, faEnvelope, faLock, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import resetimage from '../../../assets/images/resetcode.png'
import Link from "next/link"
import Divider from "@/components/Ui/divider/Divider"
import { Dispatch, SetStateAction, useRef, useState } from "react"
import { verifyresetcode } from "../server/auth.server"
import { toast } from "react-toastify"


export default function Resetcode({setreset,email2,setresetpasspopup}:{setreset:Dispatch<SetStateAction<boolean>>,email2:string,setresetpasspopup:Dispatch<SetStateAction<boolean>>}) {
    const regex = /^\d?$/;
    const [code,setcode]=useState(['','','','','',''])
    const inputref=useRef<(HTMLInputElement|null)[]>([])
    const handlecange=(index:number,value:string)=>{
        if(!regex.test(value)){
            return;
        }
        const newcode=[...code]
        newcode[index]=value
        setcode(newcode)
        if(value&&index<5){
            inputref.current[index+1]?.focus()
        }
        if(!value&&index>0){
            
        }

    }
    const verifycode=async(value:{resetCode:string})=>{
        try {
            const response=await verifyresetcode(value)
            console.log(response);
            
                toast.success('success')
                setresetpasspopup(true)
                setreset(false)
            
            
        } catch (error) {
           toast.error('something went wrong')
            
        }
    }
  return <>
  <div className='overlay bg-gray-400/30 fixed inset-0 flex items-center justify-center'>
  <form className='bg-white shadow-lg max-w-xl mx-auto w-full p-10'>
    <div className="flex items-center justify-between">
        <h1 className="text-green-600 font-bold text-2xl"><FontAwesomeIcon icon={faShoppingCart}/> Fresh <span className="text-black">Cart</span></h1>
        <Link onClick={()=>{
            setreset(false)
        }}  href={'/login'}><FontAwesomeIcon icon={faArrowLeft}/> Back To Login</Link>
    </div>
    <div className="image relative h-64 w-64 mx-auto">
        <Image src={resetimage} alt="envelope" fill/>
    </div>
    <div className="space-y-5">
        <h2 className="text-3xl font-bold">Enter Reset Code</h2>
    <p className="text-gray-500">we've sent a 6-digit code to your email address please enter it below to continue</p>
    </div>
    <div className="mt-5">
        <div className="label">
            <label className="font-bold" htmlFor="email">Email Address</label>
        </div>
        <div className="email relative">
<input type="email" value={email2} name='email' id='email' className='form-control py-2 px-10 rounded-xl placeholder:text-gray-400' placeholder="You@example.com" />
<FontAwesomeIcon className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500" icon={faEnvelope}/>
        </div>
    </div>
    <div className="flex items-center justify-center mt-5  gap-2">
        {code.map((value,index)=>{
            return <input className="border text-center focus:outline-none rounded-lg focus:border-green-500 p-2  border-gray-500 w-10 h-10" type="text" key={index} ref={(element)=>{
                inputref.current[index]=element
            }} value={value} onChange={(e)=>{
                handlecange(index,e.target.value)

            }} onKeyDown={(e)=>{
                if(e.key=='Backspace'){
                    if(!code[index]&&index>0){
                        inputref.current[index-1]?.focus()
                    }
                }
            }}/>
        })}

    </div>

<button onClick={()=>{
    const lastcode=code.join("")
    verifycode({resetCode:lastcode})
}}  type='button'  className='btn w-full my-5 p-3 text-white mt-4 '>Verify Code <FontAwesomeIcon icon={faArrowRight}/></button>




  </form>

  </div>
  
  </>
}
