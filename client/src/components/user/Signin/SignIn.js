import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import './SignIn.css'
import axios from '../../../Axios/axios'
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../../../Redux/UserSlice';

function SignIn() {
  
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const { register, handleSubmit, formState: { errors } } = useForm()
  const [Error, setError] = useState('')

  useEffect(() => {
    userAuthenticeted()
}, [])

const userAuthenticeted = () => {
    axios.get("/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("Usertoken"),
        },
    }).then((response) => {
        if (response.data.auth) navigate('/')
        else navigate('/login')
    });
};

  const onSubmit = (data) => {
    console.log(data);
    axios.post('/login', data).then((response) => {
      console.log(response);
      if (!response.data.log) {
        setError(response.data.message)
      }else{
        localStorage.setItem("Usertoken", response.data.token)
        localStorage.setItem('User',JSON.stringify(response.data.User))
        dispatch(login(response.data.User))

        navigate('/')
      }
    })
  }
  return (

    <div className='loginpage relative'>
      <div className='bg'>
        <div className='grad flex items-center  absolute top-0 left-0'>
          <div className=' md:w-[35%] p-7 md:ml-[3rem]'>
            <h3 className='text-white text-lg pb-4 '>START  FOR  FREE</h3>
            <h1 className='text-white text-5xl'>Login To
              Your Account <span className='text-blue-600'>.</span></h1>
            <p className='text-white pt-10 pb-10'>Create new account <Link to={'/register'} className='text-blue-600'>Sign Up</Link></p>
            <p className='text-red-500 font-[8px] mb-3 pl-3'>{Error}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col'>
                <input type="text" name='email' placeholder=' Email' className='h-12 mb-6  rounded-lg bg-[#182D39] text-[#596C7A] pl-6'{...register('email', { required: 'Email cannot be Empty', pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Enter a proper Email' } })} />
                <p className='text-red-500 font-[8px] mb-3 pl-3'>{errors.email?.message}</p>

                <input type="password" name='password' placeholder='Password' className='h-12 mb-6 rounded-lg bg-[#182D39] text-[#596C7A] pl-6' {...register('password', { required: 'Password Required', pattern: { value: /^(?=.*[a-zA-Z]).{8,}$/, message: 'Enter a Proper Password' } })} />
                <p className='text-red-500 font-[8px] mb-3 pl-3'>{errors.password?.message}</p>

                <button className='bg-[#0F213E] h-12 w-[50%] rounded-lg text-white text-xl'>LOGIN</button>
                <Link to={'/forgotPassword'} className='text-blue-600 p-2'>Forgot Password ?</Link>
              </div>
            </form>
            {/* <input type="text" name='email' placeholder='Username or Email' className='h-12 w-[30rem]' /> */}
          </div>
        </div>
      </div>
    </div>

  )
}

export default SignIn