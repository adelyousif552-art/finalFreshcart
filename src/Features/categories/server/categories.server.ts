'use server'

import axios, { AxiosRequestConfig } from "axios"
import { CategoriesResponse, specificcategory } from "../types/categories.types"
import { SubCategoriesResponse } from "../types/subcategories.types"

export async function getallcategories():Promise<CategoriesResponse>{
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/categories',
            method:'GET',

        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}
export async function getspecificcategory(id:string):Promise<specificcategory>{
    try {
        const options:AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/categories/${id}`,
            method:"GET"
        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}
export async function getallsubcategories():Promise<SubCategoriesResponse>{
    try {
        const options:AxiosRequestConfig={
            url:'https://ecommerce.routemisr.com/api/v1/subcategories',
            method:'GET',

        }
        const {data}=await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}
