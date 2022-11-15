import React from 'react'
import myPic from '../../../assets/myPic.jpg'
function RsideBar() {
    return (
        <div className='bg-[#314f5f] p-5 rounded-lg shadow-light w-full' >
            <h1 className='font-semibold text-white'>Suggested For You</h1>
            <div className='flex my-3 pt-3'>
                <div>
                    <div className='rounded-full  relative w-[30px] h-[30px]'>
                        <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                        <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                    </div>
                </div>
                <div className='ml-8 '>
                    <h2 className='text-[14px] font-semibold text-white'>Alex McCarthy</h2>
                    <p className='text-[10px] text-[#596C7A]'>@alex_mcCarthy</p>
                </div>
                <div className='ml-4'>
                    <h2 className='text-[14px] font-semibold  text-white float-right cursor-pointer bg-blue-600 rounded-2xl p-1 pr-3 pl-3 '>Following</h2>
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
                    <p className='text-[10px] text-[#596C7A]'>@alex_mcCarthy</p>
                </div>
                <div className='ml-4'>
                    <h2 className='text-[14px] font-semibold  text-[#182D39] float-right cursor-pointer bg-[#D9D9D9] rounded-2xl p-1 pr-3 pl-3 '>Follow</h2>
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
                    <p className='text-[10px] text-[#596C7A]'>@alex_mcCarthy</p>
                </div>
                <div className='ml-4'>
                    <h2 className='text-[14px] font-semibold  text-[#182D39] float-right cursor-pointer bg-[#D9D9D9] rounded-2xl p-1 pr-3 pl-3 '>Follow</h2>
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
                    <p className='text-[10px] text-[#596C7A]'>@alex_mcCarthy</p>
                </div>
                <div className='ml-4'>
                    <h2 className='text-[14px] font-semibold  text-[#182D39] float-right cursor-pointer bg-[#D9D9D9] rounded-2xl p-1 pr-3 pl-3 '>Follow</h2>
                </div>
            </div>
        </div>
    )
}

export default RsideBar