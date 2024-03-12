import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { resetCourseState, setStep } from '../../../../../Redux/slices/courseSlice'
import { useNavigate } from 'react-router-dom'
import { editCourseDetails } from '../../../../../services/operations/courseAPI'
import IconBtn from '../../../../common/IconBtn'

export default function PublishCourse() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm()

  const {course} = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {token} = useSelector((state) => state.auth)

  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  },[])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const gotToCourses = () => {
    dispatch(resetCourseState())
    navigate("/course/my-courses")
  }

  const handleCoursePublish = async() => {
    if(
      (course?.status === COURSE_STATUS.PUBLISHED && 
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT &&
        getValues("public") === false)
    ) {
      gotToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public") 
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if(result) {
      gotToCourses()
    }
    setLoading(false)
  }

  function onSubmit() {
    handleCoursePublish()
  }
  return (
    <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
      <p className='text-2xl text-richblack-5 font-semibold'>Publish Settings</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='public' className='inline-flex items-center text-lg'>
            <input
              type='checkbox'
              id='public'
              {...register("public")}
              className='border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5'
            />
            <span className='ml-2 text-richblack-400'>
              Make this course as public
            </span>
          </label>
        </div>
        {/* next prev buttton */}
        <div className='ml-auto flex max-w-max items-center gap-x-4'>
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
          >
            Back
          </button>
          <IconBtn 
            disabled={loading} 
            text={"Save Changes"} 
            customClasses={"flex items-center gap-x-2 font-semibold text-richblack-900 bg-yellow-50 rounded-md px-[12px] py-[8px]"} 
            type={"submit"}
          />
        </div>
      </form>
    </div>
  )
}
