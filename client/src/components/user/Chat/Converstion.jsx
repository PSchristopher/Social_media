import React, { useEffect, useState } from 'react'
import { getUser } from '../../../api/UserRequest'

function Converstion({ data, currentUserId , online}) {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        console.log("bvtvybunbvt");
        console.log(data);
        setUserData(data)
      } catch (error) {
        console.log(error);
      }

    }
    getUserData()
  }, [])



  return (
    <div  >
      <li className="my-2 p-2 flex gap-4  flex-row cursor-pointer rounded-lg bg-[#596C7A] hover:bg-gray-200 hover:bg-opacity-50 hover:text-white">
        <div className='rounded-full  relative '>
          <img
            src={userData?.image ? `/images/${userData.image}` : "https://randomuser.me/api/portraits/lego/4.jpg"}
            className="h-12 w-12 rounded-full mr-4" alt="" />
            {online && <div className='rounded-full absolute bottom-1 right-3 p-1 bg-green-500'></div>}
        </div>
        <div className="w-full flex flex-col justify-center">
          <div className="flex flex-row justify-between items-center">
            <div className="text-xs flex flex-col">
            <h2 className=" font-semibold text-gray-200  text-base">{userData?.UserName} </h2>
             <span className='text-gray-400  text-sm'>{userData?.email}</span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
           
          </div>
        </div>
      </li>
    </div>
  )
}

export default Converstion