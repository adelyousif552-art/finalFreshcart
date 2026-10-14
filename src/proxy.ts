import { NextRequest, NextResponse } from "next/server";
const protectedroutes=['/cart','/wishlist','/profile','/allorders']
const authroutes=['/login','/signup']

export function proxy(request:NextRequest){
    const {pathname}=request.nextUrl
    const token=request.cookies.get('token')?.value||null
    const isauthenticated=!!token
    const isprotectedroute=protectedroutes.some((route)=>pathname===route||pathname.startsWith(`${route}/`))
    const isauthroute=authroutes.some((route)=>pathname===route||pathname.startsWith(`${route}/`))
    if(isprotectedroute&&!isauthenticated){
        return NextResponse.redirect(new URL('/login',request.url))
    }
    if(isauthroute&&isauthenticated){
        return NextResponse.redirect(new URL('/',request.url))
    }
    return NextResponse.next()
    

}
export const config={
    matcher:[
        '/cart/:path*',
        '/wishlist/:path*',
        '/profile/:path*',
        '/allorders/:path*',
        '/login',
        '/signup'
    ]
}