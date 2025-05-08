import React from 'react'
import Data from '@/Shared/Data'

function Catagory() {
  return (
    <div className='mt-70 md:mt-20 ' >
        <h2 className='font-bold text-3xl text-center mb-6'>Browse by type</h2>
        <div className='grid place-items-center grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-6 px-20'>
            {Data.Catagory.map((cat) => (
                <div key={cat.id} className='border rounded-md p-3 items-center flex flex-col hover:bg-purple-500 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer'>
                    <img src={cat.icon} alt="catagory icons" width={35} height={35}/>
                    <h2>{cat.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Catagory