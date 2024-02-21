import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setSignupData } from '../../../Redux/slices/authSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { sendOtp } from '../../../services/operations/authAPI';
import Tab from "../../common/Tab"

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const tabData = [
        {
            id:1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id:2,
            tabName: "Instructor",
            type:ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]
    
     const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
     })

    const {firstName, lastName, email, password, confirmPassword} = formData

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(password!==confirmPassword){
            toast.error("Password do not match")
            return
        }
        const signupData = {
            ...formData,
            accountType
        }

        // setting signup data to state for otp verification
        dispatch(setSignupData(signupData))
        dispatch(sendOtp(formData.email, navigate))
        // reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }
  return (
    <div className='w-[100%] items-center flex justify-center flex-col'>
        {/* tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
        {/* form data */}
        <form 
        onSubmit={handleOnSubmit}
        className='md:mx-0 flex flex-col gap-y-3 '>
            <div className='flex gap-x-3'>
                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        First Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleOnChange}
                        placeholder='Enter first name'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>
                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Last Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                        placeholder='Enter last name'
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>
            </div>
            
            <label>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
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
                    Password <sup className="text-pink-200">*</sup>
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
            </label>
            <label className='relative'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Confirm Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder='Enter confirm password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    onChange={handleOnChange}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
                <span
                    onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-[38px] cursor-pointer"
                >
                    {showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
            </label>
            <button 
            type="submit"
            className='mt-6 font-medium text-richblack-900 bg-yellow-50 rounded-md p-[12px]'>
                Sign Up
            </button>
        </form>
    </div>
  )
}

export default SignupForm