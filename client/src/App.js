
import './App.css';
import { Route, Router, Link, Routes } from 'react-router-dom'
import Siginin from './pages/user/Signin/Signin'
import Signup from './pages/user/SignUp/Signup';
import Home from './pages/user/Home/Homepage'
import AdminLogin from './components/admin/AdminLogin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import UserList from './components/admin/AdminHome/UserList';
import { AppContext } from './Context/Context'
import { useState } from 'react';
import Post from './pages/user/Post/Post'
import UserProfile from './pages/user/Profile/UserProfile';
import Forgot from './pages/user/Forgot/Forgot';
import GoOthersProfile from './pages/user/SearchUser/GoOthersProfile';
import Test from './pages/Test';
import UserChat from './pages/user/Conversation/UserChat';

function App() {

  const [ShowPostModal, setShowPostModal] = useState(false)
  return (
    <>
      <AppContext.Provider value={{ShowPostModal, setShowPostModal}}>
        <Post/>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Siginin />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/forgotPassword' element={<Forgot/>} />
          <Route path='/userProfile' element={<UserProfile/>}/>
          <Route path='/searchProfile' element={<GoOthersProfile/>}/>
          <Route path='/Chat' element={<UserChat/>}/>
          <Route path='/test' element={<Test/>}/>

          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/admin' element={<AdminHome />}>
            <Route path='/admin/User_list' element={<UserList />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
