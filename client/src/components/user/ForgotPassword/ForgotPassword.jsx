import axios from '../../../Axios/axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import OTPInput, { ResendOTP } from "otp-input-react";
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay-ts';
import BounceLoader from 'react-spinners/BounceLoader'


function ForgotPassword() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [DataError, setDataError] = useState('')
    const [OtpModal, setOtpModal] = useState(false)
    const [OTP, setOTP] = useState('');
    const [PasswordSec, setPasswordSec] = useState(false)
    const [UserDetails, setUserDetails] = useState({})
    const [OtpError, setOtpError] = useState('')
    const [isActive, setActive] = useState(false)
    const [loader, setloader] = useState(false)

    useEffect(() => {




    }, [])


    const onSubmit = (data) => {
        console.log("data");
        console.log(data);

        axios.post('/forgotPassword', data).then((response) => {
            if (response.data.status) {

                setUserDetails(response.data.user)

                setOtpModal(true)
            } else {
                console.log("true");
                setDataError(response.data.msg)
            }
        })


    }
    const onVerify = (e) => {
        e.preventDefault()
        console.log("logggg");
        const data = {
            OTP: OTP,
            user: UserDetails._id
        }
        if (OTP.length < 6) {
            setOtpError('Enter A 6 digit Otp')
        } else {

            axios.post('/verifyOtp', data).then((response) => {
                console.log(response.data)
                if (response.data.verified) {
                    // navigate('/login')
                    setOtpModal(false)

                    setPasswordSec(!PasswordSec)
                }
                setOtpError(response.data.msg)
            })
        }
    }
    const doReset = (data) => {
        console.log("called");
        if (data.password != data.Cpassword) {
            setDataError('Enter a Correct Confirm Password')
        } else {
            axios.post('/resetPassword', data).then((response) => {
                console.log(response);
                if (response.data.status) {
                    console.log("password channged");
                    setActive(value => !value)
                    setloader(true)
                    toast("Resetting password");
                    setTimeout(() => {
                        navigate('/login')
                    }, "4000")
                } else {
                    console.log("somethinsb ");
                    setDataError(response.data.msg)
                }
            })
        }
    }
    return (
        <>

            <div className='loginpage relative'>
                <div className='bg'>
                    <div className='grad flex items-center  absolute top-0 left-0'>
                        <div className=' md:w-[35%] p-7 md:ml-[3rem]'>
                            <h3 className='text-white text-lg pb-4 '>START  FOR  FREE</h3>
                            <h1 className='text-white text-5xl'>Forgot Password <span className='text-blue-600'>.</span></h1>
                            {!PasswordSec ? <p className='text-white pt-10 pb-10'>Enter Your Registered Email</p> : <p className='text-white pt-10 pb-10'>Enter Your New Password</p>}
                            <p className='text-red-500 font-[8px] mb-3 pl-3'></p>
                            <p className='text-red-500 font-[8px] mb-3 pl-3'>{DataError}</p>

                            <form >
                                <div className='flex flex-col'>
                                    {!PasswordSec ?

                                        <div className=''>
                                            <input type="text" name='email' placeholder=' Email' className='h-12 mb-6 w-full  rounded-lg bg-[#182D39] text-[#596C7A] pl-6' {...register('email', { required: 'Email cannot be Empty', pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Enter a proper Email' } })} />
                                            <p className='text-red-500 font-[8px] mb-3 pl-3'>{errors.email?.message}</p>


                                            <button className='bg-[#0F213E] h-12 w-[50%] rounded-lg text-white text-xl' onClick={handleSubmit(onSubmit)}>Send Otp</button>
                                        </div>



                                        :
                                        < div className=' '>
                                            <div className='flex gap-3'>
                                                <div>
                                                    <input type="password" name='password' placeholder='New Password' className='h-12 mb-6 rounded-lg bg-[#182D39] text-[#596C7A] pl-6' {...register('password', { required: 'Password Required', pattern: { value: /^(?=.*[a-zA-Z]).{8,}$/, message: 'Enter a Proper Password' } })} />
                                                    <p className='text-red-500 font-[8px] mb-3 pl-3'>{errors.password?.message}</p>
                                                </div>
                                                <div>
                                                    <input type="password" name='Cpassword' placeholder='Confirm Password' className='h-12 mb-6 rounded-lg bg-[#182D39] text-[#596C7A] pl-6' {...register('Cpassword', { required: 'Password Required', pattern: { value: /^(?=.*[a-zA-Z]).{8,}$/, message: 'Enter a Proper Password' } })} />
                                                    <p className='text-red-500 font-[8px] mb-3 pl-3'>{errors.Cpassword?.message}</p>
                                                </div>
                                            </div>
                                            <button className='bg-[#0F213E] h-12 w-[50%] rounded-lg text-white text-xl' onClick={handleSubmit(doReset)}>Reset Password</button>
                                        </div>


                                    }
                                </div>
                            </form>
                            {/* <input type="text" name='email' placeholder='Username or Email' className='h-12 w-[30rem]' /> */}
                        </div>
                        {
                            OtpModal ?
                                <div className=" absolute w-full h-full backdrop-blur-sm  py-20 px-3 flex items-center">

                                    <div className="container mx-auto">
                                        <div className="max-w-sm mx-auto md:max-w-lg">
                                            <div className="w-full">
                                                <div className="bg-gradient-to-r from-blue-400 to-white h-64 py-3 rounded text-center">
                                                    <h1 className="text-2xl font-bold">OTP Verification</h1>
                                                    <div className="flex flex-col mt-4">
                                                        <span>Enter the OTP you received at</span>
                                                        <span className="font-bold"></span>

                                                    </div>
                                                    <div className=' flex justify-center pt-2'>

                                                        {/* <Countdown date={Date.now() + 100000} /> */}


                                                        {/* <Countdown date={Date.now() + 100000} /> */}
                                                    </div>
                                                    <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                                                        {/* <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" />
                                                        <input className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" /> */}
                                                        <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                                                    </div>
                                                    <p className='text-red-500 font-[8px] mb-3 pl-3'>{OtpError}</p>

                                                    <div className="flex justify-center text-center mt-5">


                                                        {/* <button className='flex items-center text-purple-500 hover:text-white hover:bg-purple-500 cursor-pointer font-bold bg-white rounded-lg pl-2 pr-2 ' >Resend</button> */}
                                                        <button className='flex items-center text-green-500 hover:text-white hover:bg-green-500 cursor-pointer font-bold bg-white rounded-lg pl-2 pr-2 ' onClick={(e) => { onVerify(e) }}>Verify</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }



                        {loader ?
                            
                        <div className=" absolute w-full h-full backdrop-blur-sm    flex items-center justify-center">

                            <LoadingOverlay
                                active={isActive}
                                spinner
                                text='Please Wait !'
                            >
                                
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

                            </LoadingOverlay>
                        </div>
                        : ""
                        }


                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword