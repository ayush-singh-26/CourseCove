import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdInsertChartOutlined } from "react-icons/md";
import { GoBook } from "react-icons/go";

function Sidebar() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-[250px] bg-gray-100 p-5">
        <NavLink to="/admin/dashboard" className="mb-2 flex">
          <MdInsertChartOutlined />
          Dashboard
        </NavLink>
        <NavLink to="/admin/course" className="flex">
          <GoBook />
          Courses
        </NavLink>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-5 bg-white">
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;
