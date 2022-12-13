import React, { useEffect, useRef, useState } from 'react'
import { addMessage, getMessages } from '../../../api/MessageRequest'
import { getUser } from '../../../api/UserRequest'
import { format, render, cancel, register } from 'timeago.js';
import InputEmoji from 'react-input-emoji'

function ChatBox({ chat, currentUser, setSendMessage, receiveMessage }) {

    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setnewMessage] = useState("")
    const scroll = useRef()

    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages, receiveMessage])
        }

    }, [receiveMessage])




    // fetching data for header
    console.log("userData");
    console.log(userData);
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)

            } catch (error) {
                console.log(error);
            }
        }
        if (chat !== null) getUserData()
    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)
                console.log("messages");
                console.log(data);
                setMessages(data)
            } catch (error) {
                console.log(error);
            }
        }

        if (chat !== null) fetchMessages()
    }, [chat])

    const handleChange = (newMessage) => {
        setnewMessage(newMessage)
    }

    const handleSend = async (e) => {
        console.log("ethi njn");
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }

        // send message to data base

        try {
            const { data } = await addMessage(message)
            setMessages([...messages, data])
            setnewMessage('')
        } catch (error) {
            console.log(error);
        }

        const receiverId = chat.members.find((id) => id !== currentUser)
        setSendMessage({ ...message, receiverId })

    }

    // always scroll to the last message

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            {chat ? (
                <div className=" w-3/6 bg-[#314F5F6D] h-full md:flex flex-col justify-start items-stretch  ml-8  rounded-lg">
                    {/*<!-- Header with name --> */}
                    <div className="flex flex-row items-center justify-between px-3 py-2  bg-opacity-40 border-b-2 border-gray-100">
                        <div className="">

                            <div className=" py-2 flex  items-center gap-4">
                                {
                                    userData?.image ?
                                        <img src={`/images/${userData?.image}`}
                                            className="h-12 w-12 rounded-full self-end" alt="" />
                                        :
                                        <img src={'https://imgs.search.brave.com/d0IIb0RSYo0SCzA8yldT5UCB9IByR7XvhKjLrb6F-Zc/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC53/UnR2T05fOEpLUlFn/aGRST3c1UXZRSGFI/YSZwaWQ9QXBp'} className="h-12 w-12 rounded-full self-end" alt="" />
                                }
                                <h2 className="   font-medium text-white italic"><span>{userData?.fullname} || </span>{userData?.UserName} </h2>
                            </div>

                            {/* <p className="text-xs text-gray-500">4 memebres</p> */}
                        </div>
                        <div className="flex flex-row">
                            <button type="button"
                                className="p-2 ml-2 text-gray-400 rounded-full hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring"
                                aria-label="Search">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                                    <path
                                        d="M12.323,2.398c-0.741-0.312-1.523-0.472-2.319-0.472c-2.394,0-4.544,1.423-5.476,3.625C3.907,7.013,3.896,8.629,4.49,10.102c0.528,1.304,1.494,2.333,2.72,2.99L5.467,17.33c-0.113,0.273,0.018,0.59,0.292,0.703c0.068,0.027,0.137,0.041,0.206,0.041c0.211,0,0.412-0.127,0.498-0.334l1.74-4.23c0.583,0.186,1.18,0.309,1.795,0.309c2.394,0,4.544-1.424,5.478-3.629C16.755,7.173,15.342,3.68,12.323,2.398z M14.488,9.77c-0.769,1.807-2.529,2.975-4.49,2.975c-0.651,0-1.291-0.131-1.897-0.387c-0.002-0.004-0.002-0.004-0.002-0.004c-0.003,0-0.003,0-0.003,0s0,0,0,0c-1.195-0.508-2.121-1.452-2.607-2.656c-0.489-1.205-0.477-2.53,0.03-3.727c0.764-1.805,2.525-2.969,4.487-2.969c0.651,0,1.292,0.129,1.898,0.386C14.374,4.438,15.533,7.3,14.488,9.77z">
                                    </path>
                                </svg>
                            </button>
                            <button type="button"
                                className="p-2 ml-2 text-gray-400 xl:text-blue-500 rounded-full hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring"
                                aria-label="Open">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <g>
                                        <rect fill="none" height="24" width="24" />
                                        <g>
                                            <path
                                                d="M2,4v16h20V4H2z M20,8.67h-2.5V6H20V8.67z M17.5,10.67H20v2.67h-2.5V10.67z M4,6h11.5v12H4V6z M17.5,18v-2.67H20V18H17.5z" />
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            <button type="button"
                                className="p-2 ml-2 text-gray-400 rounded-full hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring"
                                aria-label="More">
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="nonzero"
                                        d="M12,16 C13.1045695,16 14,16.8954305 14,18 C14,19.1045695 13.1045695,20 12,20 C10.8954305,20 10,19.1045695 10,18 C10,16.8954305 10.8954305,16 12,16 Z M12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 Z M12,4 C13.1045695,4 14,4.8954305 14,6 C14,7.1045695 13.1045695,8 12,8 C10.8954305,8 10,7.1045695 10,6 C10,4.8954305 10.8954305,4 12,4 Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/*<!-- Messages --> */}
                    {/* <div className='w-full overflow-y-auto max-h-[60vh] scrollbar-hide'> */}
                    <div className='w-full overflow-y-auto h-[385px] scrollbar-hide'>
                        {messages.map((message) => (
                            <>
                                <div className="flex-auto flex flex-col   overflow-y-auto overflow-hidden  scrollbar-hide messagelist">
                                    <div className="flex flex-col ">
                                        {
                                            message.senderId == currentUser ?
                                                <div className="flex flex-row justify-end" ref={scroll}>
                                                    <div className="p-1">

                                                        <div className="px-4 py-3 rounded-tl-xl  rounded-tr-xl rounded-bl-xl my-2 bg-blue-500 text-white flex flex-row items-center">
                                                            <p className="text-sm flex">
                                                                {message.text}

                                                            </p>
                                                        </div>
                                                        <div className="ml-2 flex flex-row text-xs float-right text-blue-500">
                                                            <span className="mr-1">
                                                                {format(message.createdAt)}
                                                            </span>
                                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 19 14">
                                                                <path fillRule="nonzero"
                                                                    d="M4.96833846,10.0490996 L11.5108251,2.571972 C11.7472185,2.30180819 12.1578642,2.27443181 12.428028,2.51082515 C12.6711754,2.72357915 12.717665,3.07747757 12.5522007,3.34307913 L12.4891749,3.428028 L5.48917485,11.428028 C5.2663359,11.6827011 4.89144111,11.7199091 4.62486888,11.5309823 L4.54038059,11.4596194 L1.54038059,8.45961941 C1.2865398,8.20577862 1.2865398,7.79422138 1.54038059,7.54038059 C1.7688373,7.31192388 2.12504434,7.28907821 2.37905111,7.47184358 L2.45961941,7.54038059 L4.96833846,10.0490996 L11.5108251,2.571972 L4.96833846,10.0490996 Z M9.96833846,10.0490996 L16.5108251,2.571972 C16.7472185,2.30180819 17.1578642,2.27443181 17.428028,2.51082515 C17.6711754,2.72357915 17.717665,3.07747757 17.5522007,3.34307913 L17.4891749,3.428028 L10.4891749,11.428028 C10.2663359,11.6827011 9.89144111,11.7199091 9.62486888,11.5309823 L9.54038059,11.4596194 L8.54038059,10.4596194 C8.2865398,10.2057786 8.2865398,9.79422138 8.54038059,9.54038059 C8.7688373,9.31192388 9.12504434,9.28907821 9.37905111,9.47184358 L9.45961941,9.54038059 L9.96833846,10.0490996 L16.5108251,2.571972 L9.96833846,10.0490996 Z">
                                                                </path>
                                                            </svg>
                                                        </div>

                                                    </div>
                                                </div>

                                                :
                                                <div className="flex flex-row p-2 w-11/12" ref={scroll}>


                                                    <div className=" p-2">
                                                        <div className="bg-gray-300  p-3  rounded-tl-xl  rounded-tr-xl rounded-br-xl mb-2 relative">
                                                            <p className="text-sm">{message.text}</p>
                                                            {/* <p className="text-xs text-gray-500 absolute right-2 bottom-2">{format(message.createdAt)}</p> */}
                                                        </div>
                                                        <div className="ml-2 flex flex-row text-xs float-left text-blue-500">
                                                            <span className="mr-1">
                                                                {format(message.createdAt)}
                                                            </span>
                                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 19 14">
                                                                <path fillRule="nonzero"
                                                                    d="M4.96833846,10.0490996 L11.5108251,2.571972 C11.7472185,2.30180819 12.1578642,2.27443181 12.428028,2.51082515 C12.6711754,2.72357915 12.717665,3.07747757 12.5522007,3.34307913 L12.4891749,3.428028 L5.48917485,11.428028 C5.2663359,11.6827011 4.89144111,11.7199091 4.62486888,11.5309823 L4.54038059,11.4596194 L1.54038059,8.45961941 C1.2865398,8.20577862 1.2865398,7.79422138 1.54038059,7.54038059 C1.7688373,7.31192388 2.12504434,7.28907821 2.37905111,7.47184358 L2.45961941,7.54038059 L4.96833846,10.0490996 L11.5108251,2.571972 L4.96833846,10.0490996 Z M9.96833846,10.0490996 L16.5108251,2.571972 C16.7472185,2.30180819 17.1578642,2.27443181 17.428028,2.51082515 C17.6711754,2.72357915 17.717665,3.07747757 17.5522007,3.34307913 L17.4891749,3.428028 L10.4891749,11.428028 C10.2663359,11.6827011 9.89144111,11.7199091 9.62486888,11.5309823 L9.54038059,11.4596194 L8.54038059,10.4596194 C8.2865398,10.2057786 8.2865398,9.79422138 8.54038059,9.54038059 C8.7688373,9.31192388 9.12504434,9.28907821 9.37905111,9.47184358 L9.45961941,9.54038059 L9.96833846,10.0490996 L16.5108251,2.571972 L9.96833846,10.0490996 Z">
                                                                </path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>

                            </>
                        ))}
                    </div>

                    {/*<!-- Input for writing a messages --> */}
                    <div className="flex flex-row justify-between items-center p-3">

                        <div className="flex-1 px-3 ">


                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange} />
                        </div>
                        <div className="flex flex-row">


                            <button disabled={!newMessage} onClick={handleSend} >
                                <svg
                                    class='w-5 h-5 text-white origin-center transform rotate-90'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ) :
                (
                    <div className="hidden w-3/6 bg-[#314F5F6D] h-full md:flex flex-col justify-start items-stretch  ml-8  rounded-lg">

                        <div className='flex items-center '>
                            <div className=' justify-center text-white h-full w-full'>
                                <img src="https://img.freepik.com/free-vector/messaging-concept-illustration_114360-1326.jpg?w=740&t=st=1669961664~exp=1669962264~hmac=d24bc839ed5525d96eca887b8eb42b43cc96a6b5aa9ca63405e5f67a31574364" className='rounded-lg w-full h-[530px]' alt="" />
                            </div>
                        </div>
                    </div>
                )}


        </>
    )
}

export default ChatBox