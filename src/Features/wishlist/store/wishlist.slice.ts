import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductResponse } from "../types/wishlist.types";
export type wishliststate={
    numofitems:number,
    products:null|Product[]
}
const initialState:wishliststate={
    numofitems:0,
    products:null
}

const wishlistslice=createSlice({
    name:'wishlist',
    initialState,
    reducers:{
        setwishlistitems:(state,action:PayloadAction<ProductResponse>)=>{
            state.numofitems=action.payload.count
            state.products=action.payload.data

        }

    }
   

})
export const wishlistreducer=wishlistslice.reducer
export const wishlistactions=wishlistslice.actions