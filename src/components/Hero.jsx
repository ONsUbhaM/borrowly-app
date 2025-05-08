import React from 'react'
import Search from './Search'

function Hero() {
  return (
    <div>
        <div className='flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-[#eef0fc]'>
            <h2 className='text-lg '>Find items for take rent or give rent near you</h2>
            <h2 className='text-[60px] fnt-bold text-center'>Give rent take rent</h2>
            
            <Search/>

            <img src="/TV.png" alt="Tv image" className='mt-5'/>
        </div>
    </div>
  )
}

export default Hero