import React from 'react'
import myPic from '../../../assets/myPic.jpg'
function RsideBar() {
    return (
        <div className='container bg-[#1f354d] p-5 rounded-lg shadow-light w-full' >
            <h1 className='font-semibold text-white'>Suggested For You</h1>
            <div className='flex my-3 pt-3'>
                <div>
                    <div className='rounded-full  relative w-[50px] h-[50px]'>
                        <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                        <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                    </div>
                </div>
                <div className='ml-3 '>
                    <h2 className='text-[14px] font-semibold text-white'>User Name</h2>
                    <p className='text-[10px] text-slate-300'>User@ gmail.com</p>
                </div>
                <div className='ml-4'>
                    <h2 className='text-[14px] font-semibold  text-white float-right cursor-pointer bg-blue-600 rounded-2xl p-1 pr-3 pl-3 '>Follow</h2>
                </div>
            </div>

            <div className='flex my-3'>
                <div>
                    <div className='rounded-full  relative w-[50px] h-[50px]'>
                        <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                        <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                    </div>
                </div>
                <div className='ml-3'>
                    <h2 className='text-[14px] font-semibold text-white'>User Name</h2>
                    <p className='text-[10px] text-slate-300'>User@ gmail.com</p>
                </div>
                <div className='ml-4'>
                    <h2 className='text-[14px] font-semibold  text-[#182D39] float-right cursor-pointer bg-[#D9D9D9] rounded-2xl p-1 pr-3 pl-3 '>Follow</h2>
                </div>
            </div>


            <div className='flex my-3'>
                <div>
                    <div className='rounded-full  relative w-[50px] h-[50px]'>
                        <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                        <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                    </div>
                </div>
                <div className='ml-3'>
                    <h2 className='text-[14px] font-semibold text-white'>User Name</h2>
                    <p className='text-[10px] text-slate-300'>User@ gmail.com</p>
                </div>
                <div className='ml-4'>
                    <h2 className='text-[14px] font-semibold  text-[#182D39] float-right cursor-pointer bg-[#D9D9D9] rounded-2xl p-1 pr-3 pl-3 '>Follow</h2>
                </div>
            </div>


            <div className='flex my-3'>
                <div>
                    <div className='rounded-full relative w-[50px] h-[50px]'>
                        <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                        <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                    </div>
                </div>
                <div className='ml-3'>
                    <h2 className='text-[14px] font-semibold text-white'>User Name</h2>
                    <p className='text-[10px] text-slate-300'>User@ gmail.com</p>
                </div>
                <div className='ml-4'>
                    <h2 className='text-[14px] font-semibold  text-[#182D39] float-right cursor-pointer bg-[#D9D9D9] rounded-2xl p-1 pr-3 pl-3 '>Follow</h2>
                </div>
            </div>
        </div>
    )
}

export default RsideBar