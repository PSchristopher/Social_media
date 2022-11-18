import React, { useContext, useEffect, useState } from 'react'
import myPic from '../../../assets/myPic.jpg'
import { BsFillHeartFill,BsFillShareFill } from 'react-icons/bs'
import { FaRegCommentDots } from 'react-icons/fa'
import axios from '../../../Axios/axios'
import { format, render, cancel, register } from 'timeago.js';




function Feed() {
    const [feed, setFeed] = useState([])
    useEffect(() => {
      getPost()
    }, [])
    const getPost = ()=>{
        axios.get('/getPost').then((response)=>{
            console.log(response);
            if(response.data.result){
                console.log(response.data.feed);
                setFeed(response.data.feed)
            }else{
                console.log("something went wrong");                
            }
        })
    }
    
    return (
        < >
        <div className=' overflow-y-scroll h-[70vh] overflow-hidden scrollbar-hide'>

        {
feed.map((post,index)=>{
    return(
        <div className='bg-[#1f354d] p-2 rounded-lg shadow-light w-full mb-4' >

        <div className='flex my-3 pb-3 '>
            <div>
                <div className='rounded-full  relative w-[50px] h-[50px]'>
                    <img src={myPic} className='rounded-full object-cover w-full h-full ' alt="" />
                    <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                </div>
            </div>
            <div className='ml-6 '>
                <h2 className='text-[14px] font-semibold text-white'>User_name</h2>
                <p className='text-[10px] text-slate-300'>{format(post.Created)}</p>
            </div>
            <div className='ml-2 p-1'>
                <p className='text-[10px] text-slate-300'>@alex_mcCarthy</p>

            </div>
        </div>

        <div className='object-contain '>
            <img src={`/images/${post.image}`} alt="" className='rounded-lg object-cover w-full  h-[500px] border-4 border-spacing-3 border-[#50809b]' />
        </div>
        <div className='p-2'>
            <p className='text-[#A0ADB4]  text-base	'>{post.description}</p>
        </div>
        <div className='flex gap-3 p-3'>
            <div className='flex'>

                <button className='bg-[#274055] rounded-lg text-white p-1 '><BsFillHeartFill className='flex text-white  items-center' /> </button>
            </div>
            <button className='bg-[#274055] rounded-lg text-white p-1 '><FaRegCommentDots className='flex text-white  items-center' /></button>
            <button className='bg-[#274055] rounded-lg text-white p-1 '><BsFillShareFill className='flex text-white  items-center' /></button>
        </div>

    </div>
    )
})
      
           
            
        }
            </div>
        </>
    )
}

export default Feed