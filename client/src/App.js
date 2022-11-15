
import './App.css';
import { Route, Router, Link, Routes } from 'react-router-dom'
import Siginin from './pages/user/Signin/Signin'
import Signup from './pages/user/SignUp/Signup';
import Home from './pages/user/Home/Homepage'
import AdminLogin from './components/admin/AdminLogin';
function App() {
  return (
    <div>


      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Siginin />} />
        <Route path='/register' element={<Signup />} />

      </Routes>
      <Routes>
        <Route path='/adminlogin' element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
