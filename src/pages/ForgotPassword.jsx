import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'
import {FaArrowLeftLong} from "react-icons/fa6"

const ForgotPassword = () => {
    const {loading} = useSelector((state)=>state.auth)
    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")

    const dispatch = useDispatch()

   function submitHandler(e){
        e.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSent))
    }
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div className='mx-auto w-11/12 max-w-[450px] md:mx-0 md:flex-row md:gap-y-0 md:gap-x-12'>
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {
                            !emailSent ? "Reset Your Password" : "Email Sent"
                        }
                    </h1>
                    <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        {
                            !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                        }
                    </p>
                    <form 
                    onSubmit={submitHandler}
                    className="mt-2 md:mx-0 flex flex-col gap-y-3">
                        {
                            !emailSent && (
                                <label>
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
                                    <input
                                        required
                                        name='email'
                                        type='email'
                                        placeholder='Enter Your Email Address'
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                    />
                                </label>
                            )
                        }
                        <button type='submit' className='mt-6 font-medium text-richblack-900 bg-yellow-50 rounded-md p-[12px]'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>
                    <div className='mt-4 text-richblack-5 flex items-center gap-x-2'>
                    <FaArrowLeftLong />
                        <Link to={"/login"}>
                            Back to login
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword