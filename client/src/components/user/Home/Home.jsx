import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Feed from './Feed'
import LsideBar from './LsideBar'
import Navbar from './Navbar'
import RsideBar from './RsideBar'
import Stories from './Stories'
import SmallNavbar from './SmallNavbar'
import axios from '../../../Axios/axios'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

function Home() {


  const navigate = useNavigate()
  


  useEffect(() => {
    userAuthenticeted()
  }, [])



  const userAuthenticeted = () => {
    axios.get("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("Usertoken"),
      },
    }).then((response) => {
      if (response.data.auth == false) {
        navigate('/login')
      }
      else navigate('/')
    });
  };
  return (
    <>
      <div className='bg-[#0F213E] container max-h-screen min-h-screen  '>
        <Navbar />
        <div className='flex justify-center'>

          <div className='flex  w-10/12 '>
            <div className='container w-3/12 p-2  hidden md:block max-w-[100%] '>
              <LsideBar />
            </div>
            <div className='container md:w-7/12 p-2  flex-row justify-center max-w-[100%]'>
              {/* <Stories /> */}
              <Feed />
            </div>
            <div className='container w-4/12 p-2  hidden md:block max-w-[100%]  ' >
              <RsideBar />
            </div>
          </div>
        </div>
       <SmallNavbar/>
      </div>
    </>
  )
}

export default Home