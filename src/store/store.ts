import { useDispatch } from 'react-redux';

import { authinitial } from './../Features/auth/store/auth.slice';
import { authreducer } from '@/Features/auth/store/auth.slice'
import { cartreducer, cartstate } from '@/Features/cart/store/cart.slice';
import {configureStore} from '@reduxjs/toolkit'
import { UseDispatch, useSelector } from 'react-redux';
import { wishlistreducer, wishliststate } from '@/Features/wishlist/store/wishlist.slice';
export type preloadedStatetype={
    auth:authinitial,
    cart:cartstate,
    wishlist:wishliststate
}
export function createstore(preloadedState:preloadedStatetype){
    const store=configureStore({
    reducer:{
       auth: authreducer,
       cart:cartreducer,
       wishlist:wishlistreducer


    },
    preloadedState
})
return store
}
export type storetype=ReturnType<typeof createstore>
export type statestype=ReturnType<storetype['getState']>
export type dispatchtype=storetype['dispatch']
export const useAppSelector=useSelector.withTypes<statestype>()
export const useAppDispatch=useDispatch.withTypes<dispatchtype>()