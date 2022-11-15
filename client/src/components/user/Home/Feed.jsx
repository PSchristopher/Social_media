import React from 'react'
import myPic from '../../../assets/myPic.jpg'
import { BsFillHeartFill } from 'react-icons/bs'
function Feed() {
    return (
        <>
            <div className='bg-[#1f354d] p-2 rounded-lg shadow-light w-full mb-4' >

                <div className='flex my-3 pb-3 '>
                    <div>
                        <div className='rounded-full  relative w-[50px] h-[50px]'>
                            <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                            <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                        </div>
                    </div>
                    <div className='ml-6 '>
                        <h2 className='text-[14px] font-semibold text-white'>Alex McCarthy</h2>
                        <p className='text-[10px] text-[#596C7A]'>2 hours ago</p>
                    </div>
                    <div className='ml-2 p-1'>
                        <p className='text-[10px] text-[#596C7A]'>@alex_mcCarthy</p>

                    </div>
                </div>

                <div className='object-contain '>
                    <img src={myPic} alt="" className='rounded-lg object-cover w-full border-4 border-spacing-3 border-[#50809b]' />
                </div>
                <div className='p-2'>
                    <p className='text-[#A0ADB4]  text-base	'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
                <div className='flex gap-3 p-3'>
                    <div className='flex'>

                        <button className='bg-[#274055] rounded-lg text-white p-1 w-36'><BsFillHeartFill className='flex text-red-500 items-center' /> likes</button>
                    </div>
                    <button className='bg-[#274055] rounded-lg text-white p-1 w-36'>comment</button>
                    <button className='bg-[#274055] rounded-lg text-white p-1 w-36'>share</button>
                </div>

            </div>
            <div className='bg-[#1f354d] p-2 rounded-lg shadow-light w-full' >

                <div className='flex my-3 pb-3 '>
                    <div>
                        <div className='rounded-full  relative w-[30px] h-[30px]'>
                            <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                            <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                        </div>
                    </div>
                    <div className='ml-6 '>
                        <h2 className='text-[14px] font-semibold text-white'>Alex McCarthy</h2>
                        <p className='text-[10px] text-[#596C7A]'>2 hours ago</p>
                    </div>
                    <div className='ml-2 p-1'>
                        <p className='text-[10px] text-[#596C7A]'>@alex_mcCarthy</p>

                    </div>
                </div>

                <div className='object-contain '>
                    <img src={myPic} alt="" className='rounded-lg border-4 border-spacing-3 border-[#50809b]' />
                </div>
                <div className='p-2'>
                    <p className='text-[#A0ADB4]  text-base	'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
                <div className='flex gap-3 p-3'>
                    <div className='flex'>

                        <button className='bg-[#274055] rounded-lg text-white p-1 w-36'><BsFillHeartFill className='flex text-red-500 items-center' /> likes</button>
                    </div>
                    <button className='bg-[#274055] rounded-lg text-white p-1 w-36'>comment</button>
                    <button className='bg-[#274055] rounded-lg text-white p-1 w-36'>share</button>
                </div>

            </div>
        </>
    )
}

export default Feed