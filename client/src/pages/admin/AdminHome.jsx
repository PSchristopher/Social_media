import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminHeader from '../../components/admin/AdminHome/AdminHeader'
import AdminNavbar from '../../components/admin/AdminHome/AdminNavbar'

function AdminHome() {
    const navigate = useNavigate()
    return (
        <div className='flex'>

            <AdminNavbar />
            <div className='flex-1' >
                <AdminHeader />
                <div className='p-8'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminHome