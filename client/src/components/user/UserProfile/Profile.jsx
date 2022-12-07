import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { BiEditAlt } from 'react-icons/bi';
import editprofile from '../../../assets/editprofile.webp'
import jwtdecode from "jwt-decode"
import axios from '../../../Axios/axios'

import Navbar from '../../../components/user/Home/Navbar'
// import { BsFillHeartFill, BsFillShareFill } from 'react-icons/bs'
import { IoEye } from 'react-icons/io5'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showFollower, showFollowing } from "../../../api/UserRequest";
function Profile() {
  const inputRef = useRef()

  const triggerFileSelectPopup = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  let userDetails = jwtdecode(localStorage.getItem("Usertoken"))
  const [UserPosts, setUserPosts] = useState([])
  const [UserDetails, setUserDetails] = useState({})
  const [EditProfileModal, setEditProfileModal] = useState(false)
  const [patternErr, setpatternErr] = useState({ type: "", data: [] })
  const [Image, setImage] = useState('')
  const [editUser, setEditUser] = useState({
    UserName: '', Fullname: '', phone: '', about: '',
    image: ''
  })
  const [postView, setpostView] = useState(false)
  const [followings, setFollowings] = useState({})
  const [ffModal, setffModal] = useState(false)
  // const [postView, setpostView] = useState(true);



  useEffect(() => {
    getUser()
    getUserPost()

  }, [EditProfileModal])
  const handleChange = (e) => {
    setpatternErr({})
    const { name, value } = e.target
    setEditUser({
      ...editUser,
      [name]: value,
    })

  }

  const getUser = async () => {

    await axios.get(`/getUserDtails/${userDetails.id}`, {
      headers: {
        "x-access-token": localStorage.getItem("Usertoken"),
      },
    }).then((response) => {
      setUserDetails(response.data)
    })
  }
  const getUserPost = async () => {
    await axios.get(`/getUserPost/${userDetails.id}`, {
      headers: {
        "x-access-token": localStorage.getItem("Usertoken"),
      },
    }).then((response) => {

      if (response.data.result) {
        console.log(response.data.feed,"hfhhfhfhfhfhhf");   
        setUserPosts(response.data.feed)
      }
    })
  }
  const fileUpload = (e) => {
    // let userDetails = jwtdecode(localStorage.getItem("Usertoken"))

    setImage(URL.createObjectURL(e.target.files[0]))

    setEditUser({
      ...editUser,
      image: e.target.files[0]

    })
  }
  const editChanges = async (e) => {
    e.preventDefault()

    if (!editUser.phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) && editUser.phone != '') {
      setpatternErr({ phone: "Enter A Valid Number" })
    } else if (!editUser.Fullname.match(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/) && editUser.Fullname != '') {
      setpatternErr({ Fullname: "Enter A Valid Name eg: Christo" })

    } else if (!editUser.UserName.match(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/) && editUser.UserName != '') {
      setpatternErr({ Username: "Enter A Valid Username eg: christo_123 ,Sto_chriz" })

    }
    else {

      const formData = new FormData()
      for (let key in editUser) {
        formData.append(key, editUser[key])
      }
      formData.UserId = UserDetails._id
      axios.post(`/editProfile/${userDetails.id}`, formData, {
        headers: {
          "x-access-token": localStorage.getItem("Usertoken"),
        },
      }).then((response) => {
        if (!response.data.Update) {
          setpatternErr({ Username: response.data.msg })
        } else {
          toast("Working On");
          setEditProfileModal(false)
        }
      })
    }

  }

  const viewDetails = async (postId) => {
    setpostView(!postView)
    
  }
  const showFollowings = async () => {
    const { data } = await showFollowing(UserDetails._id)
    setffModal(true)
    setFollowings({ type: "following", data: data.list })
  }
  const showFollowers = async () => {
    const { data } = await showFollower(UserDetails._id)
    setffModal(true)
    setFollowings({ type: "followers", data: data.list })
  }
  return (
    <div className='min-h-screen h-full bg-[#0F213E] '>
      <Navbar />
      <div class="pt-2">
        <section className='flex justify-center'>
          <section class="text-gray-400 body-font  lg:w-9/12">
            <div class="container px-5  mx-auto">

              <div class="p-2 pl-4 bg-[#1e354c] flex gap-12 justify-between items-center mx-auto   mb-4  rounded-lg sm:flex-row flex-col">

                <div class=" inline-flex items-center justify-center flex-shrink-0">
                  {
                    UserDetails.image ?

                      <img src={`/images/${UserDetails.image} `} alt="ProfileImage" className="rounded-full w-36 h-36 " />
                      :
                      <img src={'https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp'} alt="ProfileImage" className="rounded-full w-36 h-36 " />
                  }
                </div>
                <div class="flex items-center  sm:text-left text-center mt-6 sm:mt-0">
                  <div>

                    <h1 class="text-white text-2xl title-font font-bold mb-2">{UserDetails.UserName}</h1>
                    <h2 className='text-gray-300 mb-2'>{UserDetails.email}</h2>
                    <h2 className='text-gray-300 mb-2'>{UserDetails.mobile}</h2>
                    <p class="leading-relaxed text-base mb-2">{UserDetails.about}</p>
                  </div>

                </div>

                <div class="md:flex  text-blue-300 flex justify-center mt-3">

                  <div class="w-full justify-between flex gap-6 space-x-3">
                    <div className="">

                      <div class=" flex flex-col items-center" onClick={showFollowers}>
                        <h2 class="text-gray-200 font-bold ">{UserDetails?.followers?.length}</h2>
                        <p className="font-normal">FOLLOWERS</p>
                      </div>
                    </div>
                    <div class=" flex flex-col items-center">
                      <h2 class="text-gray-200 font-bold">{UserPosts?.length}</h2>
                      <p className='font-normal'>POSTS</p>
                    </div>
                    <div class="flex flex-col items-center" onClick={showFollowings}>
                      <h2 class="text-gray-200 font-bold">{UserDetails?.following?.length}</h2>
                      <p className="font-normal" >FOLLOWING</p>
                    </div>
                  </div>




                </div>

                <div className="  ">
                  <button type="button" className=" text-gray-400 hover:text-white   hover:bg-gray-700  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white border-2 dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={() => setEditProfileModal(!EditProfileModal)} >Edit</button>
                </div>
              </div>
            </div>
          </section>
        </section>
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

                              <div className="flex w-full items-center gap-5">
                                {
                                  details?.image  ?
                                    <img src={`/images/${details.image}`} className='h-12  w-12  rounded-full' alt="" />
                                    :
                                    <img src={'https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp'} alt="ProfileImage" className="rounded-full w-12 h-12 " />

                                }
                                <p className="text-white">{details?.UserName}</p>
                              </div>
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

        {/* image section */}
        <section className='flex justify-center px-6 max-h-[65vh] overflow-y-scroll scrollbar-hide'>

          <section className='bg-[#1e354c] lg:w-9/12 rounded-lg '>

            {
              UserPosts.length !== 0 ?
                <div className=" grid grid-cols-1 mx-auto sm:grid-cols-3  p-2 max-h-full gap-4 relative overflow-y-scroll scrollbar-hide ">

                  {

                    UserPosts.map((UserPosts, index) => {
                      return (
                        <div className='relative ' >
                          <div className='myDIV  '>


                            <img src={`/images/${UserPosts.image}`} alt="POST" className='rounded-lg h-80 border-2 border-blue-400 w-full  object-cover' />


                          </div>
                          <div className='hide absolute top-[40%] left-[40%]  '>
                            <button className=' rounded-lg text-white p-3 m-3 ' onClick={() => viewDetails(UserPosts._id)} ><IoEye className='flex text-white  items-center' /></button>
                          </div>
                        </div>
                      )
                    })


                  }


                </div>
                : <div className="p-2 flex justify-center">
                  <iframe src="https://giphy.com/embed/giXLnhxp60zEEIkq8K" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>

            }


          </section>

        </section>

        {EditProfileModal ? (
          <>
            <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
              <div className="relative  my-6 mx-auto ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-white" >
                  <form onSubmit={editChanges}>
                    <div className="flex  p-3 border-b border-solid border-slate-200 rounded-t-lg">

                      <div className="flex justify-center w-full">
                        <h3 className="  text-2xl font-semibold justify-center">
                          Edit Your Profile ...
                        </h3>
                      </div>


                      <button
                        className=" ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setEditProfileModal(false)}
                      >
                        <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    <div className="flex relative p-6 flex-col w-auto md:w-[600px] gap-3 items-center object-cover " style={{ backgroundImage: `url(${editprofile})` }}>
                      {/* <div className=" relative abcd">
                        <img alt="" src={profile} className={" rounded-full w-32 h-32 items-center"} />
                        <button className=" absolute top-[45%] left-[40%] text-white text-[30px]" ></button>
                      </div> */}
                      <div className="relative  flex  bg-cover rounded-full w-32 h-32 border-2 border-[#1e354c]  justify-center object-cover" style={{ backgroundImage: `url(  ${Image || UserDetails.image || 'https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp'} )` }}>
                        <div className='flex justify-center items-center '>
                          <input type="file" title='' name='image' accept=".jpg" className='w-[100px]' ref={inputRef} style={{ color: `transparent`, display: 'none' }} onChange={fileUpload} />
                          <button className=' bg-[#0F213E] text-white rounded-md text-lg' onClick={triggerFileSelectPopup} ><BiEditAlt /></button>
                        </div>
                      </div>
                      <div className="flex  gap-2 w-full">
                        <div>
                          <label htmlFor="Fullname " className="text-blue-500 font-medium">Full Name
                            <input type="text" name="Fullname" className="bg-white rounded-lg  w-full text-black  p-1 pl-3" placeholder={UserDetails.fullname} onChange={handleChange} />
                          </label>
                          <p className="text-red-500">{patternErr.Fullname}</p>
                        </div>

                        <div>
                          <label htmlFor="UserName" className="text-blue-500 font-medium">User Name
                            <input type="text" name="UserName" className="bg-white rounded-lg   w-full text-black p-1 pl-3" placeholder={UserDetails.UserName} onChange={handleChange} />
                          </label>
                          <p className="text-red-500">{patternErr.Username}</p>
                        </div>


                      </div>
                      <div className="w-full ">
                        <label htmlFor="phone" className="text-blue-500 font-medium">Mobile
                          <input type="number" name="phone" className="bg-white rounded-lg  w-full  text-black p-1 pl-3" placeholder={UserDetails.phone ? UserDetails.phone : "Mobile"} onChange={handleChange} />
                          <p className="text-red-500">{patternErr.phone}</p>
                        </label>
                      </div>
                      <div className="w-full " >
                        <label htmlFor="about" className="text-blue-500 font-medium" >About
                          <input type="text" name="about" className="bg-white rounded-lg  w-full text-black  p-1 pl-3" placeholder={UserDetails.about ? UserDetails.phone : "About"} onChange={handleChange} />
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-center bg-[#1e354c] p-1 border-t border-solid border-slate-200 rounded-b-lg">

                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"

                      >
                        Save Changes
                      </button>

                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

        {
          postView ?

            (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">


                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none" id="modal">
                        <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                          <div className="relative pt-2 bg-transparent   ">

                            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4"></h1>
                            <div className=' w-full  bg-white flex flex-col  rounded-2xl border-slate-200 border shadow-md  '>

                              <div className='flex flex-col items-center '>
                                <div className='flex flex-col   w-full'>
                                  <div className='p-5 bg-white   rounded-t-2xl border-slate-200 border-t shadow-md'>
                                    <div className='flex items-center space-x-2'>
                                      <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full w-10 h-10'alt="" />
                                      <div>
                                        <p className='font-medium'></p>
                                        <p className='text-xs text-gray-400'></p>
                                      </div>
                                    </div>
                                    <p className='pt-4'></p>
                                  </div>
                                  <div className='relative w-full   bg-white '>
                                    <img className='object w-[800px] h-[300px]' alt="" />
                                  </div>

                                  <div className='flex justify-between rounded-b-2xl items-center  bg-white  text-gray-400 border-t '>
                                    <div className='w-20  flex justify-between items-center space-x-4 p-2'>
                                      <div className='text-2xl flex text-slate-900 hover:cursor-pointer '   >

                                        
                                          <span className='text-lg ml-2'></span>
                                        
                                      </div>
                                      <div className='text-xl flex text-slate-900 cursor-pointer ' >
                                        <div className='py-1'>
                                         jnj
                                        </div>
                                       

                                            <span className='ml-2 text-lg'>nz</span>
                                        
                                      </div>
                                      <div className='text-xl'> zzz</div>

                                    </div>
                                    <div className='text-xl p-2 '>nzbz</div>
                                  </div>



                                  <div className='flex flex-col '>
                                    <div className=' max-h-32 overflow-auto scrollbar-hide rounded-b-2xl border-slate-200  shadow-md' >


                                   
                                       
                                          <div className="flex gap-3 py-2 pl-3 items-center bg-white">
                                            <div>
                                              <img src="https://imgs.search.brave.com/JC3yuRG8o8d2G-kk-gDv7DrSKVLLPa5QoIK2uoMr9QE/rs:fit:641:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5V/enVZTVhkQjNEUFVu/UE9ld2hha0N3SGFG/ZSZwaWQ9QXBp" className='rounded-full' width={30} height={30} alt="" />
                                            </div>
                                            <div>
                                              <div>
                                                <span className="font-medium text-sm mr-2">zzz</span>
                                                <span className="">zzz</span>
                                              </div>
                                              <p className="text-slate-500 text-xs ">  bba</p>
                                            </div>
                                          </div>
                   




                                    </div>

                                   
                                  </div>


                                </div>
                              </div>

                            </div>
                            <button className="cursor-pointer absolute top-0 right-0 mt-8   mr-5 text-black hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={()=>setpostView()}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>

                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>

            ) : null

        }

      </div>
    </div>

  )
}

export default Profile;