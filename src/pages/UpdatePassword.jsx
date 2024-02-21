import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import {FaArrowLeftLong} from 'react-icons/fa6'

const UpdatePassword = () => {
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const {loading} = useSelector((state)=>state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleOnSubmit (e) {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(newPassword, confirmNewPassword, token, navigate))
    }
  return (
    <div className='min-h-[calc(100vh-3.5rem)] mx-auto w-11/12 max-w-[450px] flex items-center'>
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div className='text-richblack-5 flex-col'>
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose New Password</h1>
                <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">Almost done. Enter your new password and youre all set.</p>
                <form 
                onSubmit={handleOnSubmit}
                className="mt-2 md:mx-0 flex flex-col gap-y-3">
                    <label className='relative'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
                        <input
                            required
                            name="newPassword"
                            type={showNewPassword ? 'text' : "password"}
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            placeholder='Enter New Password'
                            style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                        <span
                            onClick={()=>setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-[38px] cursor-pointer"
                        >
                            {showNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                    <label className='relative'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password <sup className="text-pink-200">*</sup></p>
                        <input
                            required
                            name="confirmNewPassword"
                            type={showConfirmNewPassword ? 'text' : "password"}
                            value={confirmNewPassword}
                            onChange={(e)=>setConfirmNewPassword(e.target.value)}
                            placeholder='Enter email address'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                        <span
                            onClick={()=>setShowConfirmNewPassword(!showConfirmNewPassword)}
                            className="absolute right-3 top-[38px] cursor-pointer"
                        >
                            {showConfirmNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                    <button type='submit' className='mt-6 font-medium text-richblack-900 bg-yellow-50 rounded-md p-[12px]'>
                        Reset Password
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

export default UpdatePassword