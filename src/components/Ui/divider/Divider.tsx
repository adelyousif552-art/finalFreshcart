import React from 'react'

export default function Divider({text,classname}:{text:string,classname:string}) {
  return <>
  <div className={` before:absolute relative  before:bg-gray-300/30 before:h-1 before:left-8 before:top-1/2  before:-translate-y-1/2
  ${classname} after:h-1 text-center after:bg-gray-300/30 after:absolute after:top-1/2 after:-translate-y-1/2 after:right-8
  `}>
  <span className=''>{text}</span></div>
  </>
}
