import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, CartResponse } from "../types/cart.types";
export type cartstate={
    cartId:string|null,
    numOfCartItems:number,
    totalcartprice:number,
    products:CartProduct[],
    isloading:boolean,
    error:string|null
}
const initialState:cartstate={
    cartId:null,
    numOfCartItems:0,
    totalcartprice:0,
    products:[],
    isloading:false,
    error:null
}

const cartslice=createSlice({
    name:'cart',
    initialState,
    reducers:{
       increasecounter:(state,action)=>{
        const item=state.products.find((product)=>product._id==action.payload)
        if(item){
            item.count++
        }

       },
        decreasecounter:(state,action)=>{
        const item=state.products.find((product)=>product._id==action.payload)
        if(item){
            item.count--
        }

       },
       setcartinfo:(state,action:PayloadAction<CartResponse>)=>{
        state.cartId=action.payload.cartId
        state.numOfCartItems=action.payload.numOfCartItems
        state.products=action.payload.data.products
        state.totalcartprice=action.payload.data.totalCartPrice
        

       }


    }

})
export const cartreducer=cartslice.reducer
export const cartactions=cartslice.actions