import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../components/common/IconBtn'
import {FaRegEdit} from "react-icons/fa"

const MyProfile = () => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate()
  return (
    <div className='text-richblack-5 w-[85%] mx-auto'>
        <h1 className='text-3xl pb-6'>
            My Profile
        </h1>
            {/* section 1 */}
        <div className='bg-richblack-800 flex justify-between rounded-md border border-richblack-700 items-center
        p-8 my-6'>
            <div className='flex items-center justify-center gap-x-4'>
                <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[78px] rounded-full object-cover'
                />
                <div>
                    <p className='font-semibold text-lg'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-richblack-300'>{user?.email}</p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-x-2 bg-yellow-50 text-richblack-900 px-4 py-1 rounded-md'>
                <FaRegEdit />
                <IconBtn
                    text={"Edit"}
                    onclick={()=>navigate("/dashboard/settings")}
                />
            </div>
            
        </div>

        {/* section 2 */}
        <div className='bg-richblack-800 flex justify-between rounded-md border border-richblack-700
        p-8 my-6 flex-col gap-y-2'>
            <div className='flex justify-between'>
                <p className='font-semibold text-lg'>About</p>
                <div className='flex items-center justify-center gap-x-2 bg-yellow-50 text-richblack-900 px-4 py-1 rounded-md'>
                    <FaRegEdit />
                    <IconBtn
                        text={"Edit"}
                        onclick={()=>navigate("/dashboard/settings")}
                    />
                </div>  
            </div>
            <p className='text-richblack-300'>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</p>
        </div>

        {/* section 3 */}
        <div className='bg-richblack-800 flex flex-col justify-between rounded-md border border-richblack-700
        p-8 my-6 gap-y-2'>
            <div className='flex justify-between'>
                <p className='font-semibold text-lg'>Personal Details</p>
                <div className='flex items-center justify-center gap-x-2 bg-yellow-50 text-richblack-900 px-4 py-1 rounded-md'>
                    <FaRegEdit />
                    <IconBtn
                        text={"Edit"}
                        onclick={()=>navigate("/dashboard/settings")}
                    />
                </div>
            </div>
            <div className='flex w-full'>
                <div className='w-[50%] flex flex-col gap-y-5'>
                    <div>
                        <p className='text-richblack-300'>First Name</p>
                        <p>{user?.firstName}</p>
                    </div>
                    <div>
                        <p className='text-richblack-300'>Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <p className='text-richblack-300'>Gender</p>
                        <p>{user?.additionalDetails?.gender}</p>
                    </div>
                </div>
                <div className='w-[50%] flex flex-col gap-y-5'>
                    <div>
                        <p className='text-richblack-300'>Last Name</p>
                        <p>{user?.lastName}</p>
                    </div>
                    <div>
                        <p className='text-richblack-300'>Phone Number</p>
                        <p>{user?.additionalDetails?.contactNumber}</p>
                    </div>
                    <div>
                        <p className='text-richblack-300'>Date Of Birth</p>
                        <p>{user?.additionalDetails?.dateOfBirth}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile