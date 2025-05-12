import { assets } from "../../assets/assets";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../Feature/api/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RoleProtectedRoute } from "./ProtectedRoutes";

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [userData, setUserData] = useState(null);
    const user = useSelector((store) => store.auth.user)
    console.log(userData);



    const [logout, {
        isSuccess: logoutIsSuccess,
        error: logoutError
    }] = useLogoutUserMutation();

    useEffect(() => {
        if (user?.data) {
            setUserData(user?.data)
        }
    }, [user])

    useEffect(() => {
        if (logoutIsSuccess) {
            toast.success('User logged out');
        }
        if (logoutError) {
            toast.error('Something went wrong during logout');
        }
    }, [logoutIsSuccess, logoutError])

    return (
        <div className="flex items-center justify-between py-3 px-4 sm:px-6 border-b border-gray-300">
            <a href="/" className="text-3xl sm:text-3xl font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                CourseCove
            </a>

            <div className="flex items-center gap-4 sm:gap-6">
                {
                    userData ?
                        <div className="flex items-center gap-2 cursor-pointer group relative">
                            <img className="w-8 rounded-full" src={userData?.avatar} alt="" />
                            <img className="w-2.5 hover:rotate-180" src={assets.dropdown_icon} alt="" />
                            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                    <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                                    <p onClick={() => navigate('/my-learning')} className="hover:text-black cursor-pointer">My Learning</p>
                                    <RoleProtectedRoute roles={['Admin', 'Instructor']}>
                                        <p onClick={() => navigate('/admin')} className="hover:text-black cursor-pointer">Admin</p>
                                    </RoleProtectedRoute>

                                    <p onClick={() => navigate('/change-password')} className="hover:text-black cursor-pointer">Change Password</p>
                                    <p onClick={() => logout()} className="hover:text-black cursor-pointer">Logout</p>
                                </div>
                            </div>
                        </div> :
                        <button onClick={() => navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block" >CREATE ACCOUNT</button>
                }
            </div>
        </div >
    );
};

export default Navbar;
