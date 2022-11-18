import React from 'react'
import myPic from '../../../assets/myPic.jpg'

function LsideBar() {
    return (
        <div className='bg-[#1f354d] p-5 rounded-lg shadow-light w-full' >
            <h1 className='font-semibold text-white'>Active Friends</h1>
            <div className='flex my-3 '>
                <div>
                    <div className='rounded-full  relative w-[30px] h-[30px]'>
                        <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                        <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                    </div>
                </div>
                <div className='ml-8 '>
                    <h2 className='text-[14px] font-semibold text-white'>Alex McCarthy</h2>
                    <p className='text-[10px] text-slate-300'>@alex_mcCarthy</p>
                </div>
            </div>

            <div className='flex my-3'>
                <div>
                    <div className='rounded-full  relative w-[30px] h-[30px]'>
                        <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                        <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                    </div>
                </div>
                <div className='ml-8'>
                    <h2 className='text-[14px] font-semibold text-white'>Alex McCarthy</h2>
                    <p className='text-[10px] text-slate-300'>@alex_mcCarthy</p>
                </div>
            </div>


            <div className='flex my-3'>
                <div>
                    <div className='rounded-full  relative w-[30px] h-[30px]'>
                        <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                        <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                    </div>
                </div>
                <div className='ml-8'>
                    <h2 className='text-[14px] font-semibold text-white'>Alex McCarthy</h2>
                    <p className='text-[10px] text-slate-300'>@alex_mcCarthy</p>
                </div>
            </div>


            <div className='flex my-3'>
                <div>
                    <div className='rounded-full relative w-[30px] h-[30px]'>
                        <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                        <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                    </div>
                </div>
                <div className='ml-8'>
                    <h2 className='text-[14px] font-semibold text-white'>Alex McCarthy</h2>
                    <p className='text-[10px] text-slate-300'>@alex_mcCarthy</p>
                </div>
            </div>
        </div>
    )
}

export default LsideBar