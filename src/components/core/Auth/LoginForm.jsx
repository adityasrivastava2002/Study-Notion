import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {email, password} = formData

    const [showPassword, setShowPassword] = useState(false)

    const handleOnChange = (e) => {
        setFormData((prevData)=>({...prevData,[e.target.name]: e.target.value}))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }
  return (
    <div className='mt-4 flex flex-col justify-center gap-y-6'>
        {/* login form */}
        <form 
        onSubmit={handleOnSubmit}
        className='mt-2 md:mx-0 flex flex-col gap-y-3 '>
            <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder='Enter email address'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
            </label>
            <label className='relative'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password
                </p>
                <input
                    required
                    name="password"
                    value={password}
                    placeholder='Enter password'
                    type={showPassword ? 'text' : 'password'}
                    onChange={handleOnChange}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
                <span
                    onClick={()=>setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] cursor-pointer"
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
                <Link to="/forgot-password">
                    <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button 
            type="submit"
            className='mt-6 font-medium text-richblack-900 bg-yellow-50 rounded-md p-[12px]'>
                Sign In
            </button>
        </form>
    </div>
  )
}

export default LoginForm