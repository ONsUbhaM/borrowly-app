import React from 'react'
import { Button } from '@/components/ui/button'

function OwnersDetails({itemDetails}) {
  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
        <h2 className='font-medium text-2xl mb-3 '>Owner/ Deals</h2>
        <img src={itemDetails?.userImageUrl} alt="user Image" className='w-[70px] h-[70px] rounded-xl '/>
        <h2 className='mt-2 font-bold text-xl'>{itemDetails?.userName}</h2>
        <h2 className='mt-2 font-bold !text-gray-600'>{itemDetails?.createdBy}</h2>

        <Button className="w-full mt-6 !bg-blue-700">Message Owner</Button>
    </div>
  )
}

export default OwnersDetails