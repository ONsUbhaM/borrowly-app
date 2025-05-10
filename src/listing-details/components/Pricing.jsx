import React from 'react'
import { Button } from '@/components/ui/button'
import { FaHandshake } from "react-icons/fa";

function Pricing({itemDetails}) {
  return (
    <div className='p-10 rounded-xl border shadow-md'>
      {itemDetails ? 
      (<div><h2 className='font-bold'>Our Price</h2>
      <h2 className='font-bold text-4xl'>₹{itemDetails?.rentalprice}/monthly</h2>
      <Button className="!bg-blue-700 w-full mt-7" size='lg'><FaHandshake className='text-lg mr-2'/>Make an Offer Price</Button></div>) 
      :
      (<div className="w-full h-[100px] rounded-xl bg-slate-200 animate-pulse"></div>)
      }
      </div>
  )
}

export default Pricing