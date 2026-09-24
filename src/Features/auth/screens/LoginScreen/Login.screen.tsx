import React from 'react'
import Loginhero from '../../Components/Loginhero/Loginhero'
import Loginform from '../../Components/Loginform/Loginform'

export default function Loginscreen() {
  return <>
   <div className='grid bg-white lg:p-20 lg:grid-cols-2  '>
      <Loginhero/>
      <Loginform/>
    </div>
  
  </>
}
