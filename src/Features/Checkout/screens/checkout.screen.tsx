'use client'
import { useState } from "react";
import Checkoutdetails from "../components/Checkoutdetails";
import Checkoutsummary from "../components/Checkoutsummary";


export default function Checkoutscreen() {
  const [submitting,setsubmitting]=useState(false)
  return<>
  <section className="max-w-7xl mx-auto w-full gap-5 grid grid-cols-12">
    <Checkoutdetails setsubmitting={setsubmitting}/>
    <Checkoutsummary submitting={submitting}/>

  </section>
  
  
  </>
}
