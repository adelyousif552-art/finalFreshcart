import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userinfotype } from "../types/authtypes";

export type authinitial={
    isauthinticated:boolean,
    userinfo:null|userinfotype
}

const initialState:authinitial={
    isauthinticated:false,
    userinfo:null
}

const authslice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setauth:function(state,action:PayloadAction<authinitial>){
            state.isauthinticated=action.payload.isauthinticated
            state.userinfo=action.payload.userinfo
        }

    }
})
export const authreducer=authslice.reducer
export const {setauth}=authslice.actions