import React, { useEffect } from 'react'
import RenderSteps from '../components/core/Dashboard/AddCourse/RenderSteps'
import { useDispatch } from 'react-redux'
import { resetCourseState } from '../Redux/slices/courseSlice'

const AddCourse = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(resetCourseState());
  };
  },[])
  return (
    <>
      <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          Add Course
        </h1>
        <div className="flex-1 mx-auto max-w-[600px]">
          <RenderSteps />
        </div>
      </div>
    </>
  )
}

export default AddCourse