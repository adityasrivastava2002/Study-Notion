import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='text-richblack-100 mx-auto flex items-center flex-col w-11/12 max-w-[450px] md:gap-x-12 my-20'>
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 mb-2">Get In Touch</h1>
        <p className='mb-10'>We'd love to here for you, Please fill out this form.</p>
        <ContactUsForm/>
    </div>
  )
}

export default ContactFormSection