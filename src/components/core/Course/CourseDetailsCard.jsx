import React from 'react'
import toast from 'react-hot-toast'
import copy from "copy-to-clipboard"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../../Redux/slices/cartSlice'
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaShareFromSquare } from "react-icons/fa6";

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {
    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link Copied to Clipboard")
    }

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are and Instructor, you cannot buy a course")
            return;
    }
        if(token) {
            dispatch(addToCart(course))
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const {thumbnail, price} = course
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <div className='text-richblack-5 flex flex-col gap-4'>
        <img
            src={thumbnail}
            alt='Thumbnail'
            className='max-h-[300px] min-h-[180px] max-xl:hidden w-[400px] rounded-xl'
        />
        <div className='text-3xl font-semibold '>Rs. {price}</div>
        {/* buttons */}
        <div className='flex flex-col gap-y-6'>
            <button
            className='flex items-center justify-center gap-x-2 font-semibold text-richblack-900 bg-yellow-50 rounded-md px-[12px] py-[8px]'
            onClick={
                user && course?.studentEnrolled?.includes(user._id)
                ? navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }>
                {
                    user && course?.studentEnrolled.includes(user._id) ? "Go to Courses" : "Buy Now"
                }
            </button>
            {
                (!course?.studentsEnrolled?.includes(user._id)) && (
                    <button 
                    onClick={handleAddToCart}
                    className='flex items-center justify-center gap-x-2 font-semibold rounded-md px-[12px] py-[8px] bg-richblack-900 text-richblack-5'>
                        Add to Cart
                    </button>
                )
            }
        </div>
        <div>
            <p className=' flex justify-center text-sm'>
                30-Day Money-Back Guarentee
            </p>
            <p className='text-xl font-semibold py-2'>
                This Course Includes:
            </p>
            <div className='text-caribbeangreen-100'>
                {
                    course?.instructions?.map((item, index) => (
                        <p key={index} className='flex gap-2 items-center max-xl:justify-center'>
                            <FaCircleArrowRight/>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
        </div>
        <div>
            <button
            onClick={handleShare}
            className='mx-auto flex items-center gap-2 p-6 text-yellow-50'>
                Share
                <FaShareFromSquare/>
            </button>
        </div>
    </div>
  )
}

export default CourseDetailsCard