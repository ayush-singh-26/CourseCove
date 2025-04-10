import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdInsertChartOutlined, MdOutlineDashboard } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";

function Sidebar() {
  const user=useSelector(store=>store.auth?.user?.data)  

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className="w-64 bg-white shadow-md p-5 border-r border-gray-200">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
        </div>
        
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition-colors ${isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-100'}`
              }
            >
              <MdOutlineDashboard className="mr-3 text-lg" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/course" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition-colors ${isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-100'}`
              }
            >
              <GoBook className="mr-3 text-lg" />
              <span>Courses</span>
            </NavLink>
          </li>
        </ul>
        
        <div className="mt-auto pt-5 border-t border-gray-200">
          <div className="flex items-center p-3 text-gray-600">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <span className="text-indigo-600 text-sm font-medium">AD</span>
            </div>
            <div>
              <p className="text-sm font-medium">{user?.fullname}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;