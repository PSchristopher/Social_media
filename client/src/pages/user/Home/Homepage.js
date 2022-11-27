import React, {useEffect} from 'react'
import Home from '../../../components/user/Home/Home'
import axios from '../../../Axios/axios';
import { useNavigate } from 'react-router-dom'


function Homepage() {
  const navigate = useNavigate()

  const userAuthenticeted = () => {
    axios.get("/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("Usertoken"),
        },
    }).then((response) => {
      console.log('response');
      console.log(response);
        if (response.data.auth == false) {
          navigate('/login')
        }
        else   navigate('/')
    });
};

useEffect(() => {
  userAuthenticeted()
}, [])

  return (
    <div className=''>
        <Home/>
    </div>
  )
}

export default Homepage