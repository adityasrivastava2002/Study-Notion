import React, { useState } from 'react'
import {AiOutlineEyeInvisible, AiOutlineEye} from "react-icons/ai"
import IconBtn from '../../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../../../services/operations/settingsAPI'
import { useDispatch, useSelector } from 'react-redux'

const UpdatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {token} = useSelector((state)=>state.auth)
    const [formData, setFormData] = useState({
        currentPassword:"",
        newPassword:"",
    })

    const {currentPassword, newPassword} = formData
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const handleOnChange = (e) => {
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name] : e.target.value
        }))
    }

    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault()
            await changePassword(token, {...formData, oldPassword:formData.currentPassword, confirmPassword:formData.newPassword })
        } catch (error) {
            console.log("Error message - ",error)
        }
    }
  return (
    <form onSubmit={handleOnSubmit}>
        <div className='bg-richblack-800 flex flex-col rounded-md border border-richblack-700
        p-8 my-6 gap-x-6 gap-y-4'>
        <h1 className='font-semibold text-lg'>Password</h1>
            <div className='flex gap-x-4 w-full'>
                <label htmlFor='currentPassword' className='w-full relative'>
                    <p>Current Password</p>
                    <input
                        required
                        name='currentPassword'
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder='Enter Current Password'
                        onChange={handleOnChange}
                        value={currentPassword}
                        style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 w-full"
                    />
                    <span
                        onClick={()=>setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-[38px] cursor-pointer"
                    >
                        {showCurrentPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                </label>
                <label htmlFor='newPassword' className='w-full relative'>
                    <p>New Password</p>
                    <input
                        required
                        name='newPassword'
                        type={showNewPassword ? "text" : "password"}
                        placeholder='Enter New Password'
                        onChange={handleOnChange}
                        value={newPassword}
                        style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 w-full"
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
            </div>
        </div>
        <div className='flex gap-x-3 justify-end'>
                <span className='bg-richblack-700 text-richblack-50 px-3 py-1 rounded-md'>
                    <IconBtn
                        text="Cancel"  
                        onclick={()=>navigate("/dashboard/my-profile")}
                    />
                </span>
                <button 
                className='bg-yellow-50 text-richblack-900 px-3 py-1 rounded-md'
                type='submit'>
                    Update
                </button>
            </div>
    </form>
  )
}

export default UpdatePassword