import { assets } from "../../assets/assets";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../Feature/api/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [userData, setUserData] = useState(false);
    const user = useSelector((store) => store.auth.user?.data)


    const [logout, {
        isSuccess: logoutIsSuccess,
        error: logoutError
    }] = useLogoutUserMutation();



    useEffect(() => {
        if (logoutIsSuccess) {
            toast.success('User logged out');
        }
        if (logoutError) {
            console.log(logoutError);

            toast.error('Something went wrong during logout');
        }
    }, [logoutIsSuccess, logoutError]
    )
    return (
        <div className="flex items-center justify-between text-sm py-4 border-b border-b-gray-400">
            <h2 className="text-4xl text-purple-500 cursor-pointer">CourseCove</h2>

            <div className="flex items-center gap-4">
                {
                    user ?
                        <div className="flex items-center gap-2 cursor-pointer group relative">
                            <img className="w-8 rounded-full" src={user.avatar} alt="" />
                            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                    <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">My Profile</p>
                                    <p onClick={() => navigate('/my-courses')} className="hover:text-black cursor-pointer">My Courses</p>
                                    <p onClick={() => navigate('/change-password')} className="hover:text-black cursor-pointer">Change Password</p>
                                    <p onClick={() => logout()} className="hover:text-black cursor-pointer">Logout</p>
                                </div>
                            </div>
                        </div> :
                        <button onClick={() => navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block" >CREATE ACCOUNT</button>

                }
                <img className="w-6 md:hidden" onClick={() => setShowMenu(true)} src={assets.menu_icon} alt="" />
                {/* mobile menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className="flex items-center justify-between px-5 py-6">
                        <h2>E-learning</h2>
                        <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
