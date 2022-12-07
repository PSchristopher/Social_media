import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate ,Link} from 'react-router-dom'
import Navbar from '../Home/Navbar'
import axios from '../../../Axios/axios'
import { useSelector } from 'react-redux'
import { follow, showFollower, showFollowing, unFollow } from '../../../api/UserRequest'
import { findChat } from '../../../api/ChatRequest'
import jwtdecode from "jwt-decode"

function SearchProfile(props) {

    const navigate = useNavigate()
    let userDetails = localStorage.getItem("Usertoken") ? jwtdecode(localStorage.getItem("Usertoken")) : ''

    const [UserPosts, setUserPosts] = useState([])
    const [followState, setfollowState] = useState(false)
    const [Userdetails, setUserdetails] = useState({})
    const user = useSelector((state) => state.User)
    const [followings, setFollowings] = useState({})
    const [ffModal, setffModal] = useState(false)
    // const User = useLocation().state.user

    // console.log(user);
    // console.log(User);
    const User = useLocation().state.user

    useEffect(() => {
        getUserDetails()
        getUserPost()

    }, [followState, User])

    const getUserDetails = () => {
        axios.get(`/getUserDtails/${User._id}`, {
            headers: {
                "x-access-token": localStorage.getItem("Usertoken"),
            },
        }).then((response) => {
            setUserdetails(response.data)
        })
    }


    const getUserPost = () => {
        axios.get(`/getUserPost/${User._id}`, {
            headers: {
                "x-access-token": localStorage.getItem("Usertoken"),
            },
        }).then((response) => {

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
    const showFollowings = async () => {
        const { data } = await showFollowing(Userdetails._id)
        setffModal(true)
        setFollowings({ type: "following", data: data.list })
    }
    const showFollowers = async () => {
        const { data } = await showFollower(Userdetails._id)
        setffModal(true)
        setFollowings({ type: "followers", data: data.list })
    }
    return (
        <>
            <div className='bg-[#0F213E] h-full w-full '>
                <div className='sticky top-0'>

                    <Navbar />
                </div>

                <div className='   justify-center pt-6  '>

                    <div class="flex  items-center justify-center m-1 ">
                        <div class="w-full rounded-xl p-2 shadow-2xl   bg-[#1f354d]  lg:w-8/12">
                            <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
                                <div class="grid-cols-1 lg:col-span-3">
                                    <div class="mx-auto flex h-full items-center justify-center rounded-fullp-1">
                                        <img src={Userdetails.image ? `/images/${Userdetails.image}` : `https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp`} alt="" className='rounded-full h-[140px] w-[140px] ' />


                                    </div>
                                </div>

                                <div class="col-span-1 lg:col-span-9 flex justify-between">
                                    <div class="text-center lg:text-left flex flex-col justify-center items-center">
                                        <h2 class="text-2xl font-bold text-white"> {Userdetails.fullname} || <span>{Userdetails.UserName}</span> </h2>
                                        {/* <p class="mt-2 font-semibold text-zinc-300"></p> */}
                                        <p class="mt-2 font-semibold text-zinc-300">{Userdetails.email}</p>
                                        <p class="mt-4 text-zinc-400">{Userdetails.about}</p>
                                    </div>

                                    <div class="mt-6 grid grid-cols-2 gap-6 text-center mr-3 lg:text-left float-right max-h-4">
                                        {
                                            !Userdetails.followers?.includes(user._id) ?
                                                <button class="block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded" onClick={() => { followUser(Userdetails._id) }}>Follow</button>
                                                : <button class="block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded" onClick={() => { unFollowUser(Userdetails._id) }}>UnFollow</button>

                                        }

                                        <button class="block uppercase mx-auto shadow bg-green-800 hover:bg-green-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded" onClick={newMessage}>Message</button>
                                    </div>

                                </div>
                            </div>
                            <div className='flex justify-center'>

                                <div class="flex justify-center pt-3  gap-4 min-w-[600px]">


                                    <div class="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left w-full">
                                        <div className='flex flex-col text-center' onClick={showFollowers}>
                                            <p class="font-bold text-blue-700">{Userdetails?.followers?.length}</p>
                                            <p class="text-sm font-semibold text-zinc-100">Followers</p>
                                        </div>
                                        <div className='flex flex-col text-center'>
                                            <p class="font-bold text-blue-700">{UserPosts?.length}</p>
                                            <p class="text-sm font-semibold text-zinc-100">Posts</p>
                                        </div>


                                        <div className='flex flex-col text-center' onClick={showFollowings}>
                                            <p class="font-bold text-blue-700">{Userdetails?.following?.length}</p>
                                            <p class="text-sm font-semibold text-zinc-100">Following</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        ffModal ?
                            (
                                <>

                                    <div className="justify-center  items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  " >

                                        <div className="relative  my-6 mx-auto ">
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-gray-500 " >
                                                <div className="flex  text-white p-2 border-b border-solid border-slate-200 rounded-t-lg">

                                                    <div className="flex justify-center w-full">
                                                        <h3 className="  text-lg font-semibold justify-center uppercase">
                                                            {followings.type}
                                                        </h3>
                                                    </div>


                                                    <button
                                                        className=" ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setffModal(false)}
                                                    >
                                                        <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                            ×
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="flex relative p-3 flex-col  w-[250px] gap-3 items-center bg-gray-500 rounded-lg   ">

                                                    {
                                                        followings.data.map((details, index) => {
                                                            return (
                                                                
                                                                
                                                                <Link key={index} to={`${details._id != userDetails.id ? "/searchProfile" :"/userProfile"}` }  state={{user:details}} className="flex w-full items-center gap-5" onClick={()=>setffModal(false)}>
                                                                    {
                                                                        details?.image ?
                                                                            <img src={`/images/${details.image}`} className='h-12  w-12  rounded-full' alt="" />
                                                                            :
                                                                            <img src={'https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp'} alt="ProfileImage" className="rounded-full w-12 h-12 " />
                                                                           
                                                                    }
                                                                    <p className="text-white">{details?.UserName}</p>
                                                                </Link>
                                                              
                                                            )
                                                        }

                                                        )

                                                    }


                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                                </>
                            )
                            : null
                    }

                    <div className=' flex  rounded-lg items-center justify-center pt-4'>
                        <div class=" w-full   bg-[#1e354c] rounded-lg lg:w-8/12 ">
                            <div class="flex items-center justify-center">
                                <div class="container ">
                                    {
                                        UserPosts.length !== 0 ?
                                            <div class="overflow-y-scroll h-[50vh]   overflow-hidden  scrollbar-hide grid  sm:grid-cols-2  md:grid-cols-3  rounded-xl bg-[#1e354c]  lg:grid-cols-3 w-full">

                                                {
                                                    UserPosts.map((posts, index) => {

                                                        return (
                                                            <div class="group   rounded-xl">
                                                                <div class="  w-full h-full p-3">

                                                                    <img src={`/images/${posts.image}`} class="w-full h-60 rounded-lg object-cover " alt="vannilalo" />

                                                                </div>
                                                            </div>
                                                        )

                                                    })

                                                }




                                            </div>
                                            : <div className="p-2 flex justify-center">
                                                <iframe src="https://giphy.com/embed/giXLnhxp60zEEIkq8K" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/shopping-skeleton-cart-giXLnhxp60zEEIkq8K"></a></p>               
                                                
                                                 </div>

                                    }

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