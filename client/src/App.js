
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
        </Routes>
      </AppContext.Provider>

      <Routes>

        <Route path='/adminlogin' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminHome />}>
          <Route path='/admin/User_list' element={<UserList />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
