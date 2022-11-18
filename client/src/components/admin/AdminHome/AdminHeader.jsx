import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


function AdminHeader() {
    const navigate = useNavigate()

    const logout = () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            // denyButtonText: `Don't save`,
        }).then((result) => {

            if (result.isConfirmed) {
                Swal.fire('LOGGED OUT!', 'C U AGAIN', 'success')
                // } else if (result.isDenied) {
                //   Swal.fire('Changes are not saved', '', 'info')
            // localStorage.removeItem('adminToken');
        navigate("/adminlogin");
            }
        })
       
    };
    return (
        <div>
            <nav className='flex justify-between pr-5  h-16 place-items-center bg-dark-purple '>
                <div className='text-2xl  font-bold ml-6 text-center'>
                    <h2 className='text-white '>MEET NOW</h2>
                </div>
              
                <div >
                    <button onClick={logout} className='text-bluebg-blue-900 bg-white text-md h-6 w-24 rounded-lg '>
                        LOGOUT
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default AdminHeader