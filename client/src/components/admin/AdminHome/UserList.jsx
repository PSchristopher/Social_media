import React, { useState, useEffect } from "react"
import moment from "moment"
import axios from '../../../Axios/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom";

function UserList() {

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [status, setStatus] = useState(true)

    useEffect(() => {
        axios.get("/admin/user_management").then((response) => {
              console.log(response)
              setUsers(response.data)
              
           })
           .catch((error) => {
              console.log(error,'its error console')
              if(!error.response.data.auth){
                 toast.warn(error.response.data.message)
                 navigate('/admin_login')
              }
           })
     }, [status])

    const blockUser = (userId) => {
        console.log(userId);
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => 
              axios.put("/admin/user_management/block_user",{userId}).then((res)=>{
                console.log(res);
                if(res.data.update){
                 toast.warn("User blocked successfully!",{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    theme:"dark"
                  });
                }
                setStatus(!status)
              })
            },
            {
              label: 'No',
              onClick: () => toast.warn("User block Cancelled!",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                theme:"dark"
            })
          }
          ]
        });
         
       }
    
       /* ------------------------------ UNBLOCK USER ------------------------------ */
    
       const unblockUser = (userId)=>{
    
             confirmAlert({
               title: 'Confirm to submit',
               message: 'Are you sure to do this.',
               buttons: [
                 {
                   label: 'Yes',
                   onClick: () => 
                   axios.put('/admin/user_management/unblock_user',{userId}).then((res)=>{
                      console.log(res);
                      if(res.data.update){
                        toast.warn("User unblocked successfully!",{
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: true,
                          theme:"dark"
                        });
                         setStatus(!status)
                      }
                 })
                },
                 
                 {
                   label: 'No',
                   onClick: () => toast.warn("User unblocked Cancelled!",{
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: true,
                      theme:"dark"
                    })
                 }
                
             ]
               
             });
           }
    return (
        <div>
            <table className='w-full text-sm text-gray-500 dark:text-gray-400 text-center rounded-lg    '>
               
                <thead className='text-xs text-white uppercase  bg-dark-purple dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope='col' className='py-3 px-6'>
                            User Id
                        </th>
                        <th scope='col' className='py-3 px-6'>
                            Email
                        </th>
                        <th scope='col' className='py-3 px-6'>
                            Account Type
                        </th>
                        <th scope='col' className='py-3 px-6'>
                            Created Date
                        </th>
                        <th scope='col' className='py-3 px-6'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, i) => {
                        console.log(user.created,"hh");
                        user.date = moment(user.created).format("DD-MM-YYYY")
                      
                        return (
                            <tr key={i} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <th
                                    scope='row'
                                    className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                >
                                    {user._id}
                                </th>
                                <td className='py-4 px-6'>{user.email}</td>
                                <td className='py-4 px-6'>{user.first_name}</td>
                                <td className='py-4 px-6'>{user.date}</td>
                                
                                <td className='py-4 px-6'>
                                    {user.report_status === "active" ? (
                                        <button
                                            type='button'
                                            className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
                                            onClick={(e) => { blockUser(user._id) }}
                                        >
                                            Block
                                        </button>
                                    ) : (
                                        <button
                                            type='button'
                                            className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
                                            onClick={(e) => { unblockUser(user._id) }}
                                        >
                                            Unblock
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UserList