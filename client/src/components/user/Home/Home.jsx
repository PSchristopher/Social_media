import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Feed from './Feed'
import LsideBar from './LsideBar'
import Navbar from './Navbar'
import RsideBar from './RsideBar'
import Stories from './Stories'
import axios from '../../../Axios/axios'
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
        if (response.data.auth) {

            navigate('/')
        }
        else navigate('/login')
    });
};
  return (
    <>
      <div className='bg-[#0F213E] '>
        <Navbar />
        <div className='flex  max-w-[100%]'>
          <div className='w-4/12 p-5 pl-20 hidden md:block max-w-[100%] '>
            <LsideBar />
          </div>
          <div className='md:w-7/12 p-5 flex-row justify-center max-w-[100%]'>
            
            <Stories  />

            <Feed />
          </div>
          <div className='w-5/12 p-5 pr-20 hidden md:block max-w-[100%] ' >
            <RsideBar />
          </div>

        </div>
      </div>

    </>
  )
}

export default Home