import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Home/Navbar'
import myPic from '../../../assets/myPic.jpg'
import axios from '../../../Axios/axios'
function SearchProfile(props) {

    const [UserPosts, setUserPosts] = useState([])

    const User = useLocation().state.user
    console.log(User);
    useEffect(() => {
         axios.get(`/getUserPost/${User._id}`).then((response) => {

            if (response.data.result) {
                setUserPosts(response.data.feed)
            }
        })
    }, [User])
    
    return (
        <>
            <div className='bg-[#0F213E] h-full w-full '>
                <div className='sticky top-0'>

                    <Navbar />
                </div>

                <div className='   justify-center pt-6  '>
                    {/* <div className=" p-7 w-8/12 bg-[#1f354d] ">
                        <div className='flex '>

                            <div className='justify-center'>
                                <h1>username</h1>
                            </div>
                            <div className='justify-end'>
                                <button className=' bg-white'>follow</button>
                            </div>
                        </div>
                        <div className='flex'>


                            <div className='justify-start'>
                                <img src={'https://randomuser.me/api/portraits/women/49.jpg'} alt="" className='rounded-full ' />
                            </div>
                            <div className='justify-center flex-col items-center'>
                                <h1>name</h1>
                                <h1>email</h1>
                                <h1>phone</h1>
                                <h1>about </h1>
                            </div>
                        </div>
                    </div> */}
                    <div class="flex  items-center justify-center m-1 ">
                        <div class="w-full rounded-xl p-12 shadow-2xl shadow-blue-200  bg-[#1f354d] md:w-6/12 lg:w-8/12">
                            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
                                <div class="grid-cols-1 lg:col-span-3">
                                    <div class="mx-auto flex h-[170px] w-[170px] items-center justify-center rounded-full bg-blue-100 p-1">
                                        {User.image ?
                                            <img src={User.image} alt="" className='rounded-full h-full w-full ' />
                                            : <img src={'https://randomuser.me/api/portraits/women/49.jpg'} alt="" className='rounded-full h-full w-full ' />
                                        }
                                    </div>
                                </div>

                                <div class="col-span-1 lg:col-span-9">
                                    <div class="text-center lg:text-left">
                                        <h2 class="text-2xl font-bold text-white"> {User.fullname} || <span>{User.UserName}</span> </h2>
                                        {/* <p class="mt-2 font-semibold text-zinc-300"></p> */}
                                        <p class="mt-2 font-semibold text-zinc-300">{User.email}</p>
                                        <p class="mt-4 text-zinc-400">{User.about}</p>
                                    </div>

                                    <div class="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left">
                                        <div>
                                            <p class="font-bold text-blue-700">345</p>
                                            <p class="text-sm font-semibold text-zinc-100">Posts</p>
                                        </div>

                                        <div>
                                            <p class="font-bold text-blue-700">200k</p>
                                            <p class="text-sm font-semibold text-zinc-100">Followers</p>
                                        </div>

                                        <div>
                                            <p class="font-bold text-blue-700">38</p>
                                            <p class="text-sm font-semibold text-zinc-100">Following</p>
                                        </div>
                                    </div>

                                    <div class="mt-6 grid grid-cols-2 gap-4">
                                        <button class="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">Follow</button>

                                        {/* <button class="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">View Profile</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=' flex  rounded-lg items-center justify-center pb-8'>
                        <div class="p-[10px] w-full   bg-slate-50 rounded-lg md:w-6/12 lg:w-8/12 ">
                            <div class="flex items-center justify-center">
                                <div class="container ">
                                    <div class="overflow-y-scroll h-[50vh]  overflow-hidden  scrollbar-hide grid grid-cols-2 gap-2 rounded-xl bg-white p-2 lg:grid-cols-4 w-full">
                                       
                                        {
                                            UserPosts.map((posts, index) => {
                                               
                                                return (
                                                    <div class="group relative  rounded-xl">
                                                        <div class="absolute inset-0 h-60 w-60 group-hover:bg-rose-400/20"></div>

                                                        <img src={`/images/${posts.image}`} class="w-60 h-60 rounded-lg" alt="vannilalo" />
                                                        {/* <img src="https://images.unsplash.com/photo-1664174274811-948eceef7047?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" class="h-auto w-full" alt="Nasi lemak cover" /> */}
                                                    </div>
                                                )
                                                
                                            })
                                            
                                        }
                                       
                                        


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SearchProfile