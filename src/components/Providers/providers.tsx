'use client'
import { authinitial } from '@/Features/auth/store/auth.slice'
import { createstore, preloadedStatetype, storetype} from '@/store/store'
import React, { ReactNode, useRef } from 'react'
import { Provider} from 'react-redux'

export default function Providers({children,preloadedstate}:{children:ReactNode,preloadedstate:preloadedStatetype}) {
    const storeref=useRef<null|storetype>(null)
    if(!storeref.current){
        storeref.current=createstore(preloadedstate)
    }
  return <>
  <Provider store={storeref.current}>
{children}

  </Provider>
  
  
  </>
}
