import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Home/Navbar'
import axios from '../../../Axios/axios'
import { useSelector } from 'react-redux'
import { follow, unFollow } from '../../../api/UserRequest'
import { findChat } from '../../../api/ChatRequest'

function SearchProfile(props) {

    const navigate = useNavigate()

    const [UserPosts, setUserPosts] = useState([])
    const [followState, setfollowState] = useState(false)
    const [Userdetails, setUserdetails] = useState({})
    const user = useSelector((state) => state.User)

    // const User = useLocation().state.user

    // console.log(user);
    // console.log(User);
    const User = useLocation().state.user

    useEffect(() => {
        getUserDetails()
        getUserPost()

    }, [followState, User])

    const getUserDetails = () => {
        axios.get(`/getUserDtails/${User._id}`).then((response) => {
            setUserdetails(response.data)
        })
    }


    const getUserPost = () => {
        axios.get(`/getUserPost/${User._id}`).then((response) => {

            if (response.data.result) {
                setUserPosts(response.data.feed)


            }
        })
    }

    const followUser = async (id) => {
        const data = {
            userId: user._id,
            friendsId: id
        }
        try {
            const result = await follow(data)
            console.log(result);
            if (result) {
                setfollowState(!followState)
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const unFollowUser = async (id) => {
        const data = {
            userId: user._id,
            friendsId: id
        }
        try {
            const result = await unFollow(data)
            console.log(result);
            if (result) {
                setfollowState(!followState)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const newMessage = async () => {
        try {
            const result = await findChat(user._id, Userdetails._id)
            console.log(result);
            navigate('/chat')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='bg-[#0F213E] h-full w-full '>
                <div className='sticky top-0'>

                    <Navbar />
                </div>

                <div className='   justify-center pt-6  '>

                    <div class="flex  items-center justify-center m-1 ">
                        <div class="w-full rounded-xl p-12 shadow-2xl shadow-blue-200  bg-[#1f354d] md:w-6/12 lg:w-8/12">
                            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
                                <div class="grid-cols-1 lg:col-span-3">
                                    <div class="mx-auto flex h-[170px] w-[170px] items-center justify-center rounded-full bg-blue-100 p-1">
                                        {User.image ?
                                            <img src={Userdetails.image} alt="" className='rounded-full h-full w-full ' />
                                            : <img src={'https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp'} alt="" className='rounded-full h-full w-full ' />
                                        }
                                    </div>
                                </div>

                                <div class="col-span-1 lg:col-span-9">
                                    <div class="text-center lg:text-left">
                                        <h2 class="text-2xl font-bold text-white"> {Userdetails.fullname} || <span>{Userdetails.UserName}</span> </h2>
                                        {/* <p class="mt-2 font-semibold text-zinc-300"></p> */}
                                        <p class="mt-2 font-semibold text-zinc-300">{Userdetails.email}</p>
                                        <p class="mt-4 text-zinc-400">{Userdetails.about}</p>
                                    </div>

                                    <div class="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left">
                                        <div>
                                            <p class="text-sm font-semibold text-zinc-100">Posts</p>
                                            <p class="font-bold text-blue-700">{UserPosts?.length}</p>
                                        </div>

                                        <div>
                                            <p class="text-sm font-semibold text-zinc-100">Followers</p>
                                            <p class="font-bold text-blue-700">{Userdetails?.followers?.length}</p>
                                        </div>

                                        <div>
                                            <p class="text-sm font-semibold text-zinc-100">Following</p>
                                            <p class="font-bold text-blue-700">{Userdetails?.following?.length}</p>
                                        </div>
                                    </div>

                                    <div class="mt-6 grid grid-cols-2 gap-4 max-w-[300px]">
                                        {
                                            !Userdetails.followers?.includes(user._id) ?
                                                <button class="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white" onClick={() => { followUser(Userdetails._id) }}>Follow</button>
                                                : <button class="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white" onClick={() => { unFollowUser(Userdetails._id) }}>UnFollow</button>

                                        }

                                        <button class="w-full rounded-xl border-2 border-green-500 bg-white px-3 py-2 font-semibold text-green-500 hover:bg-green-500 hover:text-white" onClick={newMessage}>Message</button>
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