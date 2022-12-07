import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { allOnlineUsers } from '../../../api/UserRequest';
import myPic from '../../../assets/myPic.jpg'
import { io } from 'socket.io-client'

function LsideBar() {
    const socket = useRef()

    const user = useSelector((state) => state.User)

    const [onlineUsers, setOnlineUsers] = useState([])


    console.log(onlineUsers);



    useEffect(() => {
        socket.current = io('http://localhost:8800')
        socket.current.emit('new-user-add', user._id)
        getOnlineUsers()

    }, [user])

    const getOnlineUsers = () => {
        try {
            socket.current.on('get-users', async (users) => {
                let dataa = JSON.stringify(users)
                const { data } = await allOnlineUsers(user._id, dataa)
                console.log("data");
                console.log(data);
                setOnlineUsers(data)
            })
        } catch (error) {
            console.log(error);
        }

    }



    return (
        <div className='container bg-[#1f354d] p-5 rounded-lg shadow-light w-full' >
            <h1 className='font-semibold text-white'>Active Friends</h1>
            {
                onlineUsers.map((user, index) => {
                    return (

                        <div className='flex my-3 '>
                            <div>
                                <div className='rounded-full  relative w-[50px] h-[50px]'>
                                    <img src={user.image?`/images/${user.image}`:`https://randomuser.me/api/portraits/lego/0.jpg`} className='rounded-full object-cover w-full h-full ' alt="" />
                                    <div className='rounded-full absolute bottom-0 right-0 p-1 bg-green-400'></div>
                                </div>
                            </div>
                            <div className='ml-3 '>
                                <h2 className='text-[14px] font-semibold text-white'>{user.UserName}</h2>
                                <p className='text-[10px] text-slate-300'>{user.email}</p>
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default LsideBar