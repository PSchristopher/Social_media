import axios from '../../../Axios/axios'
import React, { useState, useEffect } from 'react'
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
    const navigate = useNavigate()
    const initialValues = { email: "", password: "" }
    const [Values, setValues] = useState(initialValues)
    const [logError, setlogError] = useState({
        email: true,
        password: true,
        msg: ''
    })
    const handleChange = (e) => {

        const { name, value } = e.target
        setValues({ ...Values, [name]: value })

        console.log("Values")
        console.log(Values);

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (Values.email == '') {
            setlogError({
                email: false,
                password: true,
                msg: "Enter the Email to Proceed"
            })
        } else if (Values.password == '') {
            setlogError({
                email: true,
                password: false,
                msg: "Enter the password to proceed"
            })
        } else {
            setValues(Values)
            axios.post('/admin/adminlogin', { ...Values }).then((response) => {
                console.log("response from server")
                console.log(response.data)
                if (response.data.emailmsg) {
                    setlogError({
                        email: false,
                        password: true,
                        msg: response.data.message
                    })
                } else if (response.data.passmsg) {
                    setlogError({
                        email: true,
                        password: false,
                        msg: response.data.message
                    })
                } else {
                    // localStorage.setItem("adminToken", response.data.adminToken)
                    navigate("/admin")  
                }
            }).catch(error => console.log(error))
        }
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-sky-900'>
            <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
                <div className='bg-white rounded-2xl shadow-2xl flex flex-row  max-w-4xl'>
                    <div className='flex-col justify-center  p-5'>
                        <div className='text-left font-bold'>
                            MY <span className='text-sky-900'> Admin</span>
                        </div>
                        <div className='py-10'>
                            <h2 className='text-3xl font-bold text-sky-900 '>Admin Login</h2>
                            <div className='border-2 w-20 border-sky-900 inline-block mb-2'></div>
                           
                            <form >
                                <div className='flex flex-col items-center mb-2'>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'><FaRegEnvelope className='text-gray-400 m-3' />
                                        <input type="email" name='email' placeholder='Email' className=' bg-gray-100 flex-1' value={setValues.email} onChange={handleChange} />
                                    </div>
                                    <p className='font-normal text-xs m-0  mb-3 text-left text-red-600'>{logError.email ? '' : logError.msg}</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'><MdLockOutline className='text-gray-400 m-3' />
                                        <input type="password" name='password' placeholder='Password' className=' bg-gray-100 flex-1' value={setValues.password} onChange={handleChange} />
                                    </div>
                                    <p className='font-normal text-xs m-0  mb-3 text-left text-red-600'>{logError.password ? '' : logError.msg}</p>
                                   
                                    <a href='' className='border-2 border-sky-900 rounded-full px-12 py-2 inline-block font-semibold hover:bg-sky-900 hover:text-white' onClick={handleSubmit}>Sign In</a>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </main>
        </div>
  )
}

export default AdminLogin