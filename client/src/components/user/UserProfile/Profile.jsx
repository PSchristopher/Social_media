import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import { BiEditAlt } from 'react-icons/bi';
import profile from '../../../assets/myPic.jpg'
import jwtdecode from "jwt-decode"
import axios from '../../../Axios/axios'

import Navbar from '../../../components/user/Home/Navbar'
import { BsFillHeartFill, BsFillShareFill } from 'react-icons/bs'
import { FaRegCommentDots, FaUserCircle } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Profile() {
  const inputRef = useRef()

  const triggerFileSelectPopup = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  let userDetails = jwtdecode(localStorage.getItem("Usertoken"))
  console.log(userDetails);
  const [UserPosts, setUserPosts] = useState([])
  const [UserDetails, setUserDetails] = useState({})
  const [EditProfileModal, setEditProfileModal] = useState(false)
  const [patternErr, setpatternErr] = useState({})
  const [Image, setImage] = useState('')
  const [editUser, setEditUser] = useState({
    UserName: '', Fullname: '', phone: '', about: '',
    image: ''
  })
  useEffect(() => {
    getUser()
    getUserPost()

  }, [])
  const handleChange = (e) => {
    setpatternErr({})
    const { name, value } = e.target
    setEditUser({
      ...editUser,
      [name]: value,
    })

    console.log(editUser);
  }

  const getUser = async () => {
    await axios.get(`/getUserDtails/${userDetails.id}`).then((response) => {
      console.log("response");
      console.log(response.data);
      setUserDetails(response.data)
    })
  }
  const getUserPost = async () => {
    await axios.get(`/getUserPost/${userDetails.id}`).then((response) => {

      if (response.data.result) {
        setUserPosts(response.data.feed)
      }
    })
  }
  const fileUpload = (e) => {
    // let userDetails = jwtdecode(localStorage.getItem("Usertoken"))

    console.log("file upload ann");
    setImage(URL.createObjectURL(e.target.files[0]))

    setEditUser({
      ...editUser,
      image: e.target.files[0]

    })
  }
  const editChanges = async (e) => {
    e.preventDefault()
    console.log("vannu");
    console.log(editUser);
    if (!editUser.phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) && editUser.phone != '') {
      console.log("enter correct mobile number");
      setpatternErr({ phone: "Enter A Valid Number" })
    } else if (!editUser.Fullname.match(/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/) && editUser.Fullname != '') {
      console.log("enter correct name");
      setpatternErr({ Fullname: "Enter A Valid Name eg: Christo" })

    } else if (!editUser.UserName.match(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/) && editUser.UserName != '') {
      console.log("username sheriyalla");
      setpatternErr({ Username: "Enter A Valid Username eg: christo_123 ,Sto_chriz" })

    }
    else {

      const formData = new FormData()
      for (let key in editUser) {
        formData.append(key, editUser[key])
      }
      console.log(formData);
      formData.UserId = UserDetails._id
      console.log(userDetails.id);
      axios.post(`/editProfile/${userDetails.id}`, formData).then((response) => {
        if (response.data.staus) {
          setpatternErr({ Username: response.data.msg })
        } else {
          toast("WOrking On");
          setEditProfileModal(false)
        }
      })
    }

  }


  return (

    <>
      <Navbar />
      <div className="bg-[#0F213E] flex justify-center pt-6">


        <div className='w-full mt-10 sm:mt-16 sm:mx-4 md:mt-0 md:w-5/6  lg:w-3/4 lg:flex lg:justify-end  bg-[#1f354d] rounded-lg '>

          <div className="ProfileCard lg:container">
            <div className="flex  justify-between p-7 pl-[50px]">


              <div className="">
                {/* <img className="w-full h-40 object-fit object-center"/> */}
                {
                  UserDetails.image ?

                    <img src={`/images/${UserDetails.image} `} alt="ProfileImage" className="rounded-full w-60 h-60 " />
                    :
                    <img src={'https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp'} alt="ProfileImage" className="rounded-full w-60 h-60 " />
                }
              </div>
              <div className="flex flex-col gap-2 text-white ">
                
                <h1 className="text-2xl font-bold" style={{"font-family": "Times New Roman"}}>{UserDetails.UserName}</h1>
                <h1>Name :{UserDetails.fullname}</h1>
                <h1>Email :{UserDetails.email}</h1>
                <h1>Mobile :{UserDetails.mobile}</h1>
                <h1>About :{UserDetails.about}</h1>
              </div>
              <div className=" ">
                <button type="button" className=" text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-700  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" onClick={() => setEditProfileModal(!EditProfileModal)} >Edit Profile</button>
              </div>
            </div>
            {/* <div className="flex justify-end pr-4">
      <FiSettings />
      </div> */}
            <div className="followStatus">
              <hr />
              <div >
                <div className="follow">
                  <span className="text-xl font-semibold  text-gray-300">120</span>
                  <span className="font-medium text-white">followers</span>
                </div>
                <div className="follow">
                  <span className="text-xl font-semibold text-gray-300">8</span>
                  <span className="font-medium  text-gray-300">posts</span>
                </div>
                {/* for profilepage */}

                <div className="follow">
                  <span className="text-xl font-semibold  text-gray-300">78</span>
                  <span className="font-medium  text-gray-300">following</span>
                </div>

              </div>
              <hr />
            </div>

            <hr className="mt-2" />
            <div className="bg-[#1f354d]">


              {/* <span className="inline-flex items-center justify-center gap-2 ">
                <BsGrid1X2 /> <span>My Feeds</span>
              </span> */}
              {/* profile feeds */}


              <div className="grid grid-cols-1 mx-auto sm:grid-cols-3 px-6 p-4 gap-4 ">
                {
                  UserPosts.map((UserPosts, index) => {
                    return (
                      <div className='relative' >
                        <div className='myDIV'>

                          <img src={`/images/${UserPosts.image}`} alt="POST" className='rounded-lg h-80 border-4 w-full  object-cover' />
                        </div>
                        <div className='hide absolute top-[50%] left-[30%]  '>
                          <button className=' bg-[#274055] rounded-lg text-white p-3 m-3 ' ><BsFillHeartFill className='flex text-white  items-center' /></button>
                          <button className=' bg-[#274055] rounded-lg text-white p-3 m-3 ' ><FaRegCommentDots className='flex text-white  items-center' /></button>
                          <button className=' bg-[#274055] rounded-lg text-white p-3 m-3 ' ><BsFillShareFill className='flex text-white  items-center' /></button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

            </div>
          </div>

          {EditProfileModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <form onSubmit={editChanges}>
                      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">


                        <h3 className="  text-3xl font-semibold justify-center">
                          Edit Your Profile
                        </h3>

                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setEditProfileModal(false)}
                        >
                          <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="flex relative p-6 flex-col w-[600px] gap-3 items-center bg-slate-600">
                        {/* <div className=" relative abcd">
                        <img alt="" src={profile} className={" rounded-full w-32 h-32 items-center"} />
                        <button className=" absolute top-[45%] left-[40%] text-white text-[30px]" ></button>
                      </div> */}
                        <div className="relative  flex  bg-cover rounded-full w-32 h-32 border-8  justify-center object-cover" style={{ backgroundImage: `url(  ${Image || UserDetails.image || 'https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp'} )` }}>
                          <div className='flex justify-center items-center '>
                            <input type="file" title='' name='image' className='w-[100px]' ref={inputRef} style={{ color: `transparent`, display: 'none' }} onChange={fileUpload} />
                            <button className=' bg-[#0F213E] text-white rounded-lg text-lg' onClick={triggerFileSelectPopup} ><BiEditAlt /></button>
                          </div>
                        </div>
                        <div className="flex  gap-2 w-full">
                          <div>
                            <label htmlFor="Fullname">Full Name
                              <input type="text" name="Fullname" className="bg-white rounded-lg  w-full text-black  p-1 pl-3" placeholder={UserDetails.fullname} onChange={handleChange} />
                            </label>
                            <p className="text-red-500">{patternErr.Fullname}</p>
                          </div>

                          <div>
                            <label htmlFor="UserName">User Name
                              <input type="text" name="UserName" className="bg-white rounded-lg   w-full text-black p-1 pl-3" placeholder={UserDetails.UserName} onChange={handleChange} />
                            </label>
                            <p className="text-red-500">{patternErr.Username}</p>
                          </div>


                        </div>
                        <div className="w-full ">
                          <label htmlFor="phone">Mobile
                            <input type="number" name="phone" className="bg-white rounded-lg  w-full  text-black p-1 pl-3" placeholder={UserDetails.phone ? UserDetails.phone : "Mobile"} onChange={handleChange} />
                            <p className="text-red-500">{patternErr.phone}</p>
                          </label>
                        </div>
                        <div className="w-full ">
                          <label htmlFor="about">About
                            <input type="text" name="about" className="bg-white rounded-lg  w-full text-black  p-1 pl-3" placeholder={UserDetails.about ? UserDetails.phone : "About"} onChange={handleChange} />
                          </label>
                        </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-center bg-slate-600 p-6 border-t border-solid border-slate-200 rounded-b">

                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
        </div>
      </div>

    </>
  )
}

export default Profile;