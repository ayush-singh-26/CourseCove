import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex h-full'>
        <Sidebar/>
        <div className='flex-1 p-4 md:px-10 h-full'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
