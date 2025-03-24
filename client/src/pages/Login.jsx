/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginUserMutation, useRegisterUserMutation } from "../Feature/api/authApi";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [state, setState] = useState('Sign Up');

  

  

  return (

    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit()}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'Login'} to book appointment</p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <p>Full Name:</p>
            <input
              type="text"
              placeholder="Enter your name"
              {...register('fullname', {
                required: "Enter your Full name",
              })}
              className="border border-zinz-300 rounded w-full p-2 mt-1"
            />
            {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
          </div>
        )}

        <div className="w-full">
          <p>Email:</p>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: "Enter your email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
            className="border border-zinz-300 rounded w-full p-2 mt-1"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="w-full">
          <p>Password:</p>
          <input
            type="password"
            placeholder="Enter your Password"
            {...register('password', {
              required: "Enter your password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="border border-zinz-300 rounded w-full p-2 mt-1"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>


        <button
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <span onClick={() => setState('Login')} className="text-primary underline cursor-pointer">
              Login
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center">
            Dont have an account?{" "}
            <span onClick={() => setState('Sign Up')} className="text-primary underline cursor-pointer">
              Sign Up
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
