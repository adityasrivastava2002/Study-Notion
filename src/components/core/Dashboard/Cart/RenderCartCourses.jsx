import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../Redux/slices/cartSlice'
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {
    const {cart,total} = useSelector((state)=>state.cart)
    const dispatch = useDispatch()
  return (
    <div className='max-lg:mx-auto'>
        {
            cart.map((course, index)=>(
                <div
                    key={course._id}
                    className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                    index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                    } ${index !== 0 && "mt-6"} max-lg:flex max-lg:flex-col max-lg:items-center`}
                >
                    <div className="flex flex-1 flex-col gap-4 lg:flex-row">
                        <img
                            src={course?.thumbnail}
                            alt={course?.courseName}
                            className="h-[148px] w-[220px] rounded-lg object-cover"
                        />
                        <div className="flex flex-col space-y-1">
                        <p className="text-lg font-medium text-richblack-5 max-lg:mx-auto">
                            {course?.courseName}
                        </p>
                        <p className="text-sm text-richblack-300 max-lg:mx-auto">
                            {course?.category?.name}
                        </p>
                        <div className="flex items-center gap-2 max-lg:mx-auto">
                            <span className="text-yellow-5">4.5</span>
                                <ReactStars
                                    count={5}
                                    value={course?.ratingAndReviews?.length}
                                    size={20}
                                    edit={false}
                                    activeColor="#ffd700"
                                    emtpyIcon={<GiNinjaStar />}
                                    fullIcon={<GiNinjaStar />}
                                /> 

                            <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>

                        </div>
                    </div>
                </div>
                    <div className="flex flex-col items-end space-y-2 max-lg:gap-4">
                        <button
                        onClick={() => dispatch(removeFromCart(course._id))}
                        className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                        >
                            <RiDeleteBin6Line/>
                            <span>Remove</span>
                        </button>

                        <p className='mb-6 text-3xl font-medium text-yellow-100'>Rs {course?.price} </p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses