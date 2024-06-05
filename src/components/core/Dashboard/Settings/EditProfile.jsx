import React from 'react'
import { updateAdditionalDetails } from '../../../../services/operations/settingsAPI'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import IconBtn from '../../../common/IconBtn'

const EditProfile = () => {
    const{user} = useSelector((state)=>state.profile)
    const{token} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // form data
    const [formData, setFormData] = useState({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        dateOfBirth: user?.additionalDetails?.dateOfBirth ?? "",
        gender: user?.additionalDetails?.gender ?? "",
        contactNumber: user?.additionalDetails?.contactNumber ?? "",
        about: user?.additionalDetails?.about ?? "",
    })

    const {firstName, lastName, dateOfBirth, gender, contactNumber, about} = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        dispatch(updateAdditionalDetails(token, dateOfBirth, about, contactNumber, gender))
    }

  return (
    <form onSubmit={handleOnSubmit}>
            <div className='bg-richblack-800 flex flex-col rounded-md border border-richblack-700
            p-8 my-6 gap-x-6 gap-y-4'>
                <h1 className='font-semibold text-lg'>
                    Profile Information
                </h1>
                <div className='flex gap-x-4 max-md:flex-col  max-md:gap-4'>
                    <div className='md:w-[50%] flex flex-col gap-y-4'>
                        {/* firstname */}
                        <label htmlFor='firstName'>
                            <p>First Name</p>
                            <input
                                name='firstName'
                                type='text'
                                readOnly
                                defaultValue={user?.firstName}
                                placeholder='Enter Your First Name'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 w-full"
                            />
                        </label>
                        {/* date of birth */}
                        <label htmlFor='dateOfBirth'>
                            <p>Date Of Birth</p>
                            <input
                                name='dateOfBirth'
                                type='date'
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                                placeholder='Enter Your Date of Birth'
                                onChange={handleOnChange}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 w-full"
                            />
                        </label>
                        {/* contact number */}
                        <label htmlFor='contactNumber'>
                            <p>Contact Number</p>
                            <input
                                name='contactNumber'
                                type='tel'
                                defaultValue={user?.additionalDetails?.contactNumber}
                                placeholder='Enter Your Contact Number'
                                onChange={handleOnChange}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 w-full"
                            />
                        </label>
                    </div>
                    <div className='md:w-[50%] flex flex-col gap-y-4'>
                        {/* lastname */}
                        <label htmlFor='lastName'>
                            <p>Last Name</p>
                            <input
                                name='lasttName'
                                type='text'
                                readOnly
                                defaultValue={user?.lastName}
                                placeholder='Enter Your Last Name'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 w-full"
                            />
                        </label>
                        {/* gender */}
                        <label htmlFor='gender'>
                            <p>Gender</p>
                            <select
                                name='gender'
                                type='text'
                                defaultValue={user?.additionalDetails?.gender}
                                placeholder='Enter Your Gender'
                                onChange={handleOnChange}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-[0.5rem] bg-richblack-700 p-[12px] mb-1.5 text-richblack-5 w-full"
                            >
                                <option disabled>Choose Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </label>
                        {/* about */}
                        <label htmlFor='about'>
                            <p>About</p>
                            <input
                                name='about'
                                type='text'
                                defaultValue={user?.additionalDetails?.about}
                                placeholder='Write Something About Yourself'
                                onChange={handleOnChange}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5 w-full"
                            />
                        </label>
                    </div>
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
                    Save
                </button>
            </div>
        </form>
  )
}

export default EditProfile