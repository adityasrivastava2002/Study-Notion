import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { submitContactForm } from '../../../services/operations/contactFormAPI'
import countryCode from "../../../data/countrycode.json"

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm()

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstname:"",
                lastname:"",
                email:"",
                phoneNo:"",
                message:"",
            },[reset,isSubmitSuccessful])
        }
    })
  return (
    <div className='flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit(submitContactForm)}>
            <div>
                <div className='flex gap-x-3'>
                    {/* firstname */}
                    <div className='flex flex-col mb-1 text-[0.875rem] w-[50%] leading-[1.375rem] text-richblack-5'>
                        <label htmlFor='firstname' >First Name</label>
                        <input
                            name="firstname"
                            type='text'
                            id='firstname'
                            placeholder='Enter First Name'
                            {...register("firstname", {required:true})}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                        {
                            errors.firstname && (
                                <span className='text-pink-200'>Please Enter Your First Name</span>
                            )
                        }
                    </div>
                    {/* lastname */}
                    <div className='flex flex-col mb-1 text-[0.875rem] w-[50%] leading-[1.375rem] text-richblack-5'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input
                            name="lastname"
                            id='lastname'
                            type='text'
                            placeholder='Enter Last Name'
                            {...register("lastname")}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </div>
                </div>
                
                {/* email */}
                <div className='flex flex-col mb-1 mt-4 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        name='email'
                        id='email'
                        type='email'
                        placeholder='Enter Email Addess'
                        {...register("email", {required:true})}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    {
                        errors.email && (
                            <span className='text-pink-200'>Please Enter Your Email</span>
                        )
                    }
                </div>

                {/* phone no */}
                <div className='flex flex-col mb-1 mt-4 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    <label htmlFor='phonenumber'>Phone Number</label>
                    {/* dropdown */}
                    <div className='flex gap-3'>
                        <select
                            name='dropdown'
                            id='dropdown'
                            {...register("countrycode", {required:true})}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",                                }}
                                className="rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 w-[20%]"
                                defaultValue="+91"
                        >
                            {
                                countryCode.map((element, index)=>(
                                    <option key={index} value={element.code}>
                                        {element.code} - {element.country}
                                    </option>
                                ))
                            }
                        </select>
                        <input
                            name='phoneno'
                            id='phonenumber'
                            type='phonenumber'
                            placeholder='12345 67890'
                            {...register("phoneNo", {
                                required:{value:true, message:"Please Enter Phone Number"},
                                maxLength:{value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"}
                            })}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </div>
                    {
                        errors.phoneNo && (
                            <span className='text-pink-200'>{errors.phoneNo.message}</span>
                        )
                    }
                </div>
                {/* message */}
                <div className='flex flex-col mb-5 mt-4 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                    <label htmlFor='message'>Message</label>
                    <textarea
                        name='message'
                        id='message'
                        cols='30'
                        rows='7'
                        placeholder='Enter Your Message'
                        {...register("message", {required:true})}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    {
                        errors.message && (
                            <span className='text-pink-200'>Please Enter Your Message</span>
                        )
                    }
                </div>
            </div>
            <button type='submit'
            className='mt-6 font-medium text-richblack-900 bg-yellow-50 rounded-md p-[12px] w-full'>
                Submit
            </button>
        </form>
    </div>
  )
}

export default ContactUsForm