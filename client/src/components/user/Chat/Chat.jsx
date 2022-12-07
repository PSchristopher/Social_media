import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Home/Navbar'
import { useSelector } from 'react-redux'
import { userChats } from '../../../api/ChatRequest';
import Converstion from './Converstion';
import ChatBox from './ChatBox';
import { io } from 'socket.io-client'

function Chat() {

  const user = useSelector((state) => state.User)
  console.log(user);

  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState()
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const socket = useRef()

console.log("onlineUsers");
console.log(onlineUsers);
  // sending message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', user._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)

    })
  }, [user])

  // receive message from socket server

  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      setReceiveMessage(data)
    })


  }, [])

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id)
        console.log(data);
        setChats(data)
      } catch (error) {
        console.log(error);
      }
    }
    getChats()

  }, [user])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    return online ? true : false
  }


  return (

    <div className='h-screen bg-[#0F213E]'>
      <Navbar />
      <div className=''>
        <div className=''>
          <div className="flex justify-center    h-full chatscreen p-5">
            <section className="  rounded-md w-full lg:w-11/12 lg:mx-auto flex justify-center">
              {/* <!-- Left section --> */}
              <div
                className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4 flex flex-col justify-start items-stretch  bg-[#314F5F6D] bg-opacity-80 rounded-md  lg:rounded-lg p-3">
                
                <div className="flex-auto flex flex-col">
                  <div className="flex-auto flex flex-row">
                    
                    <div className="w-full ">
                      <div className="w-full p-1 flex justify-center">

                        <p className='text-white font-bold italic'>Message With Your Friends</p>

                       
                      </div>
                      <div className="">
                        <ul className="min-w-full h-96  overflow-y-scroll overflow-hidden  scrollbar-hide messagelist">
                          {
                            chats.map((chat) => (
                              <div onClick={() => setCurrentChat(chat)}>
                                <Converstion data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
                              </div>
                            )
                            )
                          }          

                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  <!-- Middle section --> */}

              <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />


              {/*<!-- Right section --> */}
             
              
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat