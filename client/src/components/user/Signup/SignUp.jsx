import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../Axios/axios'
import { useForm } from 'react-hook-form'
import OTPInput, { ResendOTP } from "otp-input-react";
import '../Signin/SignIn.css'
import Countdown from 'react-countdown';



function SignUp() {

    // const [InitialValues, setInitialValues] = useState({ fname: '', lname: '', email: '', password: '' })
    // const [formValues, setformValues] = useState(InitialValues)

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [Errors, setErrors] = useState('')
    const [OtpModal, setOtpModal] = useState(false)
    const [OTP, setOTP] = useState('');
    const [UserDetails, setUserDetails] = useState({})
    const [OtpError, setOtpError] = useState('')
    const navigate = useNavigate()
    const [Resend, setResend] = useState(false)
    // const handleChange = (e) => {
    //     const { name, value } = e.target
    //     setformValues({ ...formValues, [name]: value })
    // }
    // const handleOTP = (e)=>{
    //     console.log("target");
    //     console.log(e);
    //     // const {name,value}= e.target
    //     // setOTP({...OTP,[name]:value})
    // }

    // const handleSubmit = ()=>{
    //     console.log(formValues);
    //     axios.post('/create_user',{...formValues}).then((data)=>{
    //         console.log("hghdhd")
    //     })
    // }

    useEffect(() => {
        userAuthenticeted()
    }, [])

    const userAuthenticeted = () => {
        axios.get("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("Usertoken"),
            },
        }).then((response) => {
            console.log("response");
            console.log(response);
            if (response.data.auth) {

                navigate('/')
            }
            else navigate('/register')
        });
    };

    const onSubmit = (userData) => {
        console.log("data");
        console.log(userData);
        axios.post('/create_user', userData).then((response) => {

            console.log(response);
            if (response.data.message) {

                setErrors(response.data.message)
            } else {
                console.log(response.data);
                setUserDetails(response.data.user)
                setOtpModal(true)
                setTimeout(() => {
                    console.log("Delayed for 1 second.");
                    setResend(true)
                }, "100000")

            }
        })
    }
    const onVerify = (e) => {
        e.preventDefault()
        console.log(UserDetails);
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
                    navigate('/login')
                }
                setOtpError(response.data.msg)
            })
        }
    }
    const resendOtp = ()=>{
        axios.post('/resendOTP',UserDetails).then((response)=>{
            setResend(!Resend)
            setTimeout(() => {
                console.log("Delayed for 1 second.");
                setResend(true)
            }, "100000")
        })
    }
    return (
        <>
            <div className='loginpage relative'>
                <div className='bg relative'>
                    <div className='grad flex items-center  absolute top-0 left-0'>
                        <div className=' md:w-[40%] p-7 md:ml-[3rem]'>
                            <h3 className='text-white text-lg pb-4'>START  FOR  FREE</h3>
                            <h1 className='text-white text-5xl'>Create new account<span className='text-blue-600'>.</span></h1>

                            <p className='text-white pt-10 pb-10'>Already A Member ? <Link to={'/login'} className='text-blue-600'>Log In</Link></p>
                            <p className='text-red-500 font-[8px] mb-3 pl-3'>{Errors}</p>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row  '>
                                        <div className='w-1/2 mr-2'>
                                            <input type="text" name='fname' placeholder='Full Name' className='h-12 mb-6  rounded-lg bg-[#182D39] text-[#596C7A] pl-6 w-full'  {...register('fname', { required: 'Required', pattern: { value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/, message: 'Enter a Valid First name' } })} />
                                            <p className='text-red-500 font-[8px] mb-3 pl-3'>{errors.fname?.message}</p>
                                        </div>
                                        <div className='w-1/2'>
                                            <input type="text" name='lname' placeholder='User Name' className='h-12 mb-6  rounded-lg bg-[#182D39] text-[#596C7A] pl-6  w-full' {...register('lname', { required: 'Required' , pattern: { value:/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/, message: 'Enter a Valid User name for example User_s' }  })} />
                                            <p className='text-red-500 font-[8px] mb-3 pl-3'>{errors.lname?.message}</p>

                                        </div>
                                    </div>
                                    <input type="text" name='email' placeholder='Username or Email' className='h-12 mb-6  rounded-lg bg-[#182D39] text-[#596C7A] pl-6'  {...register('email', { required: 'Required', pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Enter a valid email' } })} />
                                    <p className='text-red-500 font-[8px] mb-3 pl-3'>{errors.email?.message}</p>

                                    <input type="password" name='password' placeholder='Password' className='h-12 mb-6 rounded-lg bg-[#182D39] text-[#596C7A] pl-6'   {...register('password', { required: 'Required', pattern: { value: /^(?=.*[a-zA-Z]).{8,}$/, message: 'Enter a valid password' } })} />
                                    <p className='text-red-500 font-[8px] mb-3 pl-3'>{errors.password?.message}</p>

                                    <button className='bg-transparent border-2 h-12 w-[50%] rounded-lg text-white text-xl'>SIGN UP</button>

                                </div>
                                {/* <input type="text" name='email' placeholder='Username or Email' className='h-12 w-[30rem]' /> */}
                            </form>
                        </div>



                        {
                            OtpModal ?
                                <div className=" absolute w-full h-full backdrop-blur-sm  py-20 px-3 flex items-center">

                                    <div className="container mx-auto">
                                        <div className="max-w-sm mx-auto md:max-w-lg">
                                            <div className="w-full">
                                                <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-64 py-3 rounded text-center">
                                                    <h1 className="text-2xl font-bold">OTP Verification</h1>
                                                    <div className="flex flex-col mt-4">
                                                        <span>Enter the OTP you received at</span>
                                                        <span className="font-bold">{UserDetails.email}</span>

                                                    </div>
                                                    <div className=' flex justify-center pt-2'>
                                                        {
                                                            Resend ?
                                                                <button className='flex items-center text-purple-500 hover:text-white hover:bg-purple-500 cursor-pointer font-bold bg-white rounded-lg pl-2 pr-2 ' onClick={resendOtp} >Resend</button>
                                                                : <Countdown date={Date.now() + 100000} />

                                                        }
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
                                                                 <button className='flex items-center text-green-500 hover:text-white hover:bg-green-500 cursor-pointer font-bold bg-white rounded-lg pl-2 pr-2 ' onClick={(e) => onVerify(e)}>Verify</button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default SignUp