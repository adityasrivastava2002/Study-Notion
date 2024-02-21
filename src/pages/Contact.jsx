import React from 'react'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import {PiChatCenteredTextFill} from "react-icons/pi"
import {FaEarthAmericas} from "react-icons/fa6"
import {MdCall} from "react-icons/md"

const Contact = () => {
  return (
    <div className='flex max-md:flex-col w-11/12 mx-auto'>
        <div className='flex md:w-[50%] items-start justify-center max-md:mx-0 max-md:justify-center'>
            <div className='bg-richblack-800 my-20 max-h-max max-w-[500px] mx-10 text-richblack-100 flex flex-col gap-10 rounded-2xl px-10 py-12'>
                <div>
                    <div className='flex items-center gap-2 text-xl font-semibold'>
                        <PiChatCenteredTextFill />
                        <p className='text-richblack-5'>Chat on us</p>
                    </div>
                    <p>Our friendly team is here to help.</p>
                    <p>info@studynotion.com</p>
                </div>

                <div>
                    <div className='flex items-center gap-2 text-xl font-semibold'>
                        <FaEarthAmericas />
                        <p className='text-richblack-5'>Visit us</p>
                    </div>
                    <p>Come and say hello at our office HQ.</p>
                    <p>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                </div>

                <div>
                    <div className='flex items-center gap-2 text-xl font-semibold'>
                        <MdCall />
                        <p className='text-richblack-5'>Call us</p>
                    </div>
                    <p>Mon - Fri From 8am to 5pm</p>
                    <p>+123 456 7869</p>
                </div>
            </div>
        </div>
        <div className='text-richblack-100 mx-auto flex flex-col w-11/12 max-w-[500px] md:gap-x-12 my-20 border rounded-md px-10 py-8 border-richblack-100'>
            <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 mb-2'>Got a Idea? We've got the skills. Let's team up</h1>
            <p className='mb-10'>Tell us more about yourself and what you're got in mind.</p>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default Contact