

import { Loginschematype } from '@/Features/auth/schemas/login.schema'
import { signupschematype } from '@/Features/auth/schemas/signupschema'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form'
interface inputobj<t extends FieldValues> {
  name: FieldPath<t>,
  id:string,
  elementtype:string,
  type?:string,
  label:React.ReactNode,
  classname?:string,
  placeholder?:string,
  icon?:IconProp,
  register:UseFormRegister<t>
}
export default function Formfield<t extends FieldValues>({name,id,elementtype,type,label,classname,register,placeholder,icon}:inputobj<t>) {
  const renderelement=()=>{
    switch(elementtype){
      case'input':
      return <>
      <input 
       id={id}
       type={type}
      {...register(name)}
       className={`${classname} rounded-lg py-2 px-3`}
       placeholder={placeholder}
       />
      
      
      </>
      case 'textarea':
        return <>
        <textarea
         id={id}
         placeholder={placeholder}
         className={classname}
         {...register(name)}

         >

        </textarea>
        </>
    }
  }
  return <>
 {type==='checkbox'?<>
 <div className='space-x-3 flex items-center '>
  {renderelement()}
  <label htmlFor={id}>{label}</label>
 </div>
 
 </>:<div>
      <div className="label">
         <label htmlFor={id}>{label} <span className='text-red-500 text-lg'>*</span></label>
      </div>
      {placeholder&&icon?<div className='relative '>{renderelement()}
        <div className={`size-8 flex absolute  left-2 ${elementtype=='textarea'?'top-2':'top-1/2 -translate-y-1/2'}  items-center justify-center bg-gray-300/50 rounded-full`}>
          <FontAwesomeIcon className='' icon={icon}/>
        </div>
      </div>:renderelement()}
     </div>}
  
  
  </>
}
