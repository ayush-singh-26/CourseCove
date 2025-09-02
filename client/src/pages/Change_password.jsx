import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useChangePasswordMutation } from '../Feature/api/authApi';
import Loading_spinner from '../components/Loader/Loading_spinner'
import { toast } from "react-toastify";
const Change_password = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [changePassword,{
        data: changePasswordData,
        error: changePasswordError,
        isLoading: changePasswordIsLoading,
        isSuccess: changePasswordIsSuccess
    }] =useChangePasswordMutation();



    const onSubmit = async(data) => {
        console.log(data);
        
        await changePassword(data);
    }

    useEffect(()=>{
        if(changePasswordIsSuccess){
            toast.success(changePasswordIsSuccess.message || 'Password changed successfully')
        }
        if(changePasswordError){            
            toast.error(changePasswordError?.data.message || "Error occurred while changing password")
        }
     },[changePasswordData, changePasswordError, changePasswordIsSuccess])
    
    return (
        <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
                <div className="w-full">
                    <p>Current Password:</p>
                    <input
                        type="password"
                        placeholder="Enter your current password"
                        {...register('oldPassword', {
                            required: "Enter your current password",
                        })}
                        className="border border-zinz-300 rounded w-full p-2 mt-1"
                    />
                    {errors.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}
                </div>
                <div className="w-full">
                    <p>New Password:</p>
                    <input
                        type="password"
                        placeholder="Enter your new password"
                        {...register('newPassword', {
                            required: "Enter your new password",
                        })}
                        className="border border-zinz-300 rounded w-full p-2 mt-1"
                    />
                    {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
                </div>


                <button className="bg-primary text-white w-full py-2 rounded-md text-base">
                    {changePasswordIsLoading? (<Loading_spinner/>): 'Change Password'}
                </button>
            </div>
        </form>
    )
}

export default Change_password
