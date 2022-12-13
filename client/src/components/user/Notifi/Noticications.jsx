import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchCount, getAllNotifications } from '../../../api/UserRequest'
import { NotificationContex } from '../../../Context/Context'
import { SocketContext } from '../../../Context/SocketContext'
import { format, render, cancel, register } from 'timeago.js';


function Noticications() {
    const socket = useContext(SocketContext)
    const user = useSelector((state) => state.User)

    const { Shownotification, setShowNotification, } = useContext(NotificationContex)
    const [notifications, setNotifications] = useState([])
    const [notData, setnotData] = useState([])
    const [not, setnot] = useState()

    // const fetchNotiCount = async () => {
    //     const { data } = fetchCount(user._id)
    // }


    useEffect(() => {
        try {
            socket.on('get-notification', data => {
                // setNotifications((prev) => [...prev, data])
                setnot(new Date())
                // fetchNotiCount()
            })
        } catch (error) {
            console.log(error);
        }

    }, [socket])


    useEffect(() => {
        console.log("abhijith ");
        try {

            const fetchNotifications = async () => {
                const { data } = await getAllNotifications(user._id)
                setnotData(data)
            }
            fetchNotifications()
        } catch (error) {

            console.log(error);
        }
    }, [socket, not])


    console.log(notData, "idhaanu data");
    return (
        <>

            {
                Shownotification &&
                < div class="absolute right-20 max-h-48 z-20 w-64 py-2  overflow-y-scroll overflow-hidden scrollbar-hide  rounded-md shadow-xl dark:bg-blue-200 top-16 bg-gray-300  ">

                    {notData?.map((data) => {

                        return (
                            <>
                                <div class="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">

                                    <img src={data?.user?.image ? `/images/${data.user.image}` : "https://flowbite.com/docs/images/people/profile-picture-1.jpg"} class="flex-shrink-0 object-cover mx-1 rounded-full w-10 h-10" alt="" />

                                    <div class="mx-1 flex-col ">
                                        <div className='flex'>
                                            <h1 class="text-sm font-semibold text-black dark:text-gray-900 ">{data.user.UserName}</h1>
                                            <p class="text-sm font-semibold text-black dark:text-gray-900 pl-2">{data.desc}</p>
                                        </div>
                                        <p class="text-xs font-semibold text-gray-700 dark:text-gray-900 pl-2">{format(data.time)}</p>
                                    </div>

                                </div>
                            </>
                        )
                    })
                    }
                </div>
            }

        </>
    )
}

export default Noticications