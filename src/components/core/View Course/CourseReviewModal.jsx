import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { IoClose } from "react-icons/io5";
import {useSelector} from "react-redux"
import ReactStars from "react-rating-stars-component"
import { createRating } from '../../../services/operations/courseAPI';
import IconBtn from '../../common/IconBtn';

const CourseReviewModal = ({setReviewModal}) => {
  const {user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  const {courseEntireData} = useSelector((state) => state.viewCourse)

  const handleCloseReviewModal = () => {
    setReviewModal(false);
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  })

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  }

  const onSubmit =async(data) => {
    await createRating(
      {
        courseId:courseEntireData._id,
        rating:data.courseRating,
        review:data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  }
  return (
    <div className='text-richblack-5 flex flex-col items-center justify-center w-[100%] h-[100%] absolute'>
    {/* header */}
      <div className='flex justify-between items-center w-[40%] bg-richblack-700 border-b-[1px] border-richblack-5 p-[16px] max-md:w-[90%]'>
        <p>Add Review</p>
        <p onClick={() => handleCloseReviewModal()}><IoClose/></p>
      </div>

      <div className='bg-richblack-800 w-[40%] flex flex-col gap-4 p-[16px] max-md:w-[90%]'>

        {/* name dp */}
        <div className='flex items-center justify-center gap-4'>
          <div className=''>
            <img
              src={user?.image}
              className='rounded-full w-[50px] h-[50px]'
            />
          </div>
          <div>
            <p>{user?.firstName} {user?.lastName}</p>
            <p className='text-sm text-richblack-300'>Posting Publicly</p>
          </div>
        </div>

        {/* form */}
        <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-[100%] flex-col gap-4 items-center'>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor={"#ffd700"}
          />

          <div className='w-[100%] px-4'>
            <label 
            htmlFor='courseExperience'
            className='text-[0.875rem] text-richblack-5'>
              Add Your Experience <span className='text-pink-300'>*</span>
            </label>
            <textarea
              id='courseExperience'
              placeholder='Add Your Experience Here'
              rows={4}
              {...register("courseExperience", {required:true})}
              style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
              className="w-[100%] rounded-[0.5rem] bg-richblack-700 my-2 p-[12px] text-richblack-5"
            />
            {
              errors.courseExperience && (
                <span>
                  Please add your Experience
                </span>
              )
            }
          </div>

          <div className='flex gap-2 justify-end w-[100%] px-4'>
            <button
            onClick={() => setReviewModal(false)}
            className='bg-richblack-700 px-4 py-2 rounded-md border-b-[1px] border-richblack-500'>
              Cancel
            </button>
            <IconBtn
              text={"Save"}
              customClasses={"bg-yellow-50 px-4 py-2 rounded-md border-b-[1px] border-richblack-500 text-richblack-900"}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CourseReviewModal