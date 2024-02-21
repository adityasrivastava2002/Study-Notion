import React, { useEffect, useState } from 'react'
import {FaArrowLeftLong, FaClockRotateLeft} from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import OTPInput from 'react-otp-input'
import { sendOtp, signUp } from '../services/operations/authAPI'

const VerifyEmail = () => {
    const {loading, signupData} = useSelector((state)=>state.auth)
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!signupData){
            navigate("/signup")
        }
    },[])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData
        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate))
    }
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
    {
        loading ? (
            <div>Loading...</div>
        ) : (
            <div className='mx-auto w-11/12 max-w-[450px] md:mx-0 md:flex-row md:gap-y-0 md:gap-x-12'>
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                    Verify email
                </h1>
                <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                    A verification code has been sent to you. Enter the code below
                </p>
                <form 
                onSubmit={handleOnSubmit}
                className="mt-2 md:mx-0 flex flex-col gap-y-3">
                    <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} 
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[18px] text-center text-richblack-5"/>}
                    />
                    <button type='submit' className='mt-6 font-medium text-richblack-900 bg-yellow-50 rounded-md p-[12px]'>
                        Verify email
                    </button>
                </form>
                <div className='mt-4 text-richblack-5 flex justify-between'>
                    <div className='flex items-center gap-x-2'>
                        <FaArrowLeftLong />
                        <Link to={"/login"}>
                            Back to login
                        </Link>
                    </div>
                    <div className='flex items-center gap-x-2 text-blue-100'>
                        <FaClockRotateLeft />
                        <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>Resend it</button>
                    </div>
                </div>
            </div>
        )
    }
    </div>
  )
}

export default VerifyEmail